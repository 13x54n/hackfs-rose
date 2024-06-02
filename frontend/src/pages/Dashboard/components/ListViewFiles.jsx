import React from "react";
import { toast } from "react-toastify";
import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import ContractABI from "../../../helpers/ContractABI.json";
import { prepareContractCall } from "thirdweb";
import DownloadButton from "../../../components/DownloadButton";

export default function ListViewFiles({ uploads }) {
  const handleCopyCID = (d) => {
    navigator.clipboard.writeText(d);
    toast("🦄 CID copied to keyboard!");
  };

  const account = useActiveAccount();
  let minterAddress = account.address;

  const client = createThirdwebClient({
    clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
  });
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const contract = getContract({
    client,
    chain: sepolia,
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
    abi: ContractABI,
  });

  const handleNFTMint = async (d) => {
    const metadata = {
      name: d.fileName,
      description: `Filecoin Storage Proof: ${d.id}`,
      image: `https://gateway.lighthouse.storage/ipfs/${d.cid}`,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/mint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata }),
      });

      const data = await response.json();

      const tokenUri = "ipfs://" + data?.uploadResponse.data.Hash;

      const tx = prepareContractCall({
        contract,
        method: "function safeMint(address to, string memory uri)",
        params: [minterAddress, tokenUri],
      });

      // const gasCost = await tx.estimateGasCost(); // Estimate the gas cost
      // const simulatedTx = await tx.simulate(); // Simulate the transaction

      const receipt = await sendTransaction(tx);
      console.log(receipt)

      toast(
        "🦄 You'll shortly receive a notification once minting is processed! "
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="bg-white">
      <table className="table-auto w-full mx-auto my-2">
        <thead>
          <tr className="border-b">
            <th className="p-1" align="left">
              S.N.
            </th>
            <th className="p-1" align="left">
              File Name 📜
            </th>
            <th className="p-1 px-5" align="left">
              CID
            </th>
            <th></th>
            <th className="p-1 px-5 pr-7" align="left">
              Size 📦
            </th>
            <th className="p-1" align="left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {uploads &&
            uploads
              .filter((d) => !d.fileName.endsWith(".json"))
              ?.map((d, i) => {
                return (
                  <tr
                    className="border-b py-2 hover:bg-gray-100 cursor-pointer"
                    key={i}
                  >
                    <td align="center" className="p-1">
                      {i + 1}
                    </td>
                    <td className="p-1">{d.fileName}</td>
                    <td className="p-1 px-5">
                      {d.cid.slice(0, 15)}
                      {"..."}
                      {d.cid.slice(-4)}
                    </td>
                    <td>
                      <i
                        onClick={() => handleCopyCID(d.cid)}
                        className="cursor-pointer ri-clipboard-line"
                      ></i>
                    </td>
                    <td className="p-1 px-5 pr-7">
                      {(d.fileSizeInBytes / 1048576).toFixed(2)} MB
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {(d.fileName.endsWith(".png") ||
                          d.fileName.endsWith(".jpg") ||
                          d.fileName.endsWith(".jpeg") ||
                          d.fileName.endsWith(".gif") ||
                          d.fileName.endsWith(".pdf") ||
                          d.fileName.endsWith(".webp")) && (
                          <button
                            title="Mint"
                            onClick={() => handleNFTMint(d)}
                            className="text-smfont-medium px-1"
                          >
                            🦄
                          </button>
                        )}

                        <button
                          title="Download"
                          className="text-sm font-medium px-1"
                        >
                          <DownloadButton
                            fileUrl={`${
                              import.meta.env.VITE_LIGHTHOUSE_GATEWAY
                            }/${d.cid}`}

                            fileName={d.fileName}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

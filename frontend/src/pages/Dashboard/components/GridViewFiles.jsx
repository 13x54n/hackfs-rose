import React from "react";
import { toast } from "react-toastify";
import { createThirdwebClient, getContract, waitForReceipt } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import ContractABI from "../../../helpers/ContractABI.json";
import { prepareContractCall } from "thirdweb";

export default function GridViewFiles({ uploads }) {
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

      await sendTransaction(tx);
      toast(
        "🦄 You'll shortly receive a notification once minting is processed! "
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-5 my-3 bg-white">
      {uploads &&
        uploads
          .filter((d) => !d.fileName.endsWith(".json"))
          ?.map((d, i) => {
            return (
              <div
                key={i}
                className="cursor-pointer transition-all ease-in-out hover:scale-[1.02] w-[100%] bg-white shadow-xl rounded-md overflow-hidden"
              >
                {/* <figure>
                  <img
                    className="w-[100%] h-24 object-cover"
                    src={`https://gateway.lighthouse.storage/ipfs/${d.cid}`}
                    alt={d.fileName}
                  />
                </figure> */}
                <div className="p-3">
                  <div className="flex flex-wrap gap-1 text-md font-medium">
                    <p className="text-sm text-black">📜 {d.fileName}</p>
                  </div>
                  <div className="my-1">
                    <p className="text-sm">
                      <span>Size: {d.fileSizeInBytes} Bytes</span>
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">
                        CID: {d.cid.substring(0, 7)}...{d.cid.slice(-4)}
                      </p>
                      <i
                        onClick={() => handleCopyCID(d.cid)}
                        className="cursor-pointer ri-clipboard-line"
                      ></i>
                    </div>
                  </div>
                  <button
                    disabled={isPending}
                    onClick={() => handleNFTMint(d)}
                    className="text-sm bg-gray-700 rounded-sm text-white font-medium px-1"
                  >
                    🦄 Mint NFT
                  </button>
                </div>
              </div>
            );
          })}

      {uploads.length == 0 && (
        <div
          role="status"
          className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="flex items-center mt-4">
            <svg
              className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

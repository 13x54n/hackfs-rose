import React, { useContext, useEffect, useState } from "react";
import { FilesContext } from "../../../contexts/Files";
import FilesSearchBar from "../../../components/FilesSearchBar";
import DownloadButton from "../../../components/DownloadButton";

export default function NFT() {
  const { retrievedFiles } = useContext(FilesContext);

  const [tempFilteredFiles, setTempFilteredFiles] = useState([]);

  return (
    <>
      <p className="text-xl font-medium mb-5">💎 Rose NFT Collection</p>
      <FilesSearchBar setTempFilteredFiles={setTempFilteredFiles} />

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
            {tempFilteredFiles.length === 0 &&
              retrievedFiles &&
              retrievedFiles.data?.fileList
                .filter(
                  (d) =>
                    d.fileName.endsWith(".png") ||
                    d.fileName.endsWith(".jpg") ||
                    d.fileName.endsWith(".jpeg") ||
                    d.fileName.endsWith(".gif") ||
                    d.fileName.endsWith(".webp")
                )
                ?.map((d, i) => {
                  return (
                    <tr
                      className="border-b py-2 cursor-pointer hover:bg-gray-100"
                      key={i}
                    >
                      <td align="center" className="p-1">
                        {i + 1}
                      </td>
                      <td className="p-1 flex items-center gap-2 cursor-pointer">
                        <p>{d.fileName}</p>
                      </td>
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
                          <DownloadButton
                            fileUrl={`${
                              import.meta.env.VITE_LIGHTHOUSE_GATEWAY
                            }/${d.cid}`}
                            fileName={d.fileName}
                          />
                          <button
                            title="Open on explorer."
                            className="text-sm font-medium px-1"
                          >
                            🌐
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            {tempFilteredFiles.length > 0 &&
              tempFilteredFiles
                .filter((d) => !d.fileName.endsWith(".json"))
                ?.map((d, i) => {
                  return (
                    <tr
                      className="border-b py-2 cursor-pointer hover:bg-gray-100"
                      key={i}
                    >
                      <td align="center" className="p-1">
                        {i + 1}
                      </td>
                      <td className="p-1 flex items-center gap-2 cursor-pointer">
                        <p>{d.fileName}</p>
                      </td>
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
                          <button
                            title="Download"
                            className="text-sm font-medium px-1"
                          >
                            🛒
                          </button>
                          <button
                            title="Open on explorer."
                            className="text-sm font-medium px-1"
                          >
                            🌐
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
}

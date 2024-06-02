import React, { useEffect, useState } from "react";
import DownloadButton from "../../../components/DownloadButton";

const AnalyticsGraph = ({ data }) => {
  const [fileSizeData, setFileSizeData] = useState([]);
  const [activeMimeTypeFiles, setActiveMimeTypeFiles] = useState([]);

  const handleActiveMimeTypesFiles = (mime) => {
    setActiveMimeTypeFiles(data.filter((file) => file.mimeType === mime));
  };

  useEffect(() => {
    if (data) {
      const groupedData = data.reduce((acc, curr) => {
        const fileSizeMB = parseInt(curr.fileSizeInBytes) / (1024 * 1024);
        acc[curr.mimeType] = (acc[curr.mimeType] || 0) + fileSizeMB;
        return acc;
      }, {});

      const fileSizeByType = Object.keys(groupedData).map((key) => ({
        mimeType: key,
        totalSizeMB: groupedData[key],
      }));

      setFileSizeData(fileSizeByType);
    }
  }, [data]);

  return (
    <div>
      <div className="flex items-center gap-5">
        {fileSizeData.map((item, i) => (
          <div key={item.mimeType}>
            <p className="cursor-pointer" onClick={() => handleActiveMimeTypesFiles(item.mimeType)}>
              {i+1}.  {item.mimeType.split("/")[1]}: {item.totalSizeMB.toFixed(2)} MB
            </p>
          </div>
        ))}
      </div>

      <div>
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
            {activeMimeTypeFiles.length > 0 &&
              activeMimeTypeFiles.map((file, i) => (
                <tr
                  className="border-b py-2 hover:bg-gray-100 cursor-pointer"
                  key={i}
                >
                  <td align="center" className="p-1">
                    {i + 1}
                  </td>
                  <td className="p-1">{file.fileName}</td>
                  <td className="p-1 px-5">
                    {file.cid.slice(0, 15)}
                    {"..."}
                    {file.cid.slice(-4)}
                  </td>
                  <td>
                    <i
                      onClick={() => handleCopyCID(file.cid)}
                      className="cursor-pointer ri-clipboard-line"
                    ></i>
                  </td>
                  <td className="p-1 px-5 pr-7">
                    {(file.fileSizeInBytes / 1048576).toFixed(2)} MB
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {(file.fileName.endsWith(".png") ||
                        file.fileName.endsWith(".jpg") ||
                        file.fileName.endsWith(".jpeg") ||
                        file.fileName.endsWith(".gif") ||
                        file.fileName.endsWith(".webp")) && (
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
                          }/${file.cid}`}
                          fileName={file.fileName}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsGraph;

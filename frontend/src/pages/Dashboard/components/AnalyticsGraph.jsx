import React, { useEffect, useState } from "react";

const AnalyticsGraph = ({ data }) => {
  const [fileSizeData, setFileSizeData] = useState([]);

  useEffect(() => {
    if (data) {
      // Group data by MIME type and calculate total file size for each type in MB
      const groupedData = data.reduce((acc, curr) => {
        const fileSizeMB = parseInt(curr.fileSizeInBytes) / (1024 * 1024); // Convert bytes to MB
        acc[curr.mimeType] = (acc[curr.mimeType] || 0) + fileSizeMB;
        return acc;
      }, {});

      // Convert grouped data into an array of objects
      const fileSizeByType = Object.keys(groupedData).map((key) => ({
        mimeType: key,
        totalSizeMB: groupedData[key],
      }));

      setFileSizeData(fileSizeByType);
    }
  }, [data]);

  return (
    <div className="flex items-center gap-5">
      {fileSizeData.map((item) => (
        <div key={item.mimeType}>
          <p>
            {item.mimeType.split("/")[1]}: {item.totalSizeMB.toFixed(2)} MB
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsGraph;

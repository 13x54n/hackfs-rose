import React from "react";

const DownloadButton = ({ fileUrl, fileName }) => {
  const handleDownload = () => {
    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a temporary link element
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("There was a problem with the file download:", error);
      });
  };

  return <div onClick={handleDownload}>🛒</div>;
};

export default DownloadButton;

import React from "react";
import "./styles/FileUploader.css";

export default function UploadFileComponent({ setFile }) {
  return (
    <div className="my-5 dashboard_customUploadElement">
      <input
        type="file"
        className="file-input w-full max-w-xs"
        onChange={(e) => setFile(e.target.files)}
      />
    </div>
  );
}

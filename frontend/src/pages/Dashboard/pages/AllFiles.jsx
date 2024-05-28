import React, { useContext, useState } from "react";
import GridViewFiles from "../components/GridViewFiles";
import ListViewFiles from "../components/ListViewFiles";
import { FilesContext } from "../../../contexts/Files";
import FilesSearchBar from "../../../components/FilesSearchBar";

export default function AllFiles({
  isUploading,
  fileView,
  setFileView,
  uploadingProgress,
}) {

  const {retrievedFiles} = useContext(FilesContext)
  const [tempFilteredFiles, setTempFilteredFiles] = useState([])
  return (
    <div>
      {/* @dev Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <p>Status:</p>{" "}
          <div
            className={`badge ${
              isUploading ? "badge-neutral" : "badge-accent"
            }`}
          >
            {isUploading
              ? `Uploading Files: ${uploadingProgress}/100%...`
              : "Normal"}
          </div>
        </div>
        <FilesSearchBar setTempFilteredFiles={setTempFilteredFiles}/>
        <div className="flex items-center gap-1">
          <button
            className={`${
              fileView === "grid" && "bg-gray-200 px-1 rounded-full"
            }`}
            onClick={() => setFileView("grid")}
          >
            <i className="ri-box-3-line text-xl"></i>
          </button>
          <button
            className={`${
              fileView === "list" && "bg-gray-200 px-1 rounded-full"
            }`}
            onClick={() => setFileView("list")}
          >
            <i className="ri-list-check-2 text-xl"></i>
          </button>
        </div>
      </div>
      {/* files view */}
      {fileView === "grid" && (
        <GridViewFiles uploads={tempFilteredFiles.length === 0 ? retrievedFiles?.data?.fileList: tempFilteredFiles} />
      )}
      {fileView === "list" && (
        <ListViewFiles uploads={tempFilteredFiles.length === 0 ? retrievedFiles?.data?.fileList: tempFilteredFiles} />
      )}
    </div>
  );
}

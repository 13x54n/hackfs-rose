import lighthouse from "@lighthouse-web3/sdk";
import React, { useContext, useState } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import AllFiles from "./pages/AllFiles";
import RoseAI from "./pages/RoseAI";
import UploadFileComponent from "./components/FileUploader";
import NFT from "./pages/NFT";
import { FilesContext } from "../../contexts/Files";

export default function Dashboard() {
  const [activetab, setActiveTab] = useState("all");
  const [fileView, setFileView] = useState("list");
  const {retrievedFiles, setRetrivedFiles, getUploads} = useContext(FilesContext)

  React.useEffect(() => {
    const _activeTab = localStorage.getItem("rose_active_dashboard_tab");
    _activeTab !== null ? setActiveTab(_activeTab) : setActiveTab("all");
  }, []);

  const openModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      modal.close();
    }
  };

  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    setUploadingProgress(percentageDone);
  };

  const uploadFile = async (file) => {
    const output = await lighthouse.upload(
      file,
      import.meta.env.VITE_LIGHTHOUSE_STORAGE_API_KEY,
      false,
      null,
      progressCallback
    );
    console.log("File Status:", output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );

    setIsUploading(false);

    setFile(null);
  };

  // call nodejs app
  // @dev check dedup on filecoin network
  const handleDedup = () => {

  }


  const handleUpload = async (e) => {
    e.preventDefault();
    closeModal();
    setIsUploading(true);
    await uploadFile(file);
    getUploads()
  };
  return (
    <div className="flex items-start w-[90vw] mx-[4vw]">
      <div className="w-[18vw] min-h-[90vh] border-r py-3">
        <p className="mb-2 font-medium">Applications</p>
        <DashboardSidebar activetab={activetab} setActiveTab={setActiveTab} />
        <button
          onClick={openModal}
          className="cursor-pointer p-2 bg-green-100 transition-all ease-in-out hover:bg-green-200 w-[97%] rounded-md border-b mt-4"
        >
          📦 Upload File
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">📦 Upload File</h3>
              <div onClick={closeModal} className="cursor-pointer">
                ❌
              </div>
            </div>
            <p className="text-sm">
              Make your favorite mementos persistent. ✨
            </p>
            <UploadFileComponent
              file={file}
              setFile={setFile}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
            <button
              onClick={handleUpload}
              className="bg-black text-white text-sm p-2 py-1 rounded-sm"
            >
              🛒 Upload
            </button>
          </div>
        </dialog>
      </div>
      <div className="py-3 px-5 flex-1 pr-0">
        {activetab === "all" && (
          <AllFiles
            uploadingProgress={uploadingProgress}
            isUploading={isUploading}
            fileView={fileView}
            setFileView={setFileView}
          />
        )}
        {activetab === "rose_ai" && <RoseAI />}

        {activetab === "nft" && <NFT />}
      </div>
    </div>
  );
}

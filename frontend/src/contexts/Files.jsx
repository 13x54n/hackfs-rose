/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";

export const FilesContext = createContext();

export const FilesProvider = ({ children }) => {
  const [retrievedFiles, setRetrievedFiles] = useState([]);

  const getUploads = async () => {
    /*
      @param {string} apiKey - Your API key.
      @param {number} [lastKey=null] - id of last object of previous response, defaults to null.
    */
    const response = await lighthouse.getUploads(
      import.meta.env.VITE_LIGHTHOUSE_STORAGE_API_KEY
    );

    const uniqueFilesMap = {};

    response?.data.fileList.forEach((file) => {
      uniqueFilesMap[file.cid] = file;
    });

    const uniqueFilesArray = Object.values(uniqueFilesMap);

    response.data.fileList = uniqueFilesArray;
    console.log(response)

    // Save retrieved files into localStorage
    localStorage.setItem("retrievedFiles", JSON.stringify(response));
    setRetrievedFiles(response);
  };

  useEffect(() => {
    // Check if retrieved files exist in localStorage
    const storedFiles = localStorage.getItem("retrievedFiles");
    if (storedFiles) {
      setRetrievedFiles(JSON.parse(storedFiles));
    } else {
      getUploads();
    }
  }, []);

  return (
    <FilesContext.Provider value={{ retrievedFiles, setRetrievedFiles, getUploads }}>
      {children}
    </FilesContext.Provider>
  );
};

export default FilesProvider;

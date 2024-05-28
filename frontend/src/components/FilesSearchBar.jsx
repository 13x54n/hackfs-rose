import React, { useContext, useState } from "react";
import Fuse from "fuse.js";
import { FilesContext } from "../contexts/Files";

export default function FilesSearchBar({setTempFilteredFiles}) {
    const { retrievedFiles } = useContext(FilesContext);
    const [searchTerm, setSearchTerm] = useState("");

    // Define options for Fuse.js
    const fuseOptions = {
        keys: ["cid", "fileName"], // Properties to search within
        threshold: 0.3, // Adjust as needed
    };
    // Initialize Fuse instance with retrievedFiles
    const fuse = new Fuse(retrievedFiles?.data?.fileList, fuseOptions);

    // Handle search term changes
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.trim() === "") {
            setTempFilteredFiles([]);
            return;
        }
        const results = fuse.search(term);
        setTempFilteredFiles(results.map(({ item }) => item));
    };

    return (
        <div className="border p-1 px-3 flex items-center gap-1">
            <i className="ri-search-2-line"></i>
            <input
                type="text"
                className="text-sm w-[100%] lg:w-[30vw] bg-white focus:outline-none"
                placeholder="Search items using CID, Name..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
}

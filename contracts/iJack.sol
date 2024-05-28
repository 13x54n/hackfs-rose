// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract iJack {
    // Structure to represent file data
    struct FileData {
        string cid;             // Content Identifier of the file
        uint sizeInBytes;       // Size of the file in bytes
        string fileName;        // Name of the file
        string publicKey;       // Public key associated with the file uploader
        string txHash;          // Transaction hash of the file upload transaction
        string status;          // Status of the file (e.g., queued, processing, completed)
        uint createdAt;         // Timestamp indicating when the file was uploaded
        string id;              // Unique identifier of the file
        uint lastUpdate;        // Timestamp of the last update to the file
        bool encryption;        // Indicates whether the file is encrypted
    }
    
    // Mapping of Ethereum addresses to arrays of FileData structs
    mapping(address => FileData[]) private filesByAddress;
    
    // Mapping to check for duplicate files based on CID
    mapping(string => bool) dedupState;
    
    // Function to add file data to the contract
    function addFile(
        string memory cid,
        uint sizeInBytes,
        string memory fileName,
        string memory publicKey,
        string memory txHash,
        string memory status,
        uint createdAt,
        string memory id,
        uint lastUpdate,
        bool encryption
    ) public {
        // Push file data to the array corresponding to the sender's address
        filesByAddress[msg.sender].push(FileData({
            cid: cid,
            sizeInBytes: sizeInBytes,
            fileName: fileName,
            publicKey: publicKey,
            txHash: txHash,
            status: status,
            createdAt: createdAt,
            id: id,
            lastUpdate: lastUpdate,
            encryption: encryption
        }));
        
        // Mark the CID as encountered to check for duplicates
        dedupState[cid] = true;
    }
    
    // Function to check if a file with the given CID is a duplicate
    function isDuplicate(string memory cid) external view returns (bool) {
        return dedupState[cid];
    }

    // Function to retrieve file data for a specific user
    function getFilesData(address _user) external view returns (FileData[] memory){
        // Require that the caller is the user whose files are being retrieved
        require(_user == msg.sender);
        
        // Return the array of file data associated with the user's address
        return filesByAddress[_user];
    }
}

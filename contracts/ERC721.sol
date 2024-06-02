// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Rose is ERC721, ERC721URIStorage, Ownable {
    uint256 private _currentTokenId;

    mapping(address => string[]) private _ownedTokens;

    constructor()
        ERC721("Rose", "ROSE")
        Ownable(msg.sender)
    {}

    function getOwnedTokens(address owner) public view returns (string[] memory) {
        return _ownedTokens[owner];
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://coffee-adorable-swallow-310.mypinata.cloud/ipfs";
    }

    function safeMint(address to, string memory uri, string memory cid) public onlyOwner {
        uint256 newTokenId = _currentTokenId + 1;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, uri);
        _currentTokenId = newTokenId;

        _ownedTokens[to].push(cid);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

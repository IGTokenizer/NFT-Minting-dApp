// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MySmartNFT is  ERC721URIStorage {
    uint256 private _tokenIdTracker;

    constructor() ERC721("First website - IGTokenizer", "IGTokenizer") {
        console.log("This is my NFT contract. Woah!");
        _tokenIdTracker = 0; 
    }

    function makeAnEpicNFT() public {
        uint256 newItemId = _tokenIdTracker;
        _safeMint(msg.sender, newItemId);
        tokenURI(newItemId);
        _tokenIdTracker += 1; 
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        address owner = ownerOf(_tokenId);
        require(owner != address(0), "Token ID does not exist");
        console.log("An NFT w/ ID %s has been minted to %s", _tokenId, owner);
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                "ewogICAgIm5hbWUiOiAiSUdUT2tlbml6ZXIiLAogICAgImRlc2NyaXB0aW9uIjogIlByaW1lcnMgTkZUIGNyZWF0cyBwZXIgbGEgY3JlYWNpw7MgZGVsIFRGRy4iLAogICAgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIQnlaWE5sY25abFFYTndaV04wVW1GMGFXODlJbmhOYVc1WlRXbHVJRzFsWlhRaUlIWnBaWGRDYjNnOUlqQWdNQ0F6TlRBZ016VXdJajROQ2lBZ0lDQThjM1I1YkdVK0xtSmhjMlVnZXlCbWFXeHNPaUIzYUdsMFpUc2dabTl1ZEMxbVlXMXBiSGs2SUhObGNtbG1PeUJtYjI1MExYTnBlbVU2SURFMGNIZzdJSDA4TDNOMGVXeGxQZzBLSUNBZ0lEeHlaV04wSUhkcFpIUm9QU0l4TURBbElpQm9aV2xuYUhROUlqRXdNQ1VpSUdacGJHdzlJbUpzWVdOcklpQXZQZzBLSUNBZ0lEeDBaWGgwSUhnOUlqVXdKU0lnZVQwaU5UQWxJaUJqYkdGemN6MGlZbUZ6WlNJZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUltMXBaR1JzWlNJZ2RHVjRkQzFoYm1Ob2IzSTlJbTFwWkdSc1pTSStSWEJwWTB4dmNtUklZVzFpZFhKblpYSThMM1JsZUhRK0RRbzhMM04yWno0PSIKfQ=="
            )
        );
    }
}

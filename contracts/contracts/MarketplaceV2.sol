// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

error InvalidPrice();
error NotOwner();
error NotListed();
error WrongValue();
error NotSeller();
error MarketplaceNotApproved();
error FeeTooHigh();
error TransferFailed();

contract MarketplaceV2 is ReentrancyGuard, Ownable, Pausable {
    struct Listing {
        address seller;
        uint96 price;
    }

    uint96 public platformFeeBps = 250;
    address public feeRecipient;

    mapping(address => mapping(uint256 => Listing)) public listings;

    event Listed(address indexed nft, uint256 indexed tokenId, address indexed seller, uint256 price);
    event Sale(address indexed nft, uint256 indexed tokenId, address indexed buyer, uint256 price, uint256 fee);
    event Canceled(address indexed nft, uint256 indexed tokenId);

    constructor(address initialOwner, address _feeRecipient) Ownable(initialOwner) {
        feeRecipient = _feeRecipient;
    }

    function setPlatformFeeBps(uint96 newFeeBps) external onlyOwner {
        if (newFeeBps > 1000) revert FeeTooHigh();
        platformFeeBps = newFeeBps;
    }

    function setFeeRecipient(address newRecipient) external onlyOwner {
        feeRecipient = newRecipient;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function list(address nft, uint256 tokenId, uint256 price) external whenNotPaused {
        if (price == 0) revert InvalidPrice();

        IERC721 token = IERC721(nft);
        if (token.ownerOf(tokenId) != msg.sender) revert NotOwner();

        bool approved = token.getApproved(tokenId) == address(this)
            || token.isApprovedForAll(msg.sender, address(this));
        if (!approved) revert MarketplaceNotApproved();

        listings[nft][tokenId] = Listing({ seller: msg.sender, price: uint96(price) });
        emit Listed(nft, tokenId, msg.sender, price);
    }

    function buy(address nft, uint256 tokenId) external payable nonReentrant whenNotPaused {
        Listing memory l = listings[nft][tokenId];
        if (l.price == 0) revert NotListed();
        if (msg.value != l.price) revert WrongValue();

        delete listings[nft][tokenId];
        IERC721(nft).safeTransferFrom(l.seller, msg.sender, tokenId);

        uint256 fee = (msg.value * platformFeeBps) / 10_000;
        uint256 sellerProceeds = msg.value - fee;

        (bool okFee, ) = payable(feeRecipient).call{ value: fee }("");
        if (!okFee) revert TransferFailed();

        (bool okSeller, ) = payable(l.seller).call{ value: sellerProceeds }("");
        if (!okSeller) revert TransferFailed();

        emit Sale(nft, tokenId, msg.sender, msg.value, fee);
    }

    function cancel(address nft, uint256 tokenId) external whenNotPaused {
        Listing memory l = listings[nft][tokenId];
        if (l.price == 0) revert NotListed();
        if (l.seller != msg.sender) revert NotSeller();

        delete listings[nft][tokenId];
        emit Canceled(nft, tokenId);
    }

    function getListing(address nft, uint256 tokenId) external view returns (Listing memory) {
        return listings[nft][tokenId];
    }
}

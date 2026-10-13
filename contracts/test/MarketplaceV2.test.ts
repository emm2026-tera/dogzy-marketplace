import { expect } from "chai";
import { ethers } from "hardhat";

describe("MarketplaceV2", function () {
  async function fixture() {
    const [owner, seller, buyer, feeRecipient] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("DogzyNFT");
    const nft = await NFT.deploy(owner.address);
    await nft.waitForDeployment();

    const Market = await ethers.getContractFactory("MarketplaceV2");
    const market = await Market.deploy(owner.address, feeRecipient.address);
    await market.waitForDeployment();

    await nft.connect(seller).mint(seller.address, "ipfs://meta");
    await nft.connect(seller).approve(await market.getAddress(), 1n);

    return { owner, seller, buyer, feeRecipient, nft, market };
  }

  it("lists an NFT", async () => {
    const { seller, nft, market } = await fixture();
    const price = ethers.parseEther("0.5");

    await expect(market.connect(seller).list(await nft.getAddress(), 1n, price))
      .to.emit(market, "Listed");

    const listing = await market.getListing(await nft.getAddress(), 1n);
    expect(listing.seller).to.eq(seller.address);
    expect(listing.price).to.eq(price);
  });

  it("allows a buyer to buy", async () => {
    const { seller, buyer, nft, market } = await fixture();
    const price = ethers.parseEther("1");

    await market.connect(seller).list(await nft.getAddress(), 1n, price);

    await expect(
      market.connect(buyer).buy(await nft.getAddress(), 1n, { value: price })
    ).to.emit(market, "Sale");

    expect(await nft.ownerOf(1n)).to.eq(buyer.address);
  });

  it("cancel is seller only", async () => {
    const { seller, buyer, nft, market } = await fixture();
    const price = ethers.parseEther("0.2");

    await market.connect(seller).list(await nft.getAddress(), 1n, price);

    await expect(
      market.connect(buyer).cancel(await nft.getAddress(), 1n)
    ).to.be.revertedWithCustomError(market, "NotSeller");
  });
});

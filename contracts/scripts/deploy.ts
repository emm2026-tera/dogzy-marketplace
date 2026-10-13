import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from:", deployer.address);

  const DOGZY = await ethers.getContractFactory("DOGZY");
  const dogzy = await DOGZY.deploy(deployer.address);
  await dogzy.waitForDeployment();

  const DogzyNFT = await ethers.getContractFactory("DogzyNFT");
  const nft = await DogzyNFT.deploy(deployer.address);
  await nft.waitForDeployment();

  const MarketplaceV2 = await ethers.getContractFactory("MarketplaceV2");
  const market = await MarketplaceV2.deploy(deployer.address, deployer.address);
  await market.waitForDeployment();

  console.log("DOGZY:", await dogzy.getAddress());
  console.log("DogzyNFT:", await nft.getAddress());
  console.log("MarketplaceV2:", await market.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

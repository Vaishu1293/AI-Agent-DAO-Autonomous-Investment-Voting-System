const hre = require("hardhat");
require("dotenv").config({ path: "../.env" });

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contracts with account:", deployer.address);

  const Token = await hre.ethers.getContractFactory("TestToken");
  const token = await Token.deploy();
  const tokenAddress = token.target || token.address;
  console.log("✅ Token deployed to:", tokenAddress);

  const DAO = await hre.ethers.getContractFactory("ProposalDAO");
  const dao = await DAO.deploy(tokenAddress);
  const daoAddress = dao.target || dao.address;
  console.log("🏛️ DAO deployed to:", daoAddress);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});

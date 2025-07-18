const hre = require("hardhat");
require("dotenv").config({ path: "../.env" });

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Token = await hre.ethers.getContractFactory("TestToken");
  const token = await Token.deploy(); // ✅ this is enough

  const DAO = await hre.ethers.getContractFactory("ProposalDAO");
  const dao = await DAO.deploy(token.target || token.address); // for Ethers v6 compatibility

  console.log("Token deployed to:", token.target || token.address);
  console.log("DAO deployed to:", dao.target || dao.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

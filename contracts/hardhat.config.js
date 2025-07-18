require("dotenv").config({ path: "../.env" }); // ⬅️ Explicitly point to parent folder

require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts",
    tests: "./test",
    scripts: "./scripts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env" });

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.28",
  paths: {
    sources: "./contracts",
    tests: "./test",
    scripts: "./scripts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.GANACHE_KEY]
    }
  },
};

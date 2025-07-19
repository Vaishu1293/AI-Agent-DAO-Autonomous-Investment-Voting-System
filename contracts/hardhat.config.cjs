// hardhat.config.js (ESM version)
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

require("@nomicfoundation/hardhat-toolbox");

// ... rest of your config


const config = {
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
      accounts: [process.env.GANACHE_KEY],
    },
  },
};

module.exports = config;


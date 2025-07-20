import {
  getWalletClient,
  readContract,
  writeContract,
} from '@wagmi/core';
import { sepolia } from 'wagmi/chains';
import abi from './ProposalDAO.json'; // ✅ Confirm this path

// Import your wagmi config
import { config as wagmiConfig } from './wagmi.config'; // Adjust path as needed

// Contract Details
export const contractConfig = {
  address: '0xf02fC775C9d7Adc0C61f47CA2018Aa19C6194443',
  abi: abi["abi"],
} as const;

//
// 🔍 Get Proposal by ID
//
export const getProposal = async (id: number) => {
  return await readContract(wagmiConfig, {
    ...contractConfig,
    functionName: 'proposals',
    args: [BigInt(id)],
  });
};

//
// ✅ Vote on a Proposal
//
export const voteProposal = async (proposalId: number, support: boolean) => {
  const walletClient = await getWalletClient(wagmiConfig);
  if (!walletClient) throw new Error('Wallet not connected');

  return await writeContract(wagmiConfig, {
    ...contractConfig,
    functionName: 'vote',
    args: [BigInt(proposalId), support],
    account: walletClient.account,
  });
};

//
// 🚀 Execute a Proposal
//
export const executeProposal = async (id: number) => {
  const walletClient = await getWalletClient(wagmiConfig);
  if (!walletClient) throw new Error('Wallet not connected');

  return await writeContract(wagmiConfig, {
    ...contractConfig,
    functionName: 'executeProposal',
    args: [BigInt(id)],
    account: walletClient.account,
  });
};

'use client';
import { voteProposal, executeProposal } from '@/lib/contract';
import { useAccount } from 'wagmi';
import { useState } from 'react';
interface Props {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  executed: boolean;
  deadline: number;
}
export const ProposalCard = ({ id, title, description, votesFor, votesAgainst, executed, deadline
}: Props) => {
  const { address, isConnected } = useAccount();
  const [status, setStatus] = useState('');
  const handleVote = async (support: boolean) => {
    setStatus('Voting...');
    try {
      await voteProposal(id, support);
      setStatus('Vote cast!');
    } catch (err) {
      console.error(err);
      setStatus('Error voting.');
    }
  };
  const handleExecute = async () => {
    setStatus('Executing...');
    try {
      await executeProposal(id);
      setStatus('Executed!');
    } catch (err) {
      setStatus('Error executing.');
    }
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow-md my-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2">👍 {Number(votesFor)} | 👎 {Number(votesAgainst)}</div>
      <div className="text-xs text-gray-500">Deadline: {new Date(deadline *
        1000).toLocaleString()}</div>
      {!executed && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => handleVote(true)} className="px-3 py-1 bg-green-500 text-white
rounded">Vote For</button>
          <button onClick={() => handleVote(false)} className="px-3 py-1 bg-red-500 text-white
rounded">Vote Against</button>
        </div>
      )}
      {Date.now() / 1000 > deadline && !executed && (
        <button onClick={handleExecute} className="mt-2 px-3 py-1 bg-blue-600 text-white
rounded">Execute</button>)}
      <p className="mt-2 text-sm">{status}</p>
    </div>
  );
};

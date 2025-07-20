'use client';
import { ProposalCard } from "@/components/ProposalCard";
import { useEffect, useState } from "react";
import { getProposal } from "@/lib/contract";
import ProposalForm from "@/components/ProposalForm";
export default function Home() {
  const [proposals, setProposals] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const fetched: any[] = [];
      for (let i = 1; i <= 5; i++) {
        try {
          const p: any = await getProposal(i);
          fetched.push({ id: i, ...p });
        } catch (e) {
          break;
        }
      }
      setProposals(fetched);
    })();
  }, []);
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🗳 AI Agent DAO Voting</h1>
      {proposals.map((p, idx) => (
        <ProposalCard key={idx} {...p} />
      ))}
      <ProposalForm/>
    </main>
  );
}
'use client'

import { useState } from 'react'
import { writeContract, getWalletClient } from '@wagmi/core'
import { contractConfig } from '@/lib/contract'
import { sepolia } from 'wagmi/chains'
import { config as wagmiConfig } from '../lib/wagmi.config'; // Adjust path as needed

export default function ProposalForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async () => {
    setStatus('Submitting...')
    try {
      const walletClient = await getWalletClient(wagmiConfig);
      if (!walletClient) {
        setStatus('❌ Wallet not connected')
        return
      }

      const txHash = await writeContract(wagmiConfig, {
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'createProposal',
        args: [title, description],
        account: walletClient.account,
      })

      setStatus(`✅ Proposal submitted! TX Hash: ${txHash}`)
      setTitle('')
      setDescription('')
    } catch (err) {
      console.error(err)
      setStatus('❌ Error submitting')
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">📤 Submit New Proposal</h2>
      <input
        className="w-full p-2 border mb-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Proposal Title"
      />
      <textarea
        className="w-full p-2 border mb-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Proposal Description"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <p className="text-sm mt-2">{status}</p>
    </div>
  )
}

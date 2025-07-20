# 🤖 AI Agent DAO – LLM-Governed Decentralized Investment Voting

Autonomous DeFi governance system that uses **LLMs to generate proposals**, **token holders to vote**, and **on-chain smart contracts to execute**. Built with a full-stack modular architecture covering AI, Web3, DevOps, Cloud, and SaaS business logic.

---

## 🚀 Live Demos

| Component           | URL                                                 |
|---------------------|-----------------------------------------------------|
| 🗳️ Frontend Voting DApp | https://ai-agent-dao-autonomous-investment.vercel.app/                     |
| 🧠 AI Proposal Generator | https://ai-agent-dao-autonomous-investment.onrender.com/ |
| 🔗 Smart Contract (Sepolia) | https://sepolia.etherscan.io/address/0x...         |
| 📊 Supabase Admin Panel | https://app.supabase.com/project/xyz               |

---

## 📦 Monorepo Structure

```

ai-agent-dao/
├── contracts/             # Solidity DAO contracts (ProposalDAO)
├── backend/               # FastAPI + LLM agent + on-chain sender
├── frontend/              # Next.js voting DApp + Clerk + Supabase
├── huggingface-space/     # Gradio UI for public LLM proposal demo
├── subgraph/              # The Graph subgraph for analytics
├── docker-compose.yml     # Local stack runner
├── README.md              # You're here
└── .env.example           # All env vars for each module

````

---

## 🔧 Features

### 🔹 AI Agent
- Generates daily DeFi proposals via OpenAI or Claude/Gemini
- Structured output: `title`, `description`, `rationale`
- Deployable on HuggingFace Space

### 🔹 DAO Smart Contract
- Written in Solidity
- Proposals stored on-chain
- Voting with ERC20 token balance
- Execution via Chainlink Keepers

### 🔹 Frontend Voting App
- Built with Next.js, Tailwind, Wagmi, RainbowKit
- Wallet connection + voting UX
- Execution status + proposal history

### 🔹 Backend Engine
- FastAPI server that calls LLM, formats JSON, submits proposals
- Telegram & Email alerts
- Supabase API key access control

### 🔹 DevOps
- Docker containers for backend/frontend/contracts
- GitHub Actions CI/CD
- Terraform for GCP/AWS deployment (optional)
- Chainlink automation for post-vote execution

### 🔹 SaaS Platform Layer
- Clerk auth for users
- Supabase for vote history + metadata
- Stripe Billing + plan-based access to APIs

---

## ⚙️ Quick Start

### Clone Repo
```bash
git clone https://github.com/yourname/ai-agent-dao
cd ai-agent-dao
````

---

### 1️⃣ Setup Smart Contracts

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Create `.env` for Sepolia:

```env
SEPOLIA_RPC=https://sepolia.infura.io/v3/...
PRIVATE_KEY=your_private_key
```

---

### 2️⃣ Setup Python Backend (LLM Agent)

```bash
cd ../backend
python -m venv venv
venv\Scripts\activate  # (use Activate.ps1 for PowerShell)
pip install -r requirements.txt
uvicorn app.main:app --reload
```

`.env`:

```env
OPENAI_API_KEY=sk-...
CONTRACT_ADDRESS=0xYourDeployedDAO
INFURA_URL=https://sepolia.infura.io/v3/...
PRIVATE_KEY=your_wallet_key
TELEGRAM_BOT_TOKEN=...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

### 3️⃣ Setup Frontend Voting DApp

```bash
cd ../frontend
npm install
npm run dev
```

`.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

### 4️⃣ Deploy Hugging Face Space

```bash
cd ../huggingface-space
# Contains app.py, model.py, requirements.txt
# Push to Hugging Face and set OPENAI_API_KEY as a secret
```

---

## 💰 Business Layer: SaaS + Subscriptions

* `/api/checkout` endpoint creates Stripe subscription session
* API routes (`/proposal/send`) are gated by `x-api-key` + Supabase `stripe_plan`
* Admin dashboard in `/admin` shows all users + activity

---

## 📈 Analytics & Indexing

* The Graph subgraph indexes:

  * ProposalCreated
  * VoteCast
  * ProposalExecuted

Use Apollo Client in frontend to fetch live analytics, then visualize with Chart.js.

---

## 🧠 AI Agent Prompt Template

```text
You are a DeFi investment strategist. Based on market trends, generate:
1. Title of proposal
2. Description
3. Rationale
```

Custom fine-tuning possible via HuggingFace datasets.

---

## 🧪 Tests

```bash
# Contracts
npx hardhat test

# Backend proposal generation
curl http://localhost:8000/proposal/send -H "x-api-key: your_key"
```

---

## 🐳 Docker (Run All Together)

```bash
docker-compose up --build
```

---

## 📜 Licenses

* Smart Contracts: MIT
* Backend & Frontend: Apache 2.0
* Fonts/Images: See `LICENSES/` folder

---

## ✨ Roadmap

| Phase   | Milestone                         |
| ------- | --------------------------------- |
| Q3 2025 | Public SaaS launch + Tokenomics   |
| Q4 2025 | Multi-agent governance logic      |
| Q1 2026 | ZKML privacy upgrade + DAO grants |

---

## 🙋‍♂️ Contributors

* **Vaishali Shivkumar** – AI + Blockchain Full-Stack Architect
  GitHub: [@vaishali-ai](https://github.com/vaishali-ai)

---

## 📬 Contact & Support

* Telegram Bot: [@aiagentdao\_bot](https://t.me/aiagentdao_bot)
* Email: [team@aiagentdao.xyz](mailto:team@aiagentdao.xyz)
* Investor Pitch Deck: [View PDF](./docs/investor-pitch.pdf)

---

## 💖 Star this Repo if You Believe in AI-Governed Finance

[⭐ Star on GitHub](https://github.com/yourname/ai-agent-dao)


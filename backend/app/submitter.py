import json
import os
from dotenv import load_dotenv
from web3 import Web3

load_dotenv()

INFURA_URL = os.getenv("INFURA_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
PUBLIC_KEY = os.getenv("PUBLIC_KEY")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
ABI_PATH = os.getenv("CONTRACT_ABI_PATH")
# Connect to blockchain
web3 = Web3(Web3.HTTPProvider(INFURA_URL))
# Load ABI
with open(ABI_PATH) as f:
    abi = json.load(f)
    contract = web3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS),abi=abi)

def send_proposal_to_chain(title: str, description: str):
    nonce = web3.eth.get_transaction_count(PUBLIC_KEY)
    txn = contract.functions.createProposal(title, description).build_transaction({
        'chainId': 11155111, # Sepolia chain ID
        'gas': 200000,
        'gasPrice': web3.to_wei('10', 'gwei'),
        'nonce': nonce
    })
    signed_txn = web3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return web3.to_hex(tx_hash)

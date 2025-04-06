# from web3 import Web3, exceptions
# import os
# from dotenv import load_dotenv
# from datetime import datetime

# load_dotenv()

# # Blockchain connection setup
# GANACHE_URL = os.getenv("GANACHE_URL", "http://127.0.0.1:7545")
# w3 = Web3(Web3.HTTPProvider(GANACHE_URL))

# if not w3.is_connected():
#     print("x❌ Failed to connect to Ganache")
#     raise RuntimeError("Failed to connect to Ganache")
# print("✅ Connected to Ganache")

# # Account configuration
# ACCOUNT_ADDRESS = os.getenv("ACCOUNT_ADDRESS")
# PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# if not ACCOUNT_ADDRESS or not PRIVATE_KEY:
#     print("❌ Missing account credentials in environment variables")
#     raise RuntimeError("Missing account credentials")

# # Contract configuration
# CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
# CONTRACT_ABI = [
#     {
#         "inputs": [],
#         "stateMutability": "nonpayable",
#         "type": "constructor"
#     },
#     {
#         "inputs": [
#             {"internalType": "string", "name": "_studentName", "type": "string"},
#             {"internalType": "string", "name": "_courseName", "type": "string"},
#             {"internalType": "uint256", "name": "_amountInRs", "type": "uint256"},
#             {"internalType": "string", "name": "_transactionId", "type": "string"}
#         ],
#         "name": "addPayment",
#         "outputs": [],
#         "stateMutability": "nonpayable",
#         "type": "function"
#     },
#     {
#         "inputs": [],
#         "name": "getAllPayments",
#         "outputs": [
#             {"internalType": "string[]", "name": "", "type": "string[]"},
#             {"internalType": "string[]", "name": "", "type": "string[]"},
#             {"internalType": "uint256[]", "name": "", "type": "uint256[]"},
#             {"internalType": "string[]", "name": "", "type": "string[]"},
#             {"internalType": "uint256[]", "name": "", "type": "uint256[]"}
#         ],
#         "stateMutability": "view",
#         "type": "function"
#     },
#     {
#         "inputs": [],
#         "name": "owner",
#         "outputs": [{"internalType": "address", "name": "", "type": "address"}],
#         "stateMutability": "view",
#         "type": "function"
#     }
# ]

# contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

# def build_transaction_params(nonce: int):
#     return {
#         'chainId': 1337,
#         'gas': 3000000,
#         'gasPrice': w3.to_wei('50', 'gwei'),
#         'nonce': nonce,
#     }

# def add_payment(request):
#     try:
        
#         # Prepare transaction
#         nonce = w3.eth.get_transaction_count(ACCOUNT_ADDRESS)
#         transaction = contract.functions.addPayment(
#             "Mahaveer A",
#             "Course name",
#             123,
#             "0x5e4e5c7a4817c6a1b8e3c601ec5c3c7a649bb8c4cf0550b1a1c9a8c91e2a26df"
#         ).build_transaction(build_transaction_params(nonce))

#         # Sign and send transaction
#         signed_txn = w3.eth.account.sign_transaction(transaction, PRIVATE_KEY)
#         tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
#         receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

#         print(f"✅ Payment added. TX Hash: {tx_hash.hex()}")
#         return {
#             "status": "success",
#             "transaction_hash": tx_hash.hex(),
#             "block_number": receipt.blockNumber
#         }
        
#     except ValueError as ve:
#         print(f"❌ Validation error: {str(ve)}")
#     except exceptions.ContractLogicError as cle:
#         print(f"❌ Contract logic error: {str(cle)}")
#     except Exception as e:
#         print(f"❌ Transaction failed: {str(e)}")


import uvicorn

if __name__ == "__main__":
    print("The server started in http://localhost:8000\n")
    print("The Docs in http://localhost:8000/docs\n")
    uvicorn.run("app.app:app", host="0.0.0.0", port=8000, reload=True)

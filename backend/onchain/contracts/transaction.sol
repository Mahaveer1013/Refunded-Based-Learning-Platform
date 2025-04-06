// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TransactionLedger {
    enum TransactionType { Recharge, Purchase, Refund, Withdrawal, MoneyTransfer }
    enum Status { Pending, Completed, Failed }

    struct Transaction {
        address user;
        uint256 amount;
        string paymentId;
        TransactionType transactionType;
        string referenceId;
        Status status;
        uint256 refundedAmount;
        address refundFrom;
        string notes;
        uint256 createdAt;
    }

    uint256 public transactionCount = 0;
    mapping(uint256 => Transaction) public transactions;
    mapping(string => uint256) public paymentIdToTxnId;

    event TransactionRecorded(
        uint256 indexed txnId,
        address indexed user,
        uint256 amount,
        string paymentId,
        TransactionType txnType,
        string referenceId,
        Status status,
        uint256 refundedAmount,
        address refundFrom,
        string notes,
        uint256 createdAt
    );

    modifier onlyValidTxnType(uint8 txnType) {
        require(txnType <= uint8(TransactionType.MoneyTransfer), "Invalid transaction type");
        _;
    }

    function recordTransaction(
        address user,
        uint256 amount,
        string memory paymentId,
        uint8 txnType,
        string memory referenceId,
        uint8 status,
        uint256 refundedAmount,
        address refundFrom,
        string memory notes
    ) external onlyValidTxnType(txnType) {
        require(user != address(0), "Invalid user address");
        require(amount > 0, "Amount must be > 0");

        uint256 txnId = transactionCount++;
        transactions[txnId] = Transaction({
            user: user,
            amount: amount,
            paymentId: paymentId,
            transactionType: TransactionType(txnType),
            referenceId: referenceId,
            status: Status(status),
            refundedAmount: refundedAmount,
            refundFrom: refundFrom,
            notes: notes,
            createdAt: block.timestamp
        });

        paymentIdToTxnId[paymentId] = txnId;

        emit TransactionRecorded(
            txnId, user, amount, paymentId, 
            TransactionType(txnType), referenceId, 
            Status(status), refundedAmount, 
            refundFrom, notes, block.timestamp
        );
    }

    function getTransactionById(uint256 txnId) external view returns (Transaction memory) {
        return transactions[txnId];
    }

    function getTransactionByPaymentId(string calldata paymentId) external view returns (Transaction memory) {
        uint256 txnId = paymentIdToTxnId[paymentId];
        return transactions[txnId];
    }
}

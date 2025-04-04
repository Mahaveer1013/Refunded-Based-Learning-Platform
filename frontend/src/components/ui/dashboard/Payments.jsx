import { FiCreditCard, FiPlus, FiSmartphone, FiDollarSign, FiRefreshCw, FiArrowUpRight, FiArrowDownLeft, FiX } from 'react-icons/fi'
import TransactionTable from './TransactionTable'
import { useState } from 'react'
import RazorpayPayment from './RazopayPayment'

const Payments = () => {
  // Wallet balance and transactions
  const walletBalance = 12500 // in paise (₹125.00)
  const walletTransactions = [
    {
      id: 'txn_1',
      date: '2023-05-15',
      type: 'credit',
      description: 'Wallet Recharge',
      amount: '₹5,000',
      status: 'Completed',
      method: 'UPI',
      txHash: '0x123...456'
    },
    {
      id: 'txn_2',
      date: '2023-05-10',
      type: 'debit',
      description: 'Course Purchase: Blockchain Fundamentals',
      amount: '₹4,500',
      status: 'Completed',
      method: 'Wallet',
      txHash: '0x789...012'
    },
    {
      id: 'txn_3',
      date: '2023-05-08',
      type: 'credit',
      description: 'Refund: Web Development',
      amount: '₹3,500',
      status: 'Completed',
      method: 'Wallet',
      txHash: '0x345...678'
    },
    {
      id: 'txn_4',
      date: '2023-05-05',
      type: 'debit',
      description: 'Transfer to User: john@example.com',
      amount: '₹1,500',
      status: 'Completed',
      method: 'Wallet',
      txHash: '0x901...234'
    },
  ]


  const [showRechargeModal, setShowRechargeModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [rechargeAmount, setRechargeAmount] = useState(1200)
  const [sendAmount, setSendAmount] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')

  const formatBalance = (paise) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(paise / 100)
  }

  const handleRecharge = (e) => {
    e.preventDefault()
    // Handle wallet recharge logic
    console.log('Recharging wallet with:', rechargeAmount)
    setShowRechargeModal(false)
    setRechargeAmount('')
  }

  const handleSendMoney = (e) => {
    e.preventDefault()
    // Handle sending money logic
    console.log(`Sending ${sendAmount} to ${recipientEmail}`)
    setShowSendModal(false)
    setSendAmount('')
    setRecipientEmail('')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Wallet & Payments</h1>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-indigo-600 text-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-medium">Your Wallet Balance</h2>
              <p className="text-3xl font-bold mt-2">{formatBalance(walletBalance)}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRechargeModal(true)}
                className="flex items-center text-black px-4 py-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition"
              >
                <FiArrowDownLeft className="mr-2" />
                Recharge
              </button>
              <button
                onClick={() => setShowSendModal(true)}
                className="flex items-center px-4 text-black py-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition"
              >
                <FiArrowUpRight className="mr-2" />
                Send Money
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recharge Wallet</h2>
              <button onClick={() => setShowRechargeModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleRecharge}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  min="100"
                  step="100"
                  className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <RazorpayPayment rechargeAmount={rechargeAmount} />
            </form>
          </div>
        </div>
      )}

      {/* Send Money Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Send Money</h2>
              <button onClick={() => setShowSendModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSendMoney}>
              <div className="mb-4">
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  id="recipient"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="sendAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  id="sendAmount"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  min="10"
                  className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                  Note (Optional)
                </label>
                <textarea
                  id="note"
                  rows={2}
                  className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Money
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Transaction history */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
          <div className="flex space-x-2">
            <select className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>All Transactions</option>
              <option>Credits</option>
              <option>Debits</option>
            </select>
            <select className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>All Methods</option>
              <option>Wallet</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Net Banking</option>
            </select>
          </div>
        </div>
        <TransactionTable transactions={walletTransactions} />
      </div>
    </div>
  )
}

export default Payments
import { FiExternalLink, FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi'

const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Method</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tx Hash</th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{txn.date}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                <div className="flex items-center">
                  {txn.type === 'credit' ? (
                    <FiArrowDownLeft className="mr-2 text-green-500" />
                  ) : (
                    <FiArrowUpRight className="mr-2 text-red-500" />
                  )}
                  {txn.description}
                </div>
              </td>
              <td className={`whitespace-nowrap px-3 py-4 text-sm font-medium ${
                txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {txn.type === 'credit' ? '+' : '-'}{txn.amount}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{txn.method}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  txn.status === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {txn.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">{txn.txHash}</td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href="#" className="text-indigo-600 hover:text-indigo-900 flex items-center">
                  View <FiExternalLink className="ml-1 h-4 w-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
import { FiDollarSign, FiBook, FiRefreshCw, FiCheckCircle } from 'react-icons/fi'
import ProgressChart from './charts/ProgressChart'
import PaymentChart from './charts/PaymentChart'

const Overview = () => {
  const stats = [
    { name: 'Total Paid', value: '₹12,500', icon: FiDollarSign, change: '+₹2,500', changeType: 'positive' },
    { name: 'Courses Enrolled', value: '3', icon: FiBook, change: '+1', changeType: 'positive' },
    { name: 'Refunds Received', value: '₹1,200', icon: FiRefreshCw, change: '+₹500', changeType: 'positive' },
    { name: 'Modules Completed', value: '7/12', icon: FiCheckCircle, change: '+2', changeType: 'positive' },
  ]

  const recentTransactions = [
    { id: 1, course: 'Blockchain Fundamentals', amount: '₹4,500', date: '2023-05-15', status: 'Completed', type: 'payment' },
    { id: 2, course: 'Smart Contracts', amount: '₹800', date: '2023-05-10', status: 'Processing', type: 'refund' },
    { id: 3, course: 'Web Development', amount: '₹3,500', date: '2023-05-05', status: 'Completed', type: 'payment' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className={`font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>{' '}
                <span className="text-gray-500">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Course Progress</h2>
          <ProgressChart />
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment History</h2>
          <PaymentChart />
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${transaction.type === 'payment' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'}`}>
                  {transaction.type === 'payment' ? <FiDollarSign className="h-5 w-5" /> : <FiRefreshCw className="h-5 w-5" />}
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{transaction.course}</div>
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`text-sm font-medium ${transaction.type === 'payment' ? 'text-indigo-600' : 'text-green-600'}`}>
                  {transaction.amount}
                </div>
                <span className={`ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 bg-gray-50 text-right">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all transactions
          </button>
        </div>
      </div>
    </div>
  )
}

export default Overview
import { FiRefreshCw, FiCheckCircle, FiClock, FiXCircle, FiDollarSign } from 'react-icons/fi'
import RefundRequestCard from './RefundRequestCard'

const Refunds = () => {
  const refundRequests = [
    {
      id: 1,
      course: 'Blockchain Fundamentals',
      amount: '₹1,200',
      dateRequested: '2023-05-10',
      status: 'Completed',
      txHash: '0x789...012',
      modulesCompleted: 3,
      totalModules: 5,
      processedDate: '2023-05-12'
    },
    {
      id: 2,
      course: 'Smart Contract Development',
      amount: '₹800',
      dateRequested: '2023-05-15',
      status: 'Processing',
      txHash: '0x345...678',
      modulesCompleted: 2,
      totalModules: 4,
      processedDate: null
    },
    {
      id: 3,
      course: 'Web Development',
      amount: '₹1,500',
      dateRequested: '2023-04-28',
      status: 'Rejected',
      txHash: null,
      modulesCompleted: 1,
      totalModules: 6,
      processedDate: '2023-05-01',
      rejectionReason: 'Did not meet minimum completion criteria'
    }
  ]

  const stats = [
    { name: 'Total Refunds', value: '₹2,000', icon: FiRefreshCw },
    { name: 'Completed', value: '1', icon: FiCheckCircle },
    { name: 'Processing', value: '1', icon: FiClock },
    { name: 'Rejected', value: '1', icon: FiXCircle },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Refund Requests</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${
                  stat.icon === FiCheckCircle ? 'bg-green-100 text-green-600' :
                  stat.icon === FiClock ? 'bg-yellow-100 text-yellow-600' :
                  stat.icon === FiXCircle ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Smart contract explanation */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Automatic Refund System</h3>
          <p className="mt-1 text-sm text-gray-500">
            Our smart contract automatically processes refunds when you complete course modules.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2">
                  <FiCheckCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">1. Complete Modules</h4>
                  <p className="text-sm text-gray-500 mt-1">Finish the required course modules</p>
                </div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2">
                  <FiRefreshCw className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">2. Smart Contract Verification</h4>
                  <p className="text-sm text-gray-500 mt-1">Progress is verified on blockchain</p>
                </div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2">
                  <FiDollarSign className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">3. Automatic Refund</h4>
                  <p className="text-sm text-gray-500 mt-1">Funds are transferred to your wallet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Refund requests */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">My Refund Requests</h2>
          <select className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Processing</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="space-y-4">
          {refundRequests.map(request => (
            <RefundRequestCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Refunds
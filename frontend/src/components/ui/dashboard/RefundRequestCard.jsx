import { FiDollarSign, FiBook, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi'

const RefundRequestCard = ({ request }) => {
  const statusIcons = {
    'Completed': <FiCheckCircle className="h-5 w-5 text-green-500" />,
    'Processing': <FiClock className="h-5 w-5 text-yellow-500" />,
    'Rejected': <FiXCircle className="h-5 w-5 text-red-500" />
  }
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <FiDollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{request.course}</h3>
              <p className="mt-1 text-sm text-gray-500">Requested on {request.dateRequested}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-medium text-gray-900 mr-4">{request.amount}</span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              request.status === 'Completed' ? 'bg-green-100 text-green-800' :
              request.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
            }`}>
              {statusIcons[request.status]}
              <span className="ml-1.5">{request.status}</span>
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Modules Completed</h4>
            <p className="mt-1 text-sm text-gray-900">
              {request.modulesCompleted}/{request.totalModules} ({Math.round((request.modulesCompleted/request.totalModules)*100)}%)
            </p>
          </div>
          
          {request.txHash && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Transaction Hash</h4>
              <p className="mt-1 text-sm text-gray-900 font-mono">{request.txHash}</p>
            </div>
          )}
          
          {request.processedDate && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {request.status === 'Completed' ? 'Processed Date' : 'Rejected Date'}
              </h4>
              <p className="mt-1 text-sm text-gray-900">{request.processedDate}</p>
            </div>
          )}
          
          {request.rejectionReason && (
            <div className="sm:col-span-2">
              <h4 className="text-sm font-medium text-gray-500">Rejection Reason</h4>
              <p className="mt-1 text-sm text-gray-900">{request.rejectionReason}</p>
            </div>
          )}
        </div>
        
        {request.status === 'Processing' && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiClock className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Your refund is being processed by our smart contract. This usually takes 1-2 business days.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RefundRequestCard
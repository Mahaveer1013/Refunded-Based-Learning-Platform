import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const PaymentMethodCard = ({ method }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {method.icon}
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{method.type}</h3>
            <p className="mt-1 text-sm text-gray-500">•••• •••• •••• {method.lastFour}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
          <FiEdit2 className="mr-1.5 h-4 w-4" />
          Edit
        </button>
        <button className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center">
          <FiTrash2 className="mr-1.5 h-4 w-4" />
          Remove
        </button>
      </div>
    </div>
  )
}

export default PaymentMethodCard
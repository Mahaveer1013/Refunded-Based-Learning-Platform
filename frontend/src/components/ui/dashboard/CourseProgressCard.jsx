import { FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useState } from 'react'

const CourseProgressCard = ({ course }) => {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{course.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{course.description}</p>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-gray-500"
          >
            {expanded ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {course.progress >= course.refundEligibility ? 
              `Eligible for refund (${course.refundEligibility}% completion reached)` :
              `Complete ${course.refundEligibility - course.progress}% more to be eligible for refund`}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Modules</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="space-y-2">
                  {course.modules.map(module => (
                    <li key={module.id} className="flex items-center">
                      {module.completed ? (
                        <span className="flex-shrink-0 h-5 w-5 text-green-500">
                          <FiCheckCircle className="h-5 w-5" />
                        </span>
                      ) : (
                        <span className="flex-shrink-0 h-5 w-5 text-gray-300">
                          <FiCheckCircle className="h-5 w-5" />
                        </span>
                      )}
                      <span className={`ml-2 ${module.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {module.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Actions</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-x-3">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Continue Learning
                </button>
                {course.progress >= course.refundEligibility && (
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Request Refund
                  </button>
                )}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}

export default CourseProgressCard
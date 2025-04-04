import { FiBook, FiCheckCircle, FiAward, FiClock } from 'react-icons/fi'
import CourseProgressCard from './CourseProgressCard'

const Progress = () => {
  const courses = [
    {
      id: 1,
      title: 'Blockchain Fundamentals',
      description: 'Learn the basics of blockchain technology and cryptocurrencies',
      progress: 75,
      modules: [
        { id: 1, title: 'Introduction to Blockchain', completed: true },
        { id: 2, title: 'Cryptography Basics', completed: true },
        { id: 3, title: 'Consensus Mechanisms', completed: true },
        { id: 4, title: 'Smart Contracts Intro', completed: false },
        { id: 5, title: 'Blockchain Use Cases', completed: false },
      ],
      refundEligibility: 60
    },
    {
      id: 2,
      title: 'Smart Contract Development',
      description: 'Build and deploy smart contracts on Ethereum',
      progress: 40,
      modules: [
        { id: 1, title: 'Solidity Basics', completed: true },
        { id: 2, title: 'ERC20 Tokens', completed: true },
        { id: 3, title: 'Testing Smart Contracts', completed: false },
        { id: 4, title: 'Deploying to Testnet', completed: false },
      ],
      refundEligibility: 50
    },
    {
      id: 3,
      title: 'Web3.js & DApp Development',
      description: 'Create decentralized applications with Web3.js',
      progress: 10,
      modules: [
        { id: 1, title: 'Web3.js Introduction', completed: false },
        { id: 2, title: 'Connecting to Ethereum', completed: false },
        { id: 3, title: 'Building a Frontend', completed: false },
      ],
      refundEligibility: 30
    }
  ]

  const stats = [
    { name: 'Courses Enrolled', value: courses.length, icon: FiBook },
    { name: 'Modules Completed', value: courses.reduce((acc, course) => acc + course.modules.filter(m => m.completed).length, 0), icon: FiCheckCircle },
    { name: 'Average Progress', value: `${Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%`, icon: FiAward },
    { name: 'Estimated Completion', value: '2 weeks', icon: FiClock },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Learning Progress</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <stat.icon className="h-6 w-6 text-white" />
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
      
      {/* Course progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">My Courses</h2>
        <div className="grid grid-cols-1 gap-4">
          {courses.map(course => (
            <CourseProgressCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      
      {/* Blockchain verification */}
      <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Blockchain Verification</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your progress is securely recorded on the blockchain. Verify your records below.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Ethereum Mainnet</h4>
              <p className="text-sm text-gray-500 mt-1">
                Transaction hash: <span className="font-mono">0x123...456</span>
              </p>
            </div>
            <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Verify on Etherscan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
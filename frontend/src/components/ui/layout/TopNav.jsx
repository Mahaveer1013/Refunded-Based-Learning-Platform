import { FiMenu, FiBell, FiSearch } from 'react-icons/fi'

const TopNav = ({ setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center">
          <button 
            className="md:hidden text-gray-500 hover:text-gray-600 mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="relative max-w-md w-full md:w-96 hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
            <FiBell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center md:hidden">
                <span className="text-indigo-600 text-sm font-medium">SK</span>
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">Student Name</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNav
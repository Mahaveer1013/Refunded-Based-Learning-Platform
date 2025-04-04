import { Link, useLocation } from 'react-router-dom';
import {
    FiHome,
    FiDollarSign,
    FiBook,
    FiRefreshCw,
    FiSettings,
    FiChevronLeft,
    FiChevronRight,
    FiLogOut,
    FiPlus
} from 'react-icons/fi';
import logo from '../../../assets/react.svg';

const navItems = [
    { path: '/', name: 'Overview', icon: <FiHome className="w-5 h-5" /> },
    { path: '/payments', name: 'Payments', icon: <FiDollarSign className="w-5 h-5" /> },
    { path: '/progress', name: 'Progress', icon: <FiBook className="w-5 h-5" /> },
    { path: '/refunds', name: 'Refunds', icon: <FiRefreshCw className="w-5 h-5" /> },
    { path: '/create-course', name: 'Create Course', icon: <FiPlus className="w-5 h-5" /> },
    { path: '/settings', name: 'Settings', icon: <FiSettings className="w-5 h-5" /> },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
    const location = useLocation();

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const renderNavItems = () => (
        <ul className="space-y-1 px-2">
            {navItems.map((item) => (
                <li key={item.path}>
                    <Link
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg ${location.pathname === item.path
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        onClick={handleCloseSidebar}
                    >
                        <span className="mr-3">{item.icon}</span>
                        {sidebarOpen && <span className="font-medium">{item.name}</span>}
                    </Link>
                </li>
            ))}
        </ul>
    );

    const renderUserProfile = () => (
        <div className={`p-4 border-t border-gray-200 ${sidebarOpen ? 'px-2' : ''}`}>
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">SK</span>
                </div>
                {sidebarOpen && (
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Student Name</p>
                        <p className="text-xs text-gray-500">student@example.com</p>
                    </div>
                )}
            </div>
        </div>
    );

    const renderMobileBackdrop = () => (
        sidebarOpen && (
            <div
                className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden"
                onClick={handleCloseSidebar}
                aria-hidden="true"
            />
        )
    );

    const renderLogoSection = () => (
        <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 ${sidebarOpen ? 'px-2 justify-center' : ''}`}>
            {sidebarOpen && (
                <div className="flex items-center">
                    <img src={logo} alt="EduChain Logo" className="h-8 w-auto" />
                    <span className="ml-2 text-lg font-semibold text-indigo-600">EduChain</span>
                </div>
            )}
            <button
                className="hidden md:block text-gray-500 hover:text-gray-600 ml-2"
                onClick={handleToggleSidebar}
                aria-label={sidebarOpen ? "Expand sidebar" : "Collapse sidebar"}
            >
                {sidebarOpen ? (
                    <FiChevronLeft className="w-5 h-5" />
                ) : (
                    <FiChevronRight className="w-5 h-5" />
                )}
            </button>
        </div>
    );

    return (
        <>
            {renderMobileBackdrop()}

            <aside
                className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-200 ease-in-out z-50 ${sidebarOpen ? 'w-64' : 'w-20'
                    } bg-white border-r border-gray-200 flex flex-col`}
                aria-label="Sidebar"
            >
                {renderLogoSection()}

                <nav className="flex-1 overflow-y-auto py-4">
                    {renderNavItems()}
                </nav>
                <div className={`p-3 border-t cursor-pointer border-gray-200 ${sidebarOpen ? 'px-2' : ''}`} onClick={handleLogout}>
                    <div className="w-full h-10 rounded-full flex items-center pl-3">
                        <FiLogOut className="w-5 h-5 text-gray-500" />
                            {sidebarOpen && <span className="text-indigo-600 font-medium ml-2">Logout</span>}
                        </div>
                </div>
                {renderUserProfile()}
            </aside>
        </>
    );
};

export default Sidebar;
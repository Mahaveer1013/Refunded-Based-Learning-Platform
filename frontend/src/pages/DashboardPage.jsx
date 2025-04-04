import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/ui/layout/Sidebar'
import TopNav from '../components/ui/layout/TopNav'
import { clearToken } from '../utils/auth'
import api from '../components/api/api'

const DashboardPage = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = () => {
        api.post("/auth/logout")
            .then(() => {
                clearToken()
                window.location.href = '/'; // Redirect to login page
            })
            .catch(error => {
                console.error("Logout error:", error.response?.data || error.message);
            });
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />

            {/* Content area */}
            <div className={sidebarOpen ? "md:ml-64" : "md:ml-20" + " flex flex-col flex-1 overflow-hidden"}>
                {/* Top navigation */}
                <TopNav setSidebarOpen={setSidebarOpen} />

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardPage

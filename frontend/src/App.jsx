import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // Example additional page
import api from './components/api/api';
import { AppContext } from './utils/Context';
import Overview from './components/ui/dashboard/Overview'
import Payments from './components/ui/dashboard/Payments'
import Progress from './components/ui/dashboard/Progress'
import Refunds from './components/ui/dashboard/Refunds'
import Settings from './components/ui/dashboard/Settings'
import { clearToken, getToken } from './utils/auth';
import CreateCourse from './components/ui/dashboard/CreateCourse';
import ForgotPasswordPage from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    api.get('/auth/me').then((response) => {
      setIsAuthenticated(true);
      setUserData(response.data);
    }).catch(() => {
      setIsAuthenticated(false);
      setUserData(null);
      clearToken();
      console.log('Session expired. Please log in again.');
      window.location.href = '/login';
    }).finally(() => {
      setIsLoading(false);
    })
  }

  // Example function to handle login
  useEffect(() => {
    const token = getToken();

    if (token) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const CheckAuth = ({ children }) => {
    if (isLoading)
      return <div>Loading...</div>;
    if (!isAuthenticated)
      return <Navigate to={"/login"} />
    return children;
  }

  const CheckNonAuth = ({ children }) => {
    if (isLoading)
      return <div>Loading...</div>;
    if (isAuthenticated)
      return <Navigate to={"/"} />
    return children;
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<CheckNonAuth><LoginPage /></CheckNonAuth>} />
          <Route path="/forgot-password" element={<CheckNonAuth><ForgotPasswordPage /></CheckNonAuth>} />
          <Route path="/reset-password" element={<CheckNonAuth><ResetPassword /></CheckNonAuth>} />
          <Route path="/" element={<DashboardPage />} >
          {/* <Route path="/" element={<CheckAuth><DashboardPage /></CheckAuth>} > */}
            <Route index element={<Overview />} />
            <Route path="payments" element={<Payments />} />
            <Route path="progress" element={<Progress />} />
            <Route path="refunds" element={<Refunds />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;

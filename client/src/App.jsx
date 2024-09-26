import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Tickets from './pages/Tickets';
import Reports from './pages/Reports';
import CreateTicket from './pages/CreateTicket';
import Unauthorized from './pages/Unauthorized';
import MainLayout from './components/MainLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={['User', 'Admin']} />}>
          <Route path='/' element={<MainLayout />}>
            {/* Admin-only routes */}
            <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='tickets' element={<Tickets />} />
              <Route path='accounts' element={<Accounts />} />
              <Route path='reports' element={<Reports />} />
            </Route>

            {/* User-only route */}
            <Route element={<PrivateRoute allowedRoles={['User']} />}>
              <Route path='createticket' element={<CreateTicket />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

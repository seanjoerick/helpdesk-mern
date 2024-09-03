import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navigation from './components/Navigation';
import Profile from './pages/Profile';
import Account from './pages/Account';
import AdminDashBoard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute'; 
import Ticket from './pages/Tickets';
import Reports from './pages/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Navigation />}>
            <Route path='/' element={<AdminDashBoard />} />
            <Route path='tickets' element={<Ticket />} />
            <Route path='reports' element={<Reports />} />
            <Route path='accounts' element={<Account />} />
            <Route path='settings' element={<Settings />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

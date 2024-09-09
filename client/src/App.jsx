import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute'
import AdminDashboard from './pages/Admin/AdminDashboard';
import Profile from './pages/User/Profile';
import Settings from './pages/Admin/Settings';
import Accounts from './pages/Admin/Accounts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/sign-in' element={< SignIn/>} />
        <Route path='/sign-up' element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Navigation />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='accounts' element={<Accounts />} />
            <Route path='settings' element={<Settings  />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

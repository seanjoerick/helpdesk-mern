import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navigation from './components/Navigation'; 
import Profile from './pages/Profile';
import Account from './pages/Account';
import AdminDashBoard from './pages/AdminDashboard';
import Settings from './pages/Settings';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<Navigation />}>
          <Route path='/' element={<Home />} />
          <Route path='admin-dashboard' element={<AdminDashBoard />} />
          <Route path='accounts' element={<Account />} />
          <Route path='settings' element={<Settings />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Account from './pages/Account'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import Profile from './pages/Profile'

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
      <Route path="/user-dashboard" element={<UserDashboard />} /> 
      <Route path="/accounts" element={<Account />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn/>} />
    </Route>
   </Routes>
   </BrowserRouter>
  )
}
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/sign-in' element={< SignIn/>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/' element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

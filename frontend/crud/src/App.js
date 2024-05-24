import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import UserDetail from './pages/UserDetail';
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/userdetail/:user_id' element={<UserDetail />} />
          <Route path='/edituser/:user_id' element={<EditUser />} />
          <Route path='/adduser' element={<AddUser />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />



        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

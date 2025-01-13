import React, { useContext } from 'react'
import Adminlayout from './Adminlayout'
import LoginPage from './LoginPage';
import { LoginContext } from '../Context/Context';
import Vendorlayout from './Vendorlayout';
import { Route, Routes } from 'react-router-dom';
import SignUP from './SignUp';

export default function Mainlayout() {

  const { loggedIn, role } = useContext(LoginContext)

  // const loggedIn = true

  return (
    <div>

      {!loggedIn && <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignUP />} />
      </Routes>}
      {loggedIn && role === 'admin' && <Adminlayout />}
      {loggedIn && role === 'vendor' && <Vendorlayout />}:
    </div>
  )
}

import React, { useContext } from 'react'
import Adminlayout from './Adminlayout'
import LoginPage from './LoginPage';
import { LoginContext } from '../Context/Context';
import Vendorlayout from './Vendorlayout';

export default function Mainlayout() {

  const {loggedIn, role} = React.useContext(LoginContext)

// const loggedIn = true

  return (
    <div>
      {!loggedIn && <LoginPage />}
      {loggedIn && role === 'admin' && <Adminlayout />}
      {loggedIn && role === 'vendor' && <Vendorlayout />}
      
    </div>
  )
}

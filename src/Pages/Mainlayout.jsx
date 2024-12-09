import React, { useContext } from 'react'
import Adminlayout from './Adminlayout'
import LoginPage from './LoginPage';
import { LoginContext } from '../Context/Context';

export default function Mainlayout() {

  const {loggedIn} = React.useContext(LoginContext)

// const loggedIn = true

  return (
    <div>
        {loggedIn?<Adminlayout />:<LoginPage /> }
       
      
    </div>
  )
}

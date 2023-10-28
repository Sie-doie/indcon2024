import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { NavLink, Route, Routes } from 'react-router-dom';
import useFirebase from '../../assests/useFirebase';
import SignIn from './SignIn';
import MonthlyNews from './MonthlyNews';
import Panel from './Panel';

const Admin = () => {
  const { auth } = useFirebase();
  const [isSignedIn, setIsSignedIn] = useState(false)



  onAuthStateChanged(auth,(user) => {
    if(user){
      setIsSignedIn(true) 
    }
    else{
      setIsSignedIn(false)
    }
  })

  function AdminContent({ role }) {
    return (
      <>
        <MonthlyNews />
      </>
    )
  }

  return (
    <>
      <div className="mt-5 mb-5 ms-2">
        <NavLink className={'col-1 me-1'} to='/admin'><Button variant='primary'>Events</Button></NavLink>
        <NavLink className={'col-1 me-1'} to='/admin/notification'><Button variant='primary '>Notification</Button></NavLink>
        <NavLink className={'col-1 me-1'} to='/'><Button variant='dark'>Home</Button></NavLink>
        <NavLink className={'col-1 me-1'} to='/'><Button onClick={() => signOut(auth)} variant='danger'>Logout</Button></NavLink>
      </div>
      {true ?
        <>
        <Routes>
          <Route path='/' element={<Panel />} />
          <Route path='/notification' element={<AdminContent role={'admin'} />} />
        </Routes>
        </>

        : <SignIn />}
    </>
  )
}

export default Admin
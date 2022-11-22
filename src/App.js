import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar1 from './pages/Navbar1';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import View1 from './pages/View1';
import View2 from './pages/View2';
import Custom from './pages/Custom';

const jwtFromStorage =  window.localStorage.getItem('appAuthData');

export function App() {

  const [ userJwt, setUserJwt ] = useState(jwtFromStorage);

  let authRoutes = <>
      <Route path="/login" element = { <Login login={(newJwt) => {
        window.localStorage.setItem('appAuthData', newJwt);
        setUserJwt(newJwt)
        }} /> }/>
      <Route path="/signup" element = { <Signup/> }/>
    </>

    if(userJwt != null) {
      authRoutes = 
        <Route path="/profile" element = { <Profile userJwt={userJwt} logout={() => {
        setUserJwt(null)
        window.localStorage.removeItem('appAuthData');
      }} /> }/>
    }

  return (
    <div> { userJwt != null ?
      <>
        <Navbar />
          <div className="container2">
            <Routes>
              <Route path = "/profile" element = {<Profile/>} />
              <Route path = "/view1" element = {<View1/>} />
              <Route path = "/view2" element = {<View2/>} />
              <Route path = "/custom" element = {<Custom/>} />
              <Route path = "*" element = { <Profile /*userLoggedIn={userJwt != null}*//> }/>
            </Routes>
          </div>
        </>
      :
      <>
        <Navbar1/>
        <Routes>
          <Route path="/" element = { <Home /*userLoggedIn={userJwt != null}*//> }/>
          { authRoutes }
          <Route path="*" element = { <Home /*userLoggedIn={userJwt != null}*//> }/>
        </Routes>
      </>
      }
    </div>
  );
}
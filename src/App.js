import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'

import Home from './pages/Home';
import Home2 from './pages/Home2';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar1 from './pages/Navbar1';
import Navbar from './pages/Navbar';
import Profile from './pages/Profile';
import View1 from './pages/View1';
import View2 from './pages/View2';
import Custom from './pages/Custom';

import jwt_decode from "jwt-decode"

const jwtFromStorage =  window.localStorage.getItem('appAuthData');

export function App() {

  const [ userJwt, setUserJwt ] = useState(jwtFromStorage);

  function checkUserJwtValidity(userJwt) {
    try {
      jwt_decode(userJwt)
      return true;
    } catch (error) {
      return false
    }
  }

  let authRoutes = <>
      <Route path="/login" element = { <Login login={(newJwt) => {
        window.localStorage.setItem('appAuthData', newJwt);
        setUserJwt(newJwt)
        }} /> }/>
      <Route path="/signup" element = { <Signup/> }/>
    </>
    
  // if(userJwt != null) {
        
  //   authRoutes = 
  //     <Route path="/profile" element = { <Profile test="text" token={userJwt} logout={() => {
  //     setUserJwt(null)
  //     console.log("something")
  //     window.localStorage.removeItem('appAuthData');
  //   }} /> }/>
  // }

  /*  if(userJwt != null) {
      authRoutes = 
      <Route path="/profile" element={ <Profile userJwt={ userJwt } logout={() => setUserJwt(null)}/> }/>
    }
  */

  return (
    <div> { checkUserJwtValidity(userJwt) ?
      <>
        <Navbar />
          <div className="container2">
            <Routes>
              <Route path = "/" element = { <Home2 /> } />
              <Route path = "/profile" element = { <Profile test="text" token = {userJwt} 
              logout = {() => {
                  setUserJwt(null)
                  console.log("something")
                  window.localStorage.removeItem('appAuthData');
                }} />
              }/>
              <Route path = "/view1" element = {<View1/>} />
              <Route path = "/view2" element = {<View2/>} />
              <Route path = "/custom" element = {<Custom/>} />
              <Route path = "*" element = { <Home2/> }/>
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
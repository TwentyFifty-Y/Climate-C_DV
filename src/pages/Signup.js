import React, { useState } from 'react'
import axios from 'axios'
import Constants from './Constants.json'
import { useNavigate } from 'react-router-dom'



export default function Signup() {

  const navigate = useNavigate();

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    
    
    try {
      const result = await axios.post(Constants.API_ADDRESS + '/register',
      {
        username:event.target.username.value,
        email:event.target.email.value,
        password:event.target.password.value,
      });
      console.log(result);
      setTimeout(() => {
        navigate('/login', { replace: true });      // so that the user after submitting goes to "login" page && {replace} so the person cannot go back with the arrows
    }, 900);

    } catch(error) {
      alert(error);
    }
  }

  return (
    <div className="slup-container">
      <h1>Create your account</h1>
      <div className="slup-form">
        <form onSubmit={ handleSignupSubmit }>
          <div className="form-floating mb-3">
            <input /*type="email"*/ className="form-control" id="floatingInput" placeholder="Username" name="username"/>
            <label for="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="Email" name="email"/>
            <label for="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingInput" placeholder="Password" name="password"/>
            <label for="floatingInput">Password</label>
          </div>
          <div className="btn-form-element">
            <button className="btn btn-outline-primary btn-slup btn-lg" type="submit">Sign up</button>
          </div>

        </form>
      </div>
		</div>
  )
}

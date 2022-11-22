import React from 'react'
import axios from 'axios'
import Constants from './Constants.json'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(Constants.API_ADDRESS + '/jwtLogin', null, {
          auth: {
            username: event.target.username.value,
            password: event.target.password.value,
          }
        }
      );

      console.log(result)
      const receivedJWT = result.data.token;
      props.login(receivedJWT);
      navigate('/', { replace: true });

    } catch (error) {
        console.log(error)
    }
  }

    return (
      <div className="slup-container">
      <h1>Go to your account</h1>
      <div className="slup-form">
        <form onSubmit={ handleLoginSubmit }>
          <div className="form-floating mb-3">
            <input /*type="email"*/ className="form-control" id="floatingInput" placeholder="Email" name="username"/>
            <label for="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input /*type="email"*/ className="form-control" id="floatingInput" placeholder="Password" name="password"/>
            <label for="floatingInput">Password</label>
          </div>
          <div className="btn-form-element">
            <button className="btn btn-outline-primary btn-slup btn-lg" type="submit">Login</button>
          </div>
        </form>
      </div>
		</div>
    )
}


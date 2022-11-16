import React from 'react'

export default function Login() {
  return (
    <div className="slup-container">
      <h1>Go to your account</h1>
      <div className="slup-form">
        <form /*onSubmit={ handleSignupSubmit }*/>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="Email" name="email"/>
            <label for="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="Password" name="password"/>
            <label for="floatingInput">Password</label>
          </div>

          {/* <div className="form-element">
            Email <br />
            <input type="text" name="email"></input>
          </div>
          <div className="form-element">
            Password <br />
            <input type="text" name="password"></input>
          </div> */}
          <div className="btn-form-element">
            <button className="btn btn-outline-primary btn-slup btn-lg" type="submit">Login</button>
          </div>
        </form>
      </div>
		</div>
  )
}

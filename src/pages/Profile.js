import React, { useState, useEffect } from 'react'
// import jwt from 'jsonwebtoken'
import jwt_decode from "jwt-decode"
// import axios from 'axios'
// import Constants from './Constants.json'
// import { useNavigate } from 'react-router-dom'

export default function Profile(props) {

  const decodedToken = jwt_decode(props.token);
  console.log(decodedToken);

  return (
    <div className="profile-container">
      <h1 className="title">My Profile</h1>
      <div className="table">
        <table>
          <tbody>
          <tr>
            <td>Name</td>
            <td>{ decodedToken.user.username.S }</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{ decodedToken.user.email.S }</td>
          </tr>
          <tr>
            <td>Connection</td>
            <td onClick={ props.logout } style={{fontWeight: "bold", cursor: "pointer"}}> Logout </td>
          </tr>
          <tr>
            <td>Account</td>
            <td /*onClick = { handleDeleteRequest }*/ style={{fontWeight: "bold", cursor: "pointer"}}> Delete my account </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

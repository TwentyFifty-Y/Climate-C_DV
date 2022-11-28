import React from 'react'
// import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

export default function Profile(props) {

  // const token = window.localStorage.getItem("appAuthData");
  // const decoded = jwt_decode(props.token);
  // console.log(decoded);

  // const decodedJwt = jwt.decode(props.jwt);
  // console.log(decodedJwt);

  return (
    <div className="profile-container">
      <h1 className="title">My Profile</h1>
      <div className="table">
        <tr>
          <td> Name </td>
          <td> Marion </td>
        </tr>
        <tr>
          <td> Email </td>
          <td> marion@email.com </td>
        </tr>
        <tr>
          <td> Account </td>
          <td> Delete my account </td>
        </tr>
        <tr>
          <td> Connection </td>
          <td onClick={ props.logout } style={{fontWeight: "bold"}}> Logout </td>
        </tr>
      </div>
      <button onClick={ props.logout }>Logout</button>
      {/* <div>
        email: { decoded.user.email }<br />
        id: { decoded.user.id }<br />
      </div> */}
    </div>
    
  )
}

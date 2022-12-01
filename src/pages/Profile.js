import React from 'react'
// import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import Constants from './Constants.json'
import { useNavigate } from 'react-router-dom'

export default function Profile(props) {

  // const token = window.localStorage.getItem("appAuthData");
  // const decoded = jwt_decode(props.token);
  // console.log(decoded);

  // const decodedJwt = jwt.decode(props.jwt);
  // console.log(decodedJwt);

  const handleDeleteRequest = async (event) => {
    event.preventDefault();
    
    try {
      const result = await axios.delete(Constants.API_ADDRESS + '/delete',
      {
        username:event.target.username.value,
        email:event.target.email.value,
        password:event.target.password.value,
      });
      console.log(result);
      setTimeout(() => {
        console.log("yaas you're deleted");
        navigate('/home', { replace: true });      // so that the user after submitting goes to "login" page && {replace} so the person cannot go back with the arrows
    }, 900);

    } catch(error) {
      alert(error);
    }
  }

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
          <td onClick = { handleDeleteRequest }> Delete my account </td>
        </tr>
        <tr>
          <td> Connection </td>
          <td onClick={ props.logout } style={{fontWeight: "bold", cursor: "pointer"}}> Logout </td>
        </tr>
      </div>
      {/* <div>
        email: { decoded.user.email }<br />
        id: { decoded.user.id }<br />
      </div> */}
    </div>
    
  )
}

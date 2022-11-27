import React from 'react'
import { Link } from 'react-router-dom';
import Constants from './Constants.json'
import axios from 'axios';
// import jwt from 'jsonwebtoken';

export default function Profile(props) {

  // let decodedJwt = jwt.decode(props.userJwt);
  // console.log(decodedJwt);

  return (
    <div>Profile
      {/* <div>
        Here is the data decoded from the user JWT<br />
        email: { decodedJwt.user.email }<br />
        id: { decodedJwt.user.id }<br />
      </div> */}
      <button class="btn btn-outline-success btn-nav" onClick={ props.logout }>Logout</button>
    </div>
    
  )
}

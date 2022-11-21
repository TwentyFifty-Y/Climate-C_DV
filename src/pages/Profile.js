import React from 'react'

export default function Profile(props) {
  return (
    <div>Profile
      <button class="btn btn-outline-success btn-nav" onClick={ props.logout }>Logout</button>
    </div>
    
  )
}

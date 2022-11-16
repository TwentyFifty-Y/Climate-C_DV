import React from 'react'
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div className="home-container">
      <h1>Choose a ready-made view <br/> or create a custom one</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Accumsan sit amet nulla facilisi. 
        Feugiat sed lectus vestibulum mattis ullamcorper velit. Diam vulputate ut pharetra 
        sit amet aliquam id diam. Odio pellentesque diam volutpat commodo sed egestas. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan sit amet nulla facilisi. Feugiat sed lectus vestibulum mattis ullamcorper velit. Diam vulputate ut pharetra sit amet aliquam id diam. Odio pellentesque diam volutpat commodo sed egestas. In mollis nunc sed id semper risus.
        In mollis nunc sed id semper risus.</p>
        <Link to ="/login" type="button" className="btn btn-outline-primary btn-home btn-home-li btn-lg">Login</Link>
        <Link to ="/signup" type="button" className="btn btn-outline-primary btn-home btn-home-su btn-lg">Sign up</Link>
    </div>
  )
}

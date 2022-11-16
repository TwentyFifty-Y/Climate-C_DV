import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
        <Link className="navbar-brand" to ="/">Twenty-Fifty-y</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to ="/login">Log in</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to ="/signup">Sign up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to ="/view1">Atmospheric CO<span id="sub">2</span> and Emissions<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to ="/view2">Emission sources</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to ="/custom">My views</Link>
                </li>

            </ul>
        </div>
    </nav>
  )
}

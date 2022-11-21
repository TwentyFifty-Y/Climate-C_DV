import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <Link class="navbar-brand" to="/profile">My profile</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <Link class="nav-link" to="/view1">Atmospheric CO<span id="sub">2</span> and Emissions</Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/view2">Emission sources</Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/custom">My views</Link>
            </li>
        </ul>
        <form class="d-flex" role="search">
            {/* <Link class="btn btn-outline-success btn-nav" to="/" type="submit" onClick={ props.logout }>Logout</Link> */}
            <button class="btn btn-outline-success btn-nav" onClick={ props.logout }>Logout</button>

        </form>
        </div>
    </div>
    </nav>
  )
}

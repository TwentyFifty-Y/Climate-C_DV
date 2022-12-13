import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <Link class="navbar-brand" to="/">Twenty-Fifty-y</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link" to="/view1">Atmospheric CO<span id="sub">2</span> and Emissions</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/view2">Emission sources</Link>
            </li>
        </ul>
        <form class="d-flex" role="search">
          <Link class="btn btn-outline-success btn-nav1" to="/login" type="submit">Log in</Link>
          <Link class="btn btn-outline-success btn-nav1" to="/signup" type="submit">Signup</Link>
        </form>
        </div>
    </div>
    </nav>
  )
}

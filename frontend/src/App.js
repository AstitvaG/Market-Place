import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'


function App() {
  return (
    <Router>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <Link to="/" class="navbar-brand">MARKET PLACE</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link to="/" class="nav-link">Home <span class="sr-only">(current)</span></Link>
              </li>
              <li class="nav-item">
                <Link to="/create" class="nav-link">Create User </Link>
              </li>
            </ul>
            <ul class="navbar-nav navbar-right">
              <li>
                <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              </li>
            </ul>
            <ul class="navbar-nav navbar-right">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">My Profile</a>
                  <a class="dropdown-item" href="#">My Orders</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Logout</a>
                </div>
              </li>
            {/* <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            </ul>
          </div>
        </nav>
        <div className="container">
          <Route path="/" exact component={UsersList}/>
          <Route path="/create" component={CreateUser}/>
          <p>
            
          </p>
          <br/>
        </div>
    </Router>
  );
}

export default App;

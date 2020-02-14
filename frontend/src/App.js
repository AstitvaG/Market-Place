import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Searchitem from './components/search-item.component'
import Searchlist from  './components/search-list.component'


function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <Link to="/" className="navbar-brand">MARKET PLACE</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">Create User </Link>
              </li>
            </ul>
            {/* <ul className="navbar-nav navbar-right">
              <li>
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              </li>
            </ul> */}
            <ul className="navbar-nav navbar-right">
              <li className="nav-item">
                <Link to="/search" className="nav-link" href="#">Hey USERNAME!</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">My Profile</a>
                  <a className="dropdown-item" href="#">My Orders</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          {/* <div className="row justify-content-center  align-center">
            <div className="form-group align-center ">
              <br/>
              <br/>
              <form className="form-inline my-2 my-lg-0 align-center">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </div> */}
          <div className="row justify-content-center align-center">
            <div className="col-auto">
              <Route path="/" exact component={UsersList}/>
              <Route path="/create" component={CreateUser}/>
              <Route path="/search" component={Searchitem}/>
              <Route path="/id" component={Searchlist}/>
            </div>
          </div>
          <p>
            
          </p>
          <br/>
        </div>
    </Router>
  );
}

export default App;

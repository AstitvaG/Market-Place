import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UsersList from './components/users-list.component'
import Searchitem from './components/search-item.component'
import LoginSignup from  './components/login-signup.component'
import VendorMain from  './components/vendor-main.component'



function req(vax) {
  var loginstats = localStorage.getItem('isLoggedIn');
  var typestats = localStorage.getItem('type');
  if (loginstats === "true" && typestats === 'Vendor') {
    return VendorMain;
  }
  else if (loginstats === "true" && typestats === 'Customer')
  {
    return Searchitem;
  }
  else return LoginSignup;
}

// function checklogin(vax)
// {
//   var loginstats = localStorage.getItem('isLoggedIn');
//   var typestats = localStorage.getItem('type');
//   console.log("LOL:",typestats, loginstats);
//   if (loginstats === "true" && typestats === 'Vendor'){
//     console.log("LOL inside:",typestats, loginstats);
//     return vax;}
//   else return LoginSignup;
// }

function App() {
  return (
    <Router>
       <div className="container-fluid">
              <Route path="/" exact component={req(LoginSignup)}/>
              <Route path="/search" component={Searchitem}/>
              <Route path="/enter" component={req(LoginSignup)}/>
              {/* <Route path="/vendor" component={checklogin(VendorMain)}/> */}
          {/* <p>
          {localStorage.getItem('userId')}
          <br />
          {localStorage.getItem('username')}
          </p> */}
          <br/>
        </div>
       
    </Router>
  );
}

export default App;

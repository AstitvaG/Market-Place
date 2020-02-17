import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UsersList from './components/users-list.component'
import Searchitem from './components/search-item.component'
import LoginSignup from  './components/login-signup.component'
import VendorMain from  './components/vendor-main.component'



function req(vax) {
  var loginstats = localStorage.getItem('isLoggedIn');
  var typestats = localStorage.getItem('type');
  console.log("LOL:",typestats, loginstats);
  if (loginstats === "true" && typestats === 'Vendor') {
    console.log("LOL inside:",typestats, loginstats);
    return VendorMain;
  }
  else if (loginstats === "true" && typestats === 'Customer')
  {
    console.log("LOL inside:",typestats, loginstats);
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
              <Route path="/" exact component={UsersList}/>
              <Route path="/search" component={Searchitem}/>
              <Route path="/enter" component={req(LoginSignup)}/>
              {/* <Route path="/vendor" component={checklogin(VendorMain)}/> */}
          <p>
          {localStorage.getItem('userId')}
          </p>
          <br/>
        </div>
       
    </Router>
  );
}

export default App;

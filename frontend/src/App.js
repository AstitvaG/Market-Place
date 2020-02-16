import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import UsersList from './components/users-list.component'
import Searchitem from './components/search-item.component'
import LoginSignup from  './components/login-signup.component'
import VendorMain from  './components/vendor-main.component'

function toggle(){
  var element = document.getElementById("main_nav");
  element.classList.toggle("rounded-pill");
  element.classList.toggle("rounded-lg");
}


function App() {
  return (
    <Router>
       <div className="container-fluid">
              <Route path="/" exact component={UsersList}/>
              <Route path="/search" component={Searchitem}/>
              <Route path="/new" component={LoginSignup}/>
              <Route path="/vendor" component={VendorMain}/>
          <p>
            
          </p>
          <br/>
        </div>
       
    </Router>
  );
}

export default App;

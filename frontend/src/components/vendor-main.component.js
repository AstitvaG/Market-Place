import React, {Component} from 'react';
import axios from 'axios';

import './vendor-main.component.css';


export default class VendorMain extends Component {
    
    temp = ""
    constructor(props) {
        super(props);

        this.state = {
            searchval: '',
            showReasult: false,
            toggle: true
        }

        this.onChangeSearchval = this.onChangeSearchval.bind(this);
    }
    
    onChangeSearchval(e) {
        this.setState({ searchval: e.target.value });
        // this.onSubmit(e);
    }

    toggle(e){
        var element = document.getElementById("main_nav");
        element.classList.toggle("rounded-pill");
        element.classList.toggle("rounded-lg");
      }

    render() {
        return (
            <div>
                {/* Navigation Part */}
                <nav id="main_nav" className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top rounded-pill m-2 p-4 shadow-lg h3">
                    <div className="container-fluid">
                    <button className="navbar-toggler" type="button" onClick={this.toggle} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
        
                    <a href="/" className="navbar-nav h2 navbar-center">MARKET PLACE</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto navbar-left">
                        <li className="nav-item active">
                            <a href="/" className="nav-link">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="/new" className="nav-link">Create User </a>
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
                            <a href="/search" className="nav-link" href="#">Hey USERNAME!</a>
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
        
                    </div>
                </nav>
                
                {/* Options Part */}
                <div id="pricing" className="container-fluid">
                    <br />
                    <br />
                    <div className="row container-fluid">
                        <div className="col m-2">
                            <div className="panel panel-default text-center">
                                <div className="panel-heading">
                                <h1>Add Products</h1>
                                </div>
                                <form onSubmit={this.onSignup}>
                                    <div className="panel-body m-5">
                                        <div className="form-holder">
                                            <input type="text" required className="input" placeholder="Name"
                                                    value={this.state.username}
                                                    onChange={this.onChangeUsername} /><br />
                                            <input type="email" required 
                                                    className="input" placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.onChangeEmail} /><br />
                                            <input type="password" required className="input" placeholder="Password" 
                                                value={this.state.password}
                                                onChange={this.onChangePassword} /><br />
                                            <br />
                                        </div>
                                    </div>
                                    <div className="panel-footer m-5">
                                        <h3>$19</h3>
                                        <h4>per month</h4>
                                        <button type="submit" className="btn btn-lg">Sign Up</button>
                                    </div>
                                </form>
                            </div>      
                        </div>     
                        <div className="col m-2">
                            <div className="panel panel-default text-center">
                                <div className="panel-heading">
                                <h1>Current Products</h1>
                                </div>
                                <div className="panel-body m-5">
                                    <p><strong>50</strong> Lorem</p>
                                    <p><strong>25</strong> Ipsum</p>
                                    <p><strong>10</strong> Dolor</p>
                                    <p><strong>5</strong> Sit</p>
                                    <p><strong>Endless</strong> Amet</p>
                                </div>
                                <div className="panel-footer m-5">
                                    <h3>$29</h3>
                                    <h4>per month</h4>
                                    <button className="btn btn-lg">Sign Up</button>
                                </div>
                            </div>      
                        </div>    
                    </div>
                    <br />     
                    <div className="row container-fluid">
                        <div className="col m-2">
                            <div className="panel panel-default text-center">
                                <div className="panel-heading">
                                <h1>Dispatch Ready</h1>
                                </div>
                                <div className="panel-body m-5">
                                    <p><strong>20</strong> Lorem</p>
                                    <p><strong>15</strong> Ipsum</p>
                                    <p><strong>5</strong> Dolor</p>
                                    <p><strong>2</strong> Sit</p>
                                    <p><strong>Endless</strong> Amet</p>
                                </div>
                                <div className="panel-footer m-5">
                                    <h3>$19</h3>
                                    <h4>per month</h4>
                                    <button className="btn btn-lg">Sign Up</button>
                                </div>
                            </div>      
                        </div>
                        <div className="col m-2">
                            <div className="panel panel-default text-center">
                                <div className="panel-heading">
                                <h1>Dispatched</h1>
                                </div>
                                <div className="panel-body m-5">
                                    <p><strong>50</strong> Lorem</p>
                                    <p><strong>25</strong> Ipsum</p>
                                    <p><strong>10</strong> Dolor</p>
                                    <p><strong>5</strong> Sit</p>
                                    <p><strong>Endless</strong> Amet</p>
                                </div>
                                <div className="panel-footer m-5">
                                    <h3>$29</h3>
                                    <h4>per month</h4>
                                    <button className="btn btn-lg">Sign Up</button>
                                </div>
                            </div>      
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}
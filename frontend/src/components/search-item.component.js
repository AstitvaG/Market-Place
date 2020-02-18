import React, { Component } from 'react';
import axios from 'axios';

import Searchlist from './search-list.component'


export default class Searchitem extends Component {

    temp = ""
    constructor(props) {
        super(props);

        this.state = {
            searchval: '',
            showReasult: false,
            toggle: true
        }

        this.onChangeSearchval = this.onChangeSearchval.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeSearchval(e) {
        this.setState({ searchval: e.target.value });
        // this.onSubmit(e);
    }


    onSubmit(e) {
        e.preventDefault();
        this.temp = this.state.searchval
        this.toggle_temp = !this.state.toggle
        this.setState({
            showReasult: true,
            // searchval: '',
            toggle: this.toggle_temp
        });
        // document.getElementById("results").innerHTML = ""
    }

    getComponent() {
        if (this.state.showReasult && !this.state.toggle) {  // show the modal if state showModal is true
            console.log("Got:" + this.temp)
            this.state.toggle = !this.state.toggle
            return <Searchlist url={this.temp} />;
        } else {
            return null;
        }
    }

    logout() {
        console.log('Entered here')
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('username', 'null');
        localStorage.setItem('userId', 'null');
        window.location.reload(true);
    }

    render() {
        return (
            <div>
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
                                        <a className="dropdown-item" onClick={this.logout}>Logout</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>

                <div className="row justify-content-center  align-center">
                    <div className="form-group align-center ">
                        <br />
                        <br />
                        <form className="form-inline my-2 my-lg-0 align-center" onSubmit={this.onSubmit}>
                            <input className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={this.state.searchval}
                                onChange={this.onChangeSearchval}
                            />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <div id="results">
                            <br />
                            {this.getComponent()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import axios from 'axios';

import Searchlist from './search-list.component'


export default class Searchitem extends Component {

    temp = ""
    constructor(props) {
        super(props);

        this.state = {
            searchval: '',
            url: '61',
            myproducts: [],
            productdetails: [],
            sort_type: "Name"
        }

        this.onChangeSearchval = this.onChangeSearchval.bind(this);
        // this.getComponent = this.getComponent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
        // var userid = localStorage.getItem('userId');
        axios.post('http://localhost:4000/userproducts/my', { userid: localStorage.getItem('userId') })
            .then(response => {
                // Object.entries(tempresp).length === 0 && tempresp.constructor === Object
                this.setState({ myproducts: response.data });
                // var tempresp = new JSON();
                var tempresp = [];
                for (var i = 0; i < response.data.length; i++) {
                    // for (var i = 0; i < body.length; i++) {
                    axios.post('http://localhost:4000/userproducts/get', { productid: response.data[i].productid })
                        .then(response1 => {
                            tempresp[tempresp.length] = response1.data;
                            // return response.data
                            this.setState({ productdetails: tempresp });
                            // console.log(response.data[i].productid)
                            // console.log(tempresp.length, tempresp)
                            // console.log("---------------------------------")
                        })
                    // Product.findById(body[i].productid, function (err1, result) {
                    // })
                    // }
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeSearchval(e) {
        this.setState({
            searchval: e.target.value,
            url: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        this.setState({
            url: this.state.searchval
        });
    }


    logout() {
        console.log('Entered here')
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('username', 'null');
        localStorage.setItem('userId', 'null');
        window.location.reload(true);
    }

    getdetails(productid) {
        return axios.post('http://localhost:4000/userproducts/get', { productid: productid })
            .then(response => {
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getval(i, str) {
        if (this.state.productdetails[i])
            return this.state.productdetails[i][str];
        else return "";
    }

    getstatus(i) {
        var isDispatched = this.getval(i, "isDispatched")
        var avail_amount = this.getval(i, "avail_amount")
        if (isDispatched == "Yes")
            return "Dispatched"
        else if (isDispatched == "Canceled")// if (isDispatched == "No" && avail_amount != "0")
            return "Canceled"
        else if (isDispatched == "No" && avail_amount != "0")
            return "Waiting"
        else
            return "Placed"
    }


    onEdit(productid, prev_purchase, curravail, id) {
        var new_amount = prompt("Please enter new quantity (0," + (curravail + prev_purchase) + ")", prev_purchase);
        if (new_amount != null && /^\d+$/.test(new_amount) && curravail + prev_purchase - parseInt(new_amount) >= 0
            && parseInt(new_amount) >= 0) {

            axios.post('http://localhost:4000/products/update', {
                id: productid,
                avail_amount: curravail + prev_purchase - parseInt(new_amount),
                isDispatched: "No"
            })
                .then(response => {
                    window.location.reload(true);
                    console.log(response);
                    alert("Updated successfully")
                    // this.setState({ Products: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                });
            axios.post('http://localhost:4000/userproducts/update', {
                id: id,
                buy_amount: parseInt(new_amount),
            })
                .then(response => {
                    window.location.reload(true);
                    console.log(response);
                    // this.setState({ Products: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        else {
            alert("Wrong or null value supplied")
        }
    }

    onRate(vendorid) {
        var new_amount = prompt("Please enter new rating (0,5):"+vendorid, 5);
        if (new_amount != null && /^\d+$/.test(new_amount) && parseInt(new_amount)<=5 && parseInt(new_amount)>=0) {

            axios.post('http://localhost:4000/addrating', {
                id: vendorid,
                newReview: parseInt(new_amount)
            })
                .then(response => {
                    console.log(response);
                    alert("Rating added successfully")
                    window.location.reload(true);
                    // this.setState({ Products: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            alert("Wrong or null value supplied")
        }
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
                                    <a href="/search" className="nav-link" href="#">Hey {localStorage.getItem('username')}!</a>
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
                <p>Search Here</p>
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
                        <br />
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sort by: {this.state.sort_type}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#" onClick={e => this.setState({ sort_type: "Name" })}>Name</a>
                                <a className="dropdown-item" href="#" onClick={e => this.setState({ sort_type: "Cost low to high" })}>Cost: low to high</a>
                                <a className="dropdown-item" href="#" onClick={e => this.setState({ sort_type: "Cost high to low" })}>Cost: high to low</a>
                                <a className="dropdown-item" href="#" onClick={e => this.setState({ sort_type: "Seller rating" })}>Seller rating</a>
                                <a className="dropdown-item" href="#" onClick={e => this.setState({ sort_type: "Available amount" })}>Available amount</a>
                                <a className="dropdown-item" href="#" onClick={e => this.setState({ sort_type: "Date" })}>Date</a>
                            </div>
                        </div>
                        <div id="results">
                            <br />
                            <Searchlist url={this.state.url} key={this.state.url + "/" + this.state.sort} sort={this.state.sort_type} />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center  align-center">
                    <table className="table text-center">
                        <tbody>
                            {
                                this.state.myproducts.sort((a, b) => new Date(b.time) - new Date(a.time)).map((product, i) => {
                                    if (true)
                                        // var productdetails = this.getdetails(product.productid);
                                        // console.log(productdetails)
                                        return (
                                            <tr key={i}>
                                                <td className="fit">{this.getval(i, "name")}</td>
                                                <td className="fit">{product.buy_amount}</td>
                                                {/* <td className="fit">{product.isDispatched}</td> */}
                                                <td className="fit">{this.getval(i, "cost")}</td>
                                                <td className="fit">{this.getstatus(i)}</td>
                                                <td className="fit">{this.getval(i, "avail_amount") + "/" + this.getval(i, "total_amount")}</td>
                                                {
                                                    this.getstatus(i) == "Waiting" &&
                                                    <td className="fit">
                                                        <button className="btn btn-sm btn-dark" onClick={e => this.onEdit(product.productid, product.buy_amount, this.getval(i, "avail_amount"), product._id)}>Edit <i className="fas fa-edit"></i></button>
                                                    </td>
                                                }
                                                {
                                                    this.getstatus(i) == "Placed" &&
                                                    <td className="fit">
                                                        <button className="btn btn-sm btn-dark" onClick={e => this.onRate(this.getval(i, "userid"))}>Rate <i className="fas fa-star"></i></button>
                                                    </td>
                                                }
                                                {
                                                    this.getstatus(i) == "Dispatched" &&
                                                    <td className="fit">
                                                        <button className="btn btn-sm btn-dark" onClick={e => this.onDispatch(product._id)}>Review <i className="fas fa-medal"></i></button>
                                                    </td>
                                                }
                                                {
                                                    this.getstatus(i) == "Canceled" &&
                                                    <td className="fit">
                                                        <button className="btn btn-sm btn-dark" onClick={e => this.onDispatch(product._id)}>Why <i className="fas fa-question"></i></button>
                                                    </td>
                                                }
                                            </tr>
                                        )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
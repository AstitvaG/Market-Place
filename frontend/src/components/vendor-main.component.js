import React, { Component } from 'react';
import axios from 'axios';

import './vendor-main.component.css';


export default class VendorMain extends Component {

    temp = ""
    constructor(props) {
        super(props);

        this.state = {
            PName: '',
            Price: '',
            Qnty: '',
            Products: [],
            ready: 0
        }


        this.onChangePName = this.onChangePName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.logout = this.logout.bind(this);
        this.onAddProduct = this.onAddProduct.bind(this);
    }


    onChangePName(e) {
        this.setState({ PName: e.target.value });
    }

    onChangePrice(e) {
        this.setState({ Price: e.target.value });
    }

    onChangeQuantity(e) {
        this.setState({ Qnty: e.target.value });
    }

    toggle(e) {
        var element = document.getElementById("main_nav");
        element.classList.toggle("rounded-pill");
        element.classList.toggle("rounded-lg");
    }

    logout() {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('username', 'null');
        localStorage.setItem('userId', 'null');
        window.location.reload(true);
    }

    countListed = 0;
    countReady = 0;

    onAddProduct() {
        var userid = localStorage.getItem('userId');
        const newProduct = {
            name: this.state.PName,
            cost: this.state.Price,
            total_amount: this.state.Qnty,
            userid: userid
        }

        axios.post('http://localhost:4000/products/add', newProduct)
            .then(res => {
                alert('Product added successfully !');
            })

        this.setState({
            PName: '',
            Price: '',
            Qnty: '',
        });
    }

    componentDidMount() {
        // var userid = localStorage.getItem('userId');
        axios.post('http://localhost:4000/products/my', { userid: localStorage.getItem('userId') })
            .then(response => {
                this.setState({ Products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        this.countListed = 0;
        this.countReady = 0;
    }

    onDispatch(productid) {
        axios.post('http://localhost:4000/products/update', {
            id: productid,
            avail_amount: 0,
            isDispatched: "Yes"
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


    render() {
        return (
            <div>
                {/* Navigation Part */}
                <nav id="main_nav" className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top rounded-pill m-2 mt-4 p-4 shadow-lg h3">
                    <div className="container-fluid">
                        <ul className="navbar-nav mr-auto navbar-left">
                            <li className="nav-item active">
                                    <a href="/" className="nav-link">MARKET PLACE<span className="sr-only">(current)</span></a>
                                </li>
                        </ul>
                        <button className="navbar-toggler" type="button" onClick={this.toggle} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="navbar collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto navbar-left">
                            </ul>
                            <ul className="navbar-nav navbar-right">
                                <li className="nav-item">
                                    <a href="/search" className="nav-link" href="#">Hey <strong>{localStorage.getItem('username')}</strong> !</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Account
                            </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" onClick={this.logout}>Logout</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>

                {/* Options Part */}
                <div className="container-fluid">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="row container-fluid">
                        <div className="col m-2">
                            <div className="panel panel-default text-center">
                                <div className="panel-heading">
                                    <h1>Add Products</h1>
                                </div>
                                <form className="form" onSubmit={this.onSignup}>
                                    <div className="panel-body m-5">
                                        <div className="form-holder">
                                            <input type="text" required className="input form-control my-3" placeholder="Product name"
                                                onChange={this.onChangePName} />
                                            <input type="number" required
                                                className="input form-control my-3" placeholder="Price"
                                                onChange={this.onChangePrice} />
                                            <input type="Number" required className="input form-control my-3" placeholder="Quantity"
                                                onChange={this.onChangeQuantity} />
                                        </div>
                                    </div>
                                    <div className="panel-footer m-5">
                                        <button type="submit" className="btn btn-lg"
                                            onClick={this.onAddProduct}>Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col m-2">
                            <div className="panel panel-default text-center">
                                <div className="panel-heading">
                                    <h1>Current Products</h1>
                                </div>
                                <div className="panel-body-1 m-5">
                                    <table className="table text-center">
                                        <tbody>
                                            {
                                                // this.countListed = 0;
                                                this.state.Products.map((product, i) => {
                                                    if (i === 0)
                                                        this.countListed = 0;
                                                    if (product.avail_amount) {
                                                        this.countListed++;

                                                        return (
                                                            <tr key={i}>
                                                                <td className="fit">{product.name}</td>
                                                                <td className="fit">{product.cost}</td>
                                                                <td className="fit">{product.avail_amount}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="panel-footer m-5">
                                    <h3>{this.countListed}</h3>
                                    <h4>total products</h4>
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
                                <div className="panel-body-1 m-5">
                                    <table className="table text-center">
                                        <tbody>
                                            {
                                                this.state.Products.map((product, i) => {
                                                    if (i === 0) this.countReady = 0;
                                                    if (!product.avail_amount && product.isDispatched === "No") {
                                                        this.countReady++;
                                                        return (
                                                            <tr key={i}>
                                                                <td className="fit">{product.name}</td>
                                                                <td className="fit">{product.cost}</td>
                                                                {/* <td className="fit">{product._id}</td> */}
                                                                <td className="fit">{product.isDispatched}</td>
                                                                <td className="fit">
                                                                    <button className="btn btn-sm btn-dark" onClick={e => this.onDispatch(product._id)}>Dispatch</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="panel-footer m-5">
                                    <h3>{this.countReady}</h3>
                                    <h4>items ready to be dispatched</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col m-2">
                            <div className="panel panel-default text-center">
                                <div className="panel-heading">
                                    <h1>Dispatched</h1>
                                </div>
                                <div className="panel-body-1 m-5">
                                    <table className="table text-center">
                                        <tbody>
                                            {
                                                this.state.Products.map((product, i) => {
                                                    if (!product.avail_amount && product.isDispatched === "Yes") {
                                                        return (
                                                            <tr key={i}>
                                                                <td className="fit">{product.name}</td>
                                                                <td className="fit">{product.cost}</td>
                                                                {/* <td className="fit">{product._id}</td> */}
                                                                <td className="fit">{product.isDispatched}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="panel-footer m-5">
                                    <h3>{this.state.Products.length - this.countListed - this.countReady}</h3>
                                    <h4>items dispatched</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
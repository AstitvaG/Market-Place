import React, { Component } from 'react';
import axios from 'axios';

export default class Searchlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            url: props.url,
            Qnty: 0,
            toggle: true
        }
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
    }



    componentDidMount() {
        if (this.props.url == "") {
            axios.get('http://localhost:4000/search/61')
                .then(response => {
                    this.setState({ users: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                })

        }
        else {
            axios.get('http://localhost:4000/search/' + this.props.url)
                .then(response => {
                    this.setState({ users: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    onChangeQuantity(e) {
        this.setState({ Qnty: e.target.value });
        console.log(this.state.Qnty)
    }

    onBuy(productid, curravail) {
        axios.post('http://localhost:4000/products/update', {
            id: productid,
            avail_amount: curravail - this.state.Qnty,
            isDispatched: "No"
        })
            .then(response => {
                window.location.reload(true);
                console.log(response);
                // this.setState({ Products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.post('http://localhost:4000/userproducts/add', {
            productid: productid,
            buy_amount: this.state.Qnty,
            userid: localStorage.getItem('userId')
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

    sortvalues(products) {
        var sortable = [];
        for (var product in products) {
            sortable.push(products[product]);
        }

        if (this.props.sort == "Name") {
            return (sortable.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));
        }
        if (this.props.sort == "Cost low to high") {
            return (sortable.sort((a, b) => a.cost - b.cost));
        }
        if (this.props.sort == "Cost high to low") {
            return (sortable.sort((a, b) => b.cost - a.cost));
        }
        if (this.props.sort == "Available amount") {
            return (sortable.sort((a, b) => b.avail_amount - a.avail_amount));
        }
        if (this.props.sort == "Date") {
            return (sortable.sort((a, b) => new Date(b.time) - new Date(a.time)));
        }
        return products;
    }

    render() {
        return (
            <div>
                <table className="table table-responsive text-center table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th className="fit">Product name</th>
                            <th className="fit">Product id</th>
                            <th className="fit">Available</th>
                            <th className="fit">Cost</th>
                            <th className="fit">Quantity</th>
                            <th className="fit">Buy Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.sortvalues(this.state.users).map((product, i) => {
                                if (product.avail_amount)
                                    return (
                                        <tr key={i}>
                                            <td className="fit">{product.name}</td>
                                            <td className="fit">{product._id}</td>
                                            <td className="fit">{product.avail_amount + "/" + product.total_amount}</td>
                                            <td className="fit">{product.cost}</td>
                                            {/* <td className="fit">{product.time}</td> */}
                                            <td className="fit">
                                                <input type="Number" required className="input form-control form-control-sm m-0" placeholder="Quantity"
                                                    onChange={this.onChangeQuantity} />
                                            </td>
                                            <td className="fit">
                                                <button className="btn btn-sm btn-dark" onClick={e => this.onBuy(product._id, product.avail_amount)}>Buy Now</button>
                                            </td>
                                        </tr>
                                    )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
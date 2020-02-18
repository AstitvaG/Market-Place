import React, { Component } from 'react';
import axios from 'axios';

export default class Searchlist extends Component {

    constructor(props) {
        console.log("Rec: " + props.url)
        super(props);
        this.state = {
            users: [],
            url: props.url,
            Qnty: 0
        }
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/search/' + this.state.url)
            .then(response => {
                this.setState({ users: response.data, url: this.state.url });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeQuantity(e) {
        this.setState({ Qnty: e.target.value });
        console.log(this.state.Qnty)
    }

    onBuy(productid,curravail) {
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
            })
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
                            this.state.users.map((product, i) => {
                                if (product.avail_amount)
                                    return (
                                        <tr key={i}>
                                            <td className="fit">{product.name}</td>
                                            <td className="fit">{product._id}</td>
                                            <td className="fit">{product.avail_amount + "/" + product.total_amount}</td>
                                            <td className="fit">{product.cost}</td>
                                            <td className="fit">
                                                <input type="Number" required className="input form-control form-control-sm m-0" placeholder="Quantity"
                                                    onChange={this.onChangeQuantity} />
                                            </td>
                                            <td className="fit">
                                                <button className="btn btn-sm btn-dark" onClick={e => this.onBuy(product._id,product.avail_amount)}>Buy Now</button>
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
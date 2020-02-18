import React, { Component } from 'react';
import axios from 'axios';

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
            .then(response => {
                this.setState({ users: response.data });
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
                            <th className="fit">Username</th>
                            <th className="fit">Type</th>
                            <th className="fit">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td className="fit">{currentUser.username}</td>
                                        <td className="fit">{currentUser.type}</td>
                                        <td className="fit">{currentUser.email}</td>
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
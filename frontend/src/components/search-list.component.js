import React, {Component} from 'react';
import axios from 'axios';

export default class Searchlist extends Component {
    
    constructor(props) {
        console.log("Rec: "+props.url)
        super(props);
        this.state = {users: [],url: props.url}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/search/'+this.state.url)
             .then(response => {
                 this.setState({users: response.data,url: this.state.url});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <table className="table table-responsive text-center table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th className="table fit">Username</th>
                            <th className="table fit">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td className="table fit">{currentUser.username}</td>
                                    <td className="table fit">{currentUser.email}</td>
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
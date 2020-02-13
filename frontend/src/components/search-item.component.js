import React, {Component} from 'react';
import axios from 'axios';

export default class Searchitem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            searchval: ''
        }

        this.onChangeSearchval = this.onChangeSearchval.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeSearchval(event) {
        this.setState({ searchval: event.target.value });
    }


    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.searchval
        }

        axios.post('http://localhost:4000/add', newUser)
             .then(res => console.log(res.data));

        this.setState({
            searchval: '',
        });
    }

    render() {
        return (
            <div class="row justify-content-center  align-center">
                <div class="form-group align-center ">
                <br/>
                <br/>
                <form class="form-inline my-2 my-lg-0 align-center" onSubmit={this.onSubmit}>
                    <input  class="form-control mr-sm-2"
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                            value={this.state.searchval}
                            onChange={this.onChangeSearchval}
                            />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                </div>
            </div>
        )
    }
}
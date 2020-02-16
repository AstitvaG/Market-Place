import React, {Component} from 'react';
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
        this.temp=this.state.searchval
        this.toggle_temp = !this.state.toggle
        this.setState({
            showReasult: true,
            // searchval: '',
            toggle: this.toggle_temp
        });
        // document.getElementById("results").innerHTML = ""
    }

    getComponent(){
        if (this.state.showReasult && !this.state.toggle) {  // show the modal if state showModal is true
            console.log("Got:" + this.temp)
            this.state.toggle = !this.state.toggle
            return <Searchlist url={this.temp}/>;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="row justify-content-center  align-center">
                <div className="form-group align-center ">
                <br/>
                <br/>
                <form className="form-inline my-2 my-lg-0 align-center" onSubmit={this.onSubmit}>
                    <input  className="form-control mr-sm-2"
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
        )
    }
}
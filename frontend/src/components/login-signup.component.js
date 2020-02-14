import React, {Component} from 'react';
import axios from 'axios';
import './login-signup.component.css';

export default class LoginSignup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignup = this.onSignup.bind(this);

        this.onGoToLogin = this.onGoToLogin.bind(this);
        this.onGoToSignup = this.onGoToSignup.bind(this);

    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event){
        this.setState({ password: event.target.value });
    }

    onSignup(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/add', newUser)
             .then(res => console.log(res.data));

        this.setState({
            username: '',
            email: '',
            password: ''
        });
    }

    onGoToLogin(e){
        let parent = e.target.parentNode.parentNode;
        const signupBtn = document.getElementById('signup');
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if(element !== "slide-up") {
                parent.classList.add('slide-up')
            }else{
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }


    onGoToSignup(e){
        let parent = e.target.parentNode;
        const loginBtn = document.getElementById('login');
        Array.from(e.target.parentNode.classList).find((element) => {
            if(element !== "slide-up") {
                parent.classList.add('slide-up')
            }else{
                loginBtn.parentNode.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }

    render() {
        return (
            <div className="context-user">
                <div className="form-structor">
                    <div className="signup">
                        <form onSubmit={this.onSignup}>
                            <h2 className="form-title" id="signup"  onClick={this.onGoToSignup}><span>or</span>Sign up</h2>
                            <div className="form-holder">
                                <input type="text" className="input" placeholder="Name"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername} />
                                <input type="email" className="input" placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail} />
                                <input type="password" className="input" placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.onChangePassword} />
                            </div>
                            <button type="submit" className="submit-btn">Sign up</button>
                        </form>
                    </div>
                    <div className="login slide-up">
                        <div className="center">
                            <h2 className="form-title" id="login" onClick={this.onGoToLogin}><span>or</span>Log in</h2>
                            <div className="form-holder">
                                <input type="email" className="input" placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail} />
                                <input type="password" className="input" placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.onChangePassword} />
                            </div>
                            <button className="submit-btn">Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import axios from 'axios';
import './login-signup.component.css';
// import ls from 'local-storage'


export default class LoginSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            checked: false
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignup = this.onSignup.bind(this);
        this.onLogin = this.onLogin.bind(this);

        this.onGoToLogin = this.onGoToLogin.bind(this);
        this.onGoToSignup = this.onGoToSignup.bind(this);

    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeType(event) {
        this.setState({ checked: !this.state.checked });
        console.log("Value is: ", this.state.checked)
    }

    onSignup(e) {
        var out;
        if (!this.state.checked) out = "Customer";
        else out = "Vendor";
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            type: out
        }

        console.log(this.state.checked)
        axios.post('http://localhost:4000/add', newUser)
            .then(res => {
                localStorage.setItem('userId', res.data.user.id);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('type', res.data.user.type);
                window.location.reload(true)
             });

        this.setState({
            username: '',
            email: '',
            password: '',
        });
    }

    onLogin(e) {
        var loginDetails = {
            username: this.state.username,
            password: this.state.password
        }
        if (loginDetails.username && loginDetails.username) {
            axios.post('http://localhost:4000/login', loginDetails)
                .then(res => { 
                    localStorage.setItem('userId', res.data.user.id);
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('type', res.data.user.type);
                    window.location.reload(true)
                 })

            this.setState({
                username: '',
                email: '',
                password: ''
            });
        }
    }

    onGoToLogin(e) {
        let parent = e.target.parentNode.parentNode;
        const signupBtn = document.getElementById('signup');
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }


    onGoToSignup(e) {
        let parent = e.target.parentNode;
        const loginBtn = document.getElementById('login');
        Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
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
                        <h2 className="form-title" id="signup" onClick={this.onGoToSignup}><span>or</span>Sign up</h2>
                        <form onSubmit={this.onSignup}>
                            <div className="form-holder">
                                <input type="text" required className="input" placeholder="Name"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername} />
                                <input type="email" required
                                    className="input" placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail} />
                                <input type="password" required className="input" placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword} />
                                <br />
                                <div className="d-flex container-fluid">
                                    <label className="lbl">
                                        Are you a vendor?
                                    </label>
                                    <label className="switch">
                                        <input type="checkbox" onChange={this.onChangeType} defaultChecked={this.state.checked} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" onClick={this.onSignup} className="submit-btn">Sign up</button>
                        </form>
                    </div>
                    <div className="login slide-up">
                        <div className="center">
                            <h2 className="form-title" id="login" onClick={this.onGoToLogin}><span>or</span>Log in</h2>
                            <form onSubmit={this.onLogin}>
                                <div className="form-holder">
                                    <input type="text" required className="input" placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername} />
                                    <input type="password" required className="input" placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword} />
                                </div>
                                <button onClick={this.onLogin} className="submit-btn">Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
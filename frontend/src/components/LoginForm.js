import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import '../styles/Form.css';
import {emailValidation, Session} from "../utils";

class LoginForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange(key, value) {
        this.setState({ [key]: value });
    }

    login = (e) => {
        if (emailValidation(this.state.email)) {
            Session.login("1");
        } else {
            alert("Your email isn't valid");
        }
    };

    render() {
        return (
            <div className="app-form">
                <h2>Sign In</h2>
                <Row>
                    <Input
                        id="email"
                        type="email"
                        value={this.state.email}
                        placeholder="EMAIL"
                        onChange={e => this.handleChange("email", e.target.value)}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="password"
                        type="password"
                        value={this.state.password}
                        placeholder="PASSWORD"
                        onChange={e => this.handleChange("password", e.target.value)}
                        s={12}
                    />
                </Row>
                <div className="confirm-row">
                    <Link className="forgot-password-link" to="/">Forgot password?</Link>
                    <Button waves="light" id="sign-in" onClick={this.login}>
                        Sign In
                    </Button>
                </div>
            </div>
        );
    }

}

export default LoginForm;
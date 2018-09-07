import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import '../../styles/Form.css';

class LoginForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange (e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange (e) {
        this.setState({ password: e.target.value });
    }

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
                        onChange={this.handleEmailChange}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="password"
                        type="password"
                        value={this.state.password}
                        placeholder="PASSWORD"
                        onChange={this.handlePasswordChange}
                        s={12}
                    />
                </Row>
                <div class="confirm-row">
                    <Link className="forgot-password-link" to="/">Forgot password?</Link>
                    <Button  id="sign-in" waves="light" /*onClick={}*/>Sign In</Button>
                </div>
            </div>
        );
    }

}

export default LoginForm;
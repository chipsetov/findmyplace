import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize';
import { Link } from 'react-router-dom';

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
            <div className="form">
                <Row>
                    <Input
                        id="email"
                        type="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        s={12}
                    />
                    <Link className="forgot-password-link" to="/">Forgot password?</Link>
                </Row>
                <Button waves="light" /*onClick={}*/>Log In</Button>
            </div>
        );
    }

}

export default LoginForm;
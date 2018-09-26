import React, {Component} from 'react';
import {Button, Input, Row} from 'react-materialize';
import {Link, withRouter} from 'react-router-dom';
import '../styles/Form.css';
import {ACCESS_TOKEN, ROLE, USER_NAME} from '../constants';
import {login} from '../util/APIUtils';
import {Session} from "../utils";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            role: '',
            usernameOrEmail: '',
            password: ''
        }
    }

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(event) {

        event.preventDefault();
        const loginRequest = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password,
        };

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ROLE, JSON.stringify(response.roles));

                Session.login(response.accessToken);

                this.props.history.push("/map");
                window.Materialize.toast('Welcome ' + this.state.usernameOrEmail, 7000);

            }).catch(error => {
            if (error.status === 401) {
                window.Materialize.toast('Your Username or Password is incorrect. Please try again!', 3000);
            } else {
                window.Materialize.toast('Sorry! Something went wrong. Please try again!', 3000);
            }
        });

    }

    render() {
        return (
            <div className="app-form">
                <h2>Sign In</h2>
                <Row>
                    <Input
                        id="usernameOrEmail"
                        type="email"
                        className="form-input"
                        value={this.state.usernameOrEmail}
                        placeholder="EMAIL"
                        onChange={e => this.handleChange("usernameOrEmail", e.target.value)}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="password"
                        type="password"
                        className="form-input"
                        value={this.state.password}
                        placeholder="PASSWORD"
                        onChange={e => this.handleChange("password", e.target.value)}
                        s={12}
                    />
                </Row>
                <div className="confirm-row">
                    <Link className="forgot-password-link" to="/">Forgot password?</Link>
                    <Button waves="light" id="sign-in" onClick={this.handleSubmit}>
                        Sign In
                    </Button>
                </div>
            </div>
        );
    }

}

export default withRouter(LoginForm);
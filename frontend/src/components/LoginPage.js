import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from "./LoginForm";
import { Session } from "../utils";

class LoginPage extends Component {

    componentWillMount() {
        if (Session.isLoggedIn()) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <LoginForm />
        );
    }

}

export default withRouter(LoginPage);
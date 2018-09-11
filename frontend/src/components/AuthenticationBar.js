import React, { Component } from 'react';
import { Button } from 'react-materialize';
import '../styles/Menu.css';

class AuthenticationBar extends Component {

    render() {
        return (
            <div className="auth-block">
                <Button waves="light" id="auth-sign-in">
                    Sign In
                </Button>
                <Button waves="light" id="auth-sign-up">
                    Sign Up
                </Button>
            </div>
        );
    }

}

export default AuthenticationBar;
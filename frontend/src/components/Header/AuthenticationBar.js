import React, { Component } from 'react';
import Login from '../Login/Login.js';

class AuthenticationBar extends Component {

    render() {
        return (
            <div className="auth-bar">
                <Login/>
            </div>
        );
    }

}

export default AuthenticationBar;
import React, { Component } from 'react';
import { Button } from 'react-materialize';
//import { emailValidation } from '../../utils';
import '../../styles/Form.css';

class Login extends Component {

    render() {
        return (
            <Button waves="light" id="sign-up" onClick={this.login}>
                Sign In
            </Button>
        );
    }

    login = (e) => {}

}

export default Login;
import React, { Component } from 'react';
import { Button } from 'react-materialize';
import '../../styles/Form.css';

class Login extends Component {

    render() {
        return (
            <Button id="sign-up" bsSize="large" block>
                Sign In
            </Button>
        );
    }

}

export default Login;
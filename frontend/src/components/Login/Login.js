import React, { Component } from 'react';
import { Button } from 'react-materialize';

class Login extends Component {

    render() {
        return (
            <Button bsStyle="primary" bsSize="large" block>
                Sign In
            </Button>
        );
    }

}

export default Login;
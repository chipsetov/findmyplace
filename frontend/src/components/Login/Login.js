import React, { Component } from 'react';
import { Button } from 'react-materialize';

class Login extends Component {

    render() {
        return (
            <Button bsStyle="primary" bsSize="large" block>
                Log In
            </Button>
        );
    }

}

export default Login;
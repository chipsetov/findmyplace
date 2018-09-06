import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize';
import { Link } from 'react-router-dom';

class LogInForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
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
                        //onChange={}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        value={this.state.password}
                        //onChange={}
                        s={12}
                    />
                     <Link className="forgot-password-link" to="/">Forgot password?</Link>
                </Row>
                <Button waves="light" /*onClick={}*/>Sign In</Button>
            </div>
        );
    }

}

export default LogInForm;
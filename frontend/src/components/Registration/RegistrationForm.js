import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize';


class RegistrationForm extends Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    };

    render() {
        return (
            <div className="form">
                <Row>
                    <Input
                        id="first_name"
                        type="text"
                        label="First Name"
                        value={this.state.first_name}
                        //onChange={}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="last_name"
                        type="text"
                        label="Last Name"
                        value={this.state.last_name}
                        //onChange={}
                        s={12}
                    />
                </Row>
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
                </Row>
                <Row>
                    <Input
                        id="confirm_password"
                        type="password"
                        label="Confirm Password"
                        value={this.state.confirm_password}
                        //onChange={}
                        s={12}
                    />
                </Row>
                <Button waves="light">Sign Up</Button>
            </div>
        );
    }

}

export default RegistrationForm;
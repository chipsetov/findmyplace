import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize';
import '../../styles/Form.css';

class RegistrationForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    };

    render() {
        return (
            <div className="app-form">
                <h2>Sign Up</h2>
                <Row>
                    <Input
                        id="first_name"
                        type="text"
                        value={this.state.first_name}
                        placeholder="FIRST NAME"
                        //onChange={}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="last_name"
                        type="text"
                        value={this.state.last_name}
                        placeholder="LAST NAME"
                        //onChange={}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="email"
                        type="email"
                        value={this.state.email}
                        placeholder="EMAIL"
                        //onChange={}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="password"
                        type="password"
                        value={this.state.password}
                        placeholder="PASSWORD"
                        //onChange={}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="confirm_password"
                        type="password"
                        value={this.state.confirm_password}
                        placeholder="CONFIRM PASSWORD"
                        //onChange={}
                        s={12}
                    />
                </Row>
                <div class="confirm-row">
                    <Button id="sign-up" waves="light" /*onClick={}*/>Sign Up</Button>
                </div>
            </div>
        );
    }

}

export default RegistrationForm;
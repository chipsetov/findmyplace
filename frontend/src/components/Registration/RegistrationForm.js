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

    handleChange(key, value) {
        this.setState({ [key]: value });
    }

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
                        onChange={e => this.handleChange("first_name", e.target.value)}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="last_name"
                        type="text"
                        value={this.state.last_name}
                        placeholder="LAST NAME"
                        onChange={e => this.handleChange("last_name", e.target.value)}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="email"
                        type="email"
                        value={this.state.email}
                        placeholder="EMAIL"
                        onChange={e => this.handleChange("email", e.target.value)}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="password"
                        type="password"
                        value={this.state.password}
                        placeholder="PASSWORD"
                        onChange={e => this.handleChange("password", e.target.value)}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="confirm_password"
                        type="password"
                        value={this.state.confirm_password}
                        placeholder="CONFIRM PASSWORD"
                        onChange={e => this.handleChange("confirm_password", e.target.value)}
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
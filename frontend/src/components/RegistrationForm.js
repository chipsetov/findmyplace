import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize';
import '../styles/Form.css';

class RegistrationForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            user_name: '',
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
                        id="user_name"
                        type="text"
                        className="form-input"
                        value={this.state.user_name}
                        placeholder="USER NAME"
                        onChange={e => this.handleChange("user_name", e.target.value)}
                        s={12}
                    />
                </Row>
                <Row>
                    <Input
                        id="email"
                        type="email"
                        className="form-input"
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
                        className="form-input"
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
                        className="form-input"
                        value={this.state.confirm_password}
                        placeholder="CONFIRM PASSWORD"
                        onChange={e => this.handleChange("confirm_password", e.target.value)}
                        s={12}
                    />
                </Row>
                <div className="confirm-row">
                    <Button id="sign-up" waves="light" /*onClick={}*/>Sign Up</Button>
                </div>
            </div>
        );
    }

}

export default RegistrationForm;
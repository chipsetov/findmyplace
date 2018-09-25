import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';

import '../../styles/UserPage.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    }

    render() {
        return (
            <div className="container">
                <div className="profile-editor">
                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>name:</p>
                        </Col>
                        <Col s={4}>
                            <Input
                                defaultValue={this.props.userName}
                                onChange={(e) => {
                                    this.onChangeStateHandler('userName', e.target.value)
                                }}/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>email:</p>
                        </Col>
                        <Col s={4}>
                            <Input defaultValue={this.props.email}
                                   onChange={ (e) => {
                                       this.onChangeStateHandler('email', e.target.value)} }/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>password:</p>
                        </Col>
                        <Col s={4}>
                            <Input type="password"
                                   onChange={ (e) => { this.onChangeStateHandler('oldPassword', e.target.value)} }/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>new password:</p>
                        </Col>
                        <Col s={4}>
                            <Input type="password"
                                   onChange={ (e) => { this.onChangeStateHandler('newPassword', e.target.value)} }/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>confirm password:</p>
                        </Col>
                        <Col s={4}>
                            <Input type="password"
                                   onChange={ (e) => { this.onChangeStateHandler('confirmPassword', e.target.value)} }/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={2} offset="s4">
                            <Button onClick={ this.onSaveChangesHandler.bind(this) }>Save</Button>
                        </Col>
                        <Col s={2}>
                            <Button onClick={ this.onCancelChangesHandler.bind(this) }>Cancel</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    error(message) {
        window["Materialize"].toast(message, 3000);
    }

    onChangeStateHandler(key, value) {
        this.setState({[key]: value});
    }

    onSaveChangesHandler() {
        if (this.state.newPassword.length) {
            if (!this.state.oldPassword.length) {
                this.error("You have to enter your old password");
                return;
            }
            if (!this.state.confirmPassword.length) {
                this.error("You have to confirm new password!");
                return;
            }
        }
    }

    onCancelChangesHandler() {
        this.setState({
            userName: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    }
}
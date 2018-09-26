import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';

import {updateProfile} from "../../util/APIUtils";
import {USER_ID} from "../../constants";

import '../../styles/UserPage.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: props.userName,
            email: props.email,
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
        window["Materialize"].toast(message, 1500);
    }

    onChangeStateHandler(key, value) {
        this.setState({[key]: value});
    }

    onSaveChangesHandler() {
        const {
            userName,
            email,
            oldPassword,
            newPassword,
            confirmPassword } = this.state;

        if (!oldPassword.length) {
            this.error("You have to enter your password");
            return;
        }

        if (newPassword.length) {
            if (!oldPassword.length) {
                this.error("You have to enter your old password");
                return;
            }

            if (!confirmPassword.length) {
                this.error("You have to confirm new password!");
                return;
            }
        }

        const userId = localStorage.getItem(USER_ID);

        const profile = {
            userId: userId,
            nickName: userName,
            email: email,
            password: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        updateProfile(profile)
            .then(response => {
            });
    }

    onCancelChangesHandler() {
    }
}
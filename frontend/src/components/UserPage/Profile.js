import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';

import BasePage from "./BasePage";
import {updateProfile} from "../../util/APIUtils";
import {USER_ID} from "../../constants";

import '../../styles/UserPage.css';

export default class Profile extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            userName: props.userName,
            email: props.email,
            phone: props.phone,
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    }

    render() {
        return (
            <div ref="root" className="container">
                <div className="profile-editor">
                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>first name:</p>
                        </Col>
                        <Col s={4}>
                            <Input
                                defaultValue={this.props.firstName}
                                onChange={(e) => {
                                    this.onChangeStateHandler('firstName', e.target.value)
                                }}/>
                        </Col>
                    </Row>
                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>last name:</p>
                        </Col>
                        <Col s={4}>
                            <Input
                                defaultValue={this.props.lastName}
                                onChange={(e) => {
                                    this.onChangeStateHandler('lastName', e.target.value)
                                }}/>
                        </Col>
                    </Row>

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
                                   onChange={(e) => {
                                       this.onChangeStateHandler('email', e.target.value)
                                   }}/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>phone:</p>
                        </Col>
                        <Col s={4}>
                            <Input defaultValue={this.props.phone}
                                   onChange={(e) => {
                                       this.onChangeStateHandler('phone', e.target.value)
                                   }}/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>password:</p>
                        </Col>
                        <Col s={4}>
                            <Input type="password"
                                   onChange={(e) => {
                                       this.onChangeStateHandler('oldPassword', e.target.value)
                                   }}/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>new password:</p>
                        </Col>
                        <Col s={4}>
                            <Input type="password"
                                   onChange={(e) => {
                                       this.onChangeStateHandler('newPassword', e.target.value)
                                   }}/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>confirm password:</p>
                        </Col>
                        <Col s={4}>
                            <Input type="password"
                                   onChange={(e) => {
                                       this.onChangeStateHandler('confirmPassword', e.target.value)
                                   }}/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={2} offset="s5">
                            <Button onClick={this.onSaveChangesHandler.bind(this)}>Save</Button>
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
            firstName,
            lastName,
            userName,
            email,
            phone,
            oldPassword,
            newPassword,
            confirmPassword
        } = this.state;

        if (!oldPassword.length) {
            this.error("You have to enter your password");
            return;
        }

        if (!firstName.length) {
            this.error("You have to enter valid firstName");
            return;
        }

        if (!lastName.length) {
            this.error("You have to enter valid lastName");
            return;
        }

        if (!/^\d+$/.test(phone)) {
            this.error("You have to enter valid phone");
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
            firstName: firstName,
            lastName: lastName,
            userId: userId,
            nickName: userName,
            email: email,
            phone: phone,
            password: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        updateProfile(profile)
            .then(response => {
                this.error(response.message);
            });
    }
}
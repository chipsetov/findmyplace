import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';

import '../../styles/UserPage.css';
import {USER_NAME} from "../../constants";

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
        const name = localStorage.getItem(USER_NAME);
        return (
            <div className="container">
                <div className="profile-editor">
                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>name:</p>
                        </Col>
                        <Col s={4}>
                            <Input onChange={ (e) => { this.onChangeStateHandler('userName', e.target.value)} }/>
                        </Col>
                    </Row>

                    <Row className="user-page">
                        <Col s={4} offset="s2">
                            <p>email:</p>
                        </Col>
                        <Col s={4}>
                            <Input placeholder="Your email"
                                   onChange={ (e) => { this.onChangeStateHandler('email', e.target.value)} }/>
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

    onChangeStateHandler(key, value) {
        this.setState({[key]: value});

        console.clear();
        console.log(this.state);
    }

    onSaveChangesHandler() {

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
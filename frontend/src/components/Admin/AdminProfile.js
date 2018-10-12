import React, {Component} from 'react';
import {Col, Row, Input, Button} from 'react-materialize';
import {USER_ID} from "../../constants";
import {updateUserPassword, updateUserProfile} from "../../util/APIUtils";

class AdminProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            userName: props.userName,
            email: props.email,
            oldPassword: "",
            newPassword: "",
            errors: {
                emptyField: 'This field cannot be empty',
                email: 'Email is invalid'
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    message = (text) => {
        window["Materialize"].toast(text, 2000);
    };

    updateProfile() {
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const userName = this.state.userName;
        const email = this.state.email;

        const userId = localStorage.getItem(USER_ID);
        const profile = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            nickName: userName,
            email: email
        };

        updateUserProfile(profile)
            .then(response => {
                this.message(response.message);
            });
    }

    updatePassword() {
        const oldPassword = this.state.oldPassword;
        const newPassword = this.state.newPassword;

        const userId = localStorage.getItem(USER_ID);
        const password = {
            userId: userId,
            password: oldPassword,
            newPassword: newPassword
        };

        updateUserPassword(password)
            .then(response => {
                this.message(response.message);
            });
    }

    render() {
        return (
            <div className="admin-profile-wrapper">
                <div className="admin-update-profile">
                    <Row className="admin-update">
                        <img src="img/admin/update.png" alt="update"/>
                        Update Profile
                    </Row>
                    <Row className="admin-profile-field">
                        <Col s={2} className="field-name">
                            <p>First Name:</p>
                        </Col>
                        <Col s={3}>
                            <Input defaultValue={this.props.firstName}
                                   onChange={e => this.handleChange("firstName", e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="admin-profile-field">
                        <Col s={2} className="field-name">
                            <p>Last Name:</p>
                        </Col>
                        <Col s={3}>
                            <Input defaultValue={this.props.lastName}
                                   onChange={e => this.handleChange("lastName", e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="admin-profile-field">
                        <Col s={2} className="field-name">
                            <p>Username:</p>
                        </Col>
                        <Col s={3}>
                            <Input defaultValue={this.props.userName}
                                   onChange={e => this.handleChange("userName", e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="admin-profile-field">
                        <Col s={2} className="field-name">
                            <p>Email:</p>
                        </Col>
                        <Col s={3}>
                            <Input defaultValue={this.props.email}
                                   onChange={e => this.handleChange("email", e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="admin-profile-btn">
                        <Col s={3}>
                            <Button onClick={this.updateProfile}>Save</Button>
                        </Col>
                    </Row>
                </div>

                <div className="admin-update-password">
                    <Row className="admin-update">
                        <img src="img/admin/update.png" alt="update"/>
                        Update Password
                    </Row>
                    <Row className="admin-profile-field">
                        <Col s={2} className="field-name">
                            <p>Old Password:</p>
                        </Col>
                        <Col s={3}>
                            <Input type="password"
                                   onChange={e => this.handleChange("oldPassword", e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="admin-profile-field">
                        <Col s={2} className="field-name">
                            <p>New password:</p>
                        </Col>
                        <Col s={3}>
                            <Input type="password"
                                   onChange={e => this.handleChange("newPassword", e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="admin-profile-btn">
                        <Col s={3}>
                            <Button onClick={this.updatePassword}>Save</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AdminProfile;
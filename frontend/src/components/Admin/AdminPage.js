import React, {Component} from 'react';
import {Col, Row, Tab, Tabs} from "react-materialize";
import {getUserProfile} from "../../util/APIUtils";
import {USER_ID} from "../../constants";
import AdminProfile from "./Profile/AdminProfile";
import {Link, Redirect, withRouter} from "react-router-dom";
import UsersList from "./Users/UsersList";
import Places from "./Places/Places";
import './AdminPage.css';
import {Session} from "../../utils";

class AdminPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            phone: "",
            avatar: "",
            oldPassword: "",
            newPassword: "",
            adminProfileIsOpened: true,
            usersListIsOpened: false,
            placesIsOpened: false
        };

        this.hideComponents = this.hideComponents.bind(this);
        this.showProfile = this.showProfile.bind(this);
        this.showUsersList = this.showUsersList.bind(this);
        this.showPlaces = this.showPlaces.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    componentDidMount() {
        const userId = localStorage.getItem(USER_ID);

        getUserProfile(userId)
            .then((response) => {
                this.setState({
                    firstName: response['firstName'],
                    lastName: response['lastName'],
                    userName: response['nickName'],
                    email: response['email'],
                    phone: response['phone'],
                    avatar: response['avatar'],
                });
            });

    }

    hideComponents(){
        this.state.adminProfileIsOpened = false;
        this.state.usersListIsOpened = false;
        this.state.placesIsOpened = false;
    }

    showProfile() {
        this.hideComponents();
        this.state.adminProfileIsOpened = true;
    }

    showUsersList() {
        this.hideComponents();
        this.state.usersListIsOpened = true;
    }

    showPlaces() {
        this.hideComponents();
        this.state.placesIsOpened = true;
    }

    renderRedirect = () => {
        if (!Session.isAdmin()) {
            return <Redirect to='/'/>
        }
    };

    render() {
        return (
            <div className="admin-page-wrapper">
                <Row className="admin-page">
                    <Col s={2} className="admin-menu-wrapper">
                        <div className="admin-menu">
                            <Row className="admin-avatar">
                                <img src="img/admin/admin-avatar.png" alt="avatar"/>
                            </Row>
                            <Row className="admin-name">
                                {this.state.firstName} {this.state.lastName}
                            </Row>
                            <Row className="admin-menu-items">
                                <Row>
                                    <Link to="#" onClick={this.showProfile}>
                                        <img src="img/admin/user.png" alt="user"/>
                                        Profile Settings
                                    </Link>
                                </Row>
                                <Row>
                                    <Link to="#" onClick={this.showUsersList}>
                                        <img src="img/admin/users.png" alt="users"/>
                                        Users
                                    </Link>
                                </Row>
                                <Row>
                                    <Link to="#"  onClick={this.showPlaces}>
                                        <img src="img/admin/place.png" alt="place"/>
                                        Places
                                    </Link>
                                </Row>
                            </Row>
                        </div>
                    </Col>
                    <Col s={10} className="admin-view-features">
                        <Row className={!this.state.adminProfileIsOpened ? 'hidden' : 'feature-row'}>
                            <Tabs className="tab-menu">
                                <Tab className="tab-menu-item" active>
                                    <AdminProfile firstName={this.state.firstName}
                                                  lastName={this.state.lastName}
                                                  email={this.state.email}
                                                  userName={this.state.userName}
                                    />
                                </Tab>
                            </Tabs>
                        </Row>
                        <Row className={!this.state.usersListIsOpened ? 'hidden' : 'feature-row'}>
                            <UsersList/>
                        </Row>
                        <Row className={!this.state.placesIsOpened ? 'hidden' : 'feature-row'}>
                            <Places/>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default withRouter(AdminPage);
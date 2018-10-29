import React, {Component} from 'react';
import Profile from "./Profile";
import Favorite from "./Favorite";
import UserBookings from "./Booking";
import {cancelBooking, getBookings, getFavorites, getUserProfile, removeFavorite} from "../../util/APIUtils";
import {Link, withRouter} from "react-router-dom";
import {Col, Row, Tab, Tabs} from "react-materialize";

export class UserPage extends Component {
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
            bookings: [],
            favorites: [],
            // adminProfileIsOpened: false,
            // usersListIsOpened: false,
            profileIsOpened: true,
            favoriteIsOpened: true,
            approvePlacesIsOpened: false
        };
    }

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
                                {this.props.firstName} {this.props.lastName}
                            </Row>
                            <Row className="admin-menu-items">
                                <Row>
                                    <Link to="#" onClick={this.showProfile.bind(this)}>
                                        <img src="img/admin/user.png" alt="user"/>
                                        Profile
                                    </Link>
                                </Row>
                                <Row>
                                    <Link to="#" onClick={this.showBookings.bind(this)}>
                                        <img src="img/admin/users.png" alt="users"/>
                                        Bookings
                                    </Link>
                                </Row>
                                <Row>
                                    <Link to="#" onClick={this.showFavorites.bind(this)}>
                                        <img src="img/admin/users.png" alt="users"/>
                                        Favorites
                                    </Link>
                                </Row>
                            </Row>
                        </div>
                    </Col>
                    <Col s={10} className="admin-view-features">
                        <Row className={!this.state.profileIsOpened ? 'hidden' : 'feature-row'}>
                            <Tabs className="tab-menu">
                                <Tab className="tab-menu-item" active>
                                    <Profile firstName={this.state.firstName}
                                             lastName={this.state.lastName}
                                             email={this.state.email}
                                             userName={this.state.userName}
                                             handleAvatarUpdated={this.props.handleAvatarUpdated}
                                    />
                                </Tab>
                            </Tabs>
                        </Row>
                        <Row className={!this.state.bookingsIsOpened ? 'hidden' : 'feature-row'}>
                            <UserBookings
                                bookings={this.state.bookings}
                                cancelBooking={this.cancelBooking.bind(this)}
                                // approveBooking={this.approveBooking.bind(this)}
                                // rejectBooking={this.rejectBooking.bind(this)}
                            />
                        </Row>
                        <Row className={!this.state.favoriteIsOpened ? 'hidden' : 'feature-row'}>
                            <Favorite
                                favorites={this.state.favorites}
                                bookPlace={this.bookPlace.bind(this)}
                                removeFavorite={this.removeFavorite.bind(this)}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

    componentDidMount() {
        getUserProfile()
            .then((profile) => {
                const userId = this.props.userId;

                getBookings(userId)
                    .then(bookings => {
                        getFavorites().then((favorites) => {
                            console.log(favorites);

                            this.setState({
                                firstName: profile['firstName'],
                                lastName: profile['lastName'],
                                userName: profile['username'],
                                email: profile['email'],
                                phone: profile['phone'],
                                avatar: profile['avatar'],
                                bookings: bookings,
                                favorites: favorites
                            });
                        }).catch((error) => {
                            this.showError(error.message);
                        });
                    })
                    .catch(error => console.log("error", error));
            });
    }

    hideComponents() {
        this.state.profileIsOpened = false;
        this.state.bookingsIsOpened = false;
        this.state.favoriteIsOpened = false;
    }

    showProfile() {
        this.hideComponents();
        this.state.profileIsOpened = true;
    }

    showBookings() {
        this.hideComponents();
        this.state.bookingsIsOpened = true;
    }

    showFavorites() {
        this.hideComponents();
        this.state.favoriteIsOpened = true;
    }

    showError(message) {
        window["Materialize"]['toast'](message, 3000);
    }

    cancelBooking(bookingId) {
        console.log("cancel booking", bookingId);

        cancelBooking(bookingId)
            .then(response => {
                getBookings()
                    .then(bookings => {
                        this.setState({
                            bookings: bookings
                        });
                    })
                    .catch(error => this.showError(error));
            })
            .catch(error => this.showError(error));
    }

    bookPlace(placeId) {
        console.log("book place:", placeId);
    }

    removeFavorite(placeId) {
        console.log("remove favorite:", placeId);

        removeFavorite(placeId).then(() => {
            getFavorites().then((favorites) => {
                this.setState({
                    favorites: favorites
                });
            }).catch((error) => {
                this.showError(error.message);
            });
        }).catch(error => this.showError(error.message));

    }

    /*
    approveBooking(id) {
        approveBooking(id)
            .then(response => {
                const userId = this.props.userId;

                getManagerBookings(userId)
                    .then(bookings => {
                        this.setState({
                            bookings: bookings
                        });
                    })
                    .catch(error => this.showError(error.message));
            })
            .catch(error => this.showError(error.message));
    }

    rejectBooking(id) {
        rejectBooking(id)
            .then(response => {
                const userId = this.props.userId;

                getManagerBookings(userId)
                    .then(bookings => {
                        this.setState({
                            bookings: bookings
                        });
                    })
                    .catch(error => this.showError(error.message));
            })
            .catch(error => this.showError(error.message));
    }
    */
}

export default withRouter(UserPage);

/*
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-materialize';
import { withRouter } from 'react-router-dom';

import Profile from "./Profile";
import Booking from "./Booking";
import Favorite from "./Favorite";
import {Session} from "../../utils";

import {getBookings, getUserProfile, cancelBooking} from "../../util/APIUtils";
import { USER_ID } from "../../constants";

import '../../styles/UserPage.css';
import SetAvatar from "./SetAvatar";

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fistName: "",
            lastName: "",
            userName: "",
            email: "",
            phone: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            bookings: []
        }
    }

    componentWillMount() {
        if (!Session.isLoggedIn()) {
            this.props.history.push("/");
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="container-fluid">
                <Tabs className="tab-menu">
                    <Tab title="Profile" className="tab-menu-item">
                        <Profile
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            userName={this.state.userName}
                            phone={this.state.phone}
                            email={this.state.email}
                            handleAvatarUpdated={this.props.handleAvatarUpdated}
                        />
                    </Tab>
                    <Tab title="Booking" className="tab-menu-item" active>
                        <Booking
                            bookings={this.state.bookings}
                            cancelBooking={this.cancelBooking.bind(this)}
                        />
                    </Tab>
                    <Tab title="Favorite" className="tab-menu-item"><Favorite/></Tab>
                </Tabs>
            </div>
        );
    }

    cancelBooking(bookingId) {
        cancelBooking(bookingId)
            .then(response => {
                console.log(response);

                getBookings()
                    .then(bookings => {
                        this.setState({
                            bookings: bookings
                        });
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }

    updateTabStyle() {
        const ul = document.getElementsByClassName('tabs');

        if (ul) {
            const menuNodes = Array.from(ul);
            const parent = menuNodes[0].parentNode.parentNode;

            Array.from(parent.childNodes).forEach((el, i) => {
                el["className"] += i == 0 ? " user-tabs" : " user-tab-content";
            });
        }
    }

    componentDidMount() {
        this.updateTabStyle();

        getUserProfile()
            .then((user) => {
                getBookings()
                    .then(bookings => {
                        this.setState({
                            firstName: user['firstName'],
                            lastName: user['lastName'],
                            userName: user['username'],
                            email: user['email'],
                            phone: user['phone'],
                            bookings: bookings
                        });
                    })
                    .catch(error => console.log(error));
            });
    }
}

export default withRouter(UserPage);
*/
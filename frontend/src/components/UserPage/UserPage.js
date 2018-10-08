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
            .then(response => console.log(response))
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

        const userId = localStorage.getItem(USER_ID);

        getUserProfile(userId)
            .then((response) => {
                // this.setState({
                //     firstName: response['firstName'],
                //     lastName: response['lastName'],
                //     userName: response['nickName'],
                //     email: response['email'],
                //     phone: response['phone']
                // });

                getBookings(userId)
                    .then(response => {
                        // this.setState({
                        //     bookings: response
                        // })

                        this.setState({
                            firstName: response['firstName'],
                            lastName: response['lastName'],
                            userName: response['nickName'],
                            email: response['email'],
                            phone: response['phone'],
                            bookings: response
                        });
                    })
                    .catch(error => console.log(error));
            });
    }
}

export default withRouter(UserPage)
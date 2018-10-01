import React, { Component } from 'react';
import { Tabs, Tab } from 'react-materialize';
import { withRouter } from 'react-router-dom';

import Profile from "./Profile";
import Booking from "./Booking";
import Favorite from "./Favorite";
import {Session} from "../../utils";

import {getUserProfile} from "../../util/APIUtils";
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
            confirmPassword: ""
        }
    }

    componentWillMount() {
        if (!Session.isLoggedIn()) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <Tabs className="tab-menu">
                    <Tab title="Profile" className="tab-menu-item" active>
                        <Profile
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            userName={this.state.userName}
                            phone={this.state.phone}
                            email={this.state.email}
                        />
                    </Tab>
                    <Tab title="Booking" className="tab-menu-item"><Booking/></Tab>
                    <Tab title="Favorite" className="tab-menu-item"><Favorite/></Tab>
                </Tabs>
            </div>
        );
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
                this.setState({
                    firstName: response['firstName'],
                    lastName: response['lastName'],
                    userName: response['nickName'],
                    email: response['email'],
                    phone: response['phone']
                });
            });
    }
}

export default withRouter(UserPage)
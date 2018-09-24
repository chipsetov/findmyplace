import React, { Component } from 'react';
import { Tabs, Tab } from 'react-materialize';
import { withRouter } from 'react-router-dom';

import Profile from "./Profile";
import Booking from "./Booking";
import Favorite from "./Favorite";
import {Session} from "../../utils";

import {getProfile} from "../../util/APIUtils";
import {USER_NAME} from "../../constants";

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            email: "",
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
                <Tabs className="">
                    <Tab title="Profile" active>

                        <Profile
                            userName={this.state.userName}
                            email={this.state.email}
                        />

                    </Tab>
                    <Tab title="Booking"><Booking/></Tab>
                    <Tab title="Favorite"><Favorite/></Tab>
                </Tabs>
            </div>
        );
    }

    componentDidMount() {
        const nickName = localStorage.getItem(USER_NAME);

        getProfile(nickName)
            .then((response) => {
                this.setState({
                    userName: response['nickName'],
                    email: response['email']
                });
            });
    }
}

export default withRouter(UserPage)
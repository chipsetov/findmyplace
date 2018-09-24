import React, { Component } from 'react';
import { Tabs, Tab } from 'react-materialize';
import { withRouter } from 'react-router-dom';

import Profile from "./Profile";
import Booking from "./Booking";
import Favorite from "./Favorite";
import {Session} from "../../utils";

class UserPage extends Component {
    componentWillMount() {
        if (!Session.isLoggedIn()) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <Tabs className="">
                    <Tab title="Profile" active><Profile/></Tab>
                    <Tab title="Booking"><Booking/></Tab>
                    <Tab title="Favorite"><Favorite/></Tab>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(UserPage)
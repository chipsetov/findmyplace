import React, { Component } from 'react';
import {NavItem, Dropdown, Col} from 'react-materialize';
import "../styles/Logout.css";
import {Session} from "../utils";

export default class Logout extends Component {

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.viewPlaces = this.viewPlaces.bind(this);
    }

    onClickHandler() {
        this.props.logout();
    }

    viewPlaces () {
        if(Session.isOwner()) {
            const userId = Session.userId();
            return (
                <NavItem href={`#/user/${userId}/places`}>Places</NavItem>
            )
        }
    };

    render() {
        const hidden = (this.props.isLoggedIn ? "" : " hidden");

        return (
            <div id="auth-sign-out" className={hidden}>
                <NavItem href="" className="logout">
                    <Dropdown trigger={<img src="img/avatar.png" alt=""/>}>
                        <NavItem href='#/user/profile'>Profile</NavItem>
                            {this.viewPlaces()}
                        <NavItem href='#'>Booking</NavItem>
                        <NavItem href='#'>Favorite</NavItem>
                        <NavItem href='#/logout' onClick={this.onClickHandler}>
                            Sign out
                        </NavItem>
                    </Dropdown>
                </NavItem>
            </div>
        );
    }

}
import React, { Component } from 'react';
import {NavItem, Dropdown} from 'react-materialize';
import "../styles/Logout.css";
import {getAvatar} from "../util/APIUtils";

export default class Logout extends Component {

    render() {
        const hidden = (this.props.isLoggedIn ? "" : " hidden");

        return (
            <div id="auth-sign-out" className={hidden}>
                <NavItem href="" className="logout">
                    <Dropdown trigger={<img src={this.props.userAvatar} alt=""/>}>
                        <NavItem href='#/user/profile'>Profile</NavItem>
                        <NavItem href='#/user/1/places'>Places</NavItem>
                        <NavItem href='#'>Booking</NavItem>
                        <NavItem href='#'>Favorite</NavItem>
                        <NavItem href='#/logout' onClick={this.onClickHandler.bind(this)}>
                            Sign out
                        </NavItem>
                    </Dropdown>
                </NavItem>
            </div>
        );
    }

    onClickHandler() {
        this.props.logout();
    }

}
import React, { Component } from 'react';
import {NavItem, Dropdown, Button} from 'react-materialize';
import "../styles/Logout.css";

export default class Logout extends Component {

    render() {
        const hidden = (this.props.isLoggedIn ? "" : " hidden");

        return (
            <div id="auth-sign-out" className={hidden}>
                <NavItem href="" className="logout">
                    <Dropdown trigger={<img src="img/avatar.png" alt=""/>}>
                        <NavItem href='#/user'>Profile</NavItem>
                        <NavItem href='#/users/1/places'>Places</NavItem>
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
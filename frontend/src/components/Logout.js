import React, { Component } from 'react';
import { NavItem } from 'react-materialize';
import "../styles/Logout.css";

export default class Logout extends Component {

    render() {
        const className = "logout" + (this.props.isLoggedIn ? "" : " hidden");

        return (
            <NavItem href='#/logout' id="auth-sign-out" className={className} onClick={this.onClickHandler.bind(this)}>
                <img src="img/avatar.png" alt=""/>
                <span>Sign out</span>
            </NavItem>
        );
    }

    onClickHandler() {
        this.props.logout();
    }

}
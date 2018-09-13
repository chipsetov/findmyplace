import React, { Component } from 'react';
import { NavItem } from 'react-materialize';
import "../styles/Logout.css";

export default class Logout extends Component {

    render() {
        const className = "logout" + (this.props.isLoggedIn ? "" : " hidden");

        return (
            <NavItem id="auth-sign-in"
                     href='#/logout'
                     className={className}
                     onClick={this.onClickHandler.bind(this)} >

                <img src="img/avatar.png" alt=""/>
                <span>Sign out</span>
            </NavItem>
        );
    }

    onClickHandler() {
        this.props.logout();
    }

}
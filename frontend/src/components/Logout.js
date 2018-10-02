import React, { Component } from 'react';
import { NavItem } from 'react-materialize';
import "../styles/Logout.css";

export default class Logout extends Component {

    render() {
        const hidden = (this.props.isLoggedIn ? "" : " hidden");

        return (
            <div id="auth-sign-out" className={hidden}>
                <NavItem href="#/user" className="logout">
                    <img src="img/avatar.png" alt=""/>
                </NavItem>
                <NavItem href='#/logout' onClick={this.onClickHandler.bind(this)}>
                    <span>Sign out</span>
                </NavItem>
            </div>
        );
    }

    onClickHandler() {
        this.props.logout();
    }

}
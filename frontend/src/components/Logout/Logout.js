import React, { Component } from 'react';
import {NavItem} from 'react-materialize';

import "./Logout.css";

export default class Menu extends Component {
    render() {
        return (
            <NavItem id="auth-sign-in" className="logout" href='#/logout'>
                <img src="img/avatar.png" alt=""/>
                <span>Sign out</span>
            </NavItem>
        );
    }
}
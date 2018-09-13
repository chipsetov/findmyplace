import React, { Component } from 'react';
import { Navbar, NavItem, Button } from 'react-materialize';
import { withRouter } from 'react-router-dom';
import Logout from './Logout';
import '../styles/Menu.css';
import {LOGIN_CHANGED, Session} from "../utils";

class Menu extends Component {

    constructor(options) {
        super(options);

        window.addEventListener(LOGIN_CHANGED, () => {
            this.forceUpdate();

            if (Session.isLoggedIn()) {
                this.props.history.push('/');
            }
        });
    }

    render() {
        const isLoggedIn = Session.isLoggedIn();

        return (
            <div className="menu-container">
                <div className="menu-wrapper">
                    <Navbar brand="logo" className="menu" right>
                        <NavItem href='#/'>Home</NavItem>
                        <NavItem href='#/map'>Map</NavItem>
                        <NavItem href='#about'>About us</NavItem>
                        <Logout isLoggedIn={isLoggedIn} logout={this.onLogoutHandler.bind(this)}/>
                        <NavItem href='#/sign-up' id="auth-sign-up" className={isLoggedIn ? "hidden" : ""}>
                            <Button waves="light">
                                Sign Up
                            </Button>
                        </NavItem>

                        <NavItem href='#/sign-in' id="auth-sign-in" className={isLoggedIn ? "hidden" : ""}>
                            Sign In
                        </NavItem>
                    </Navbar>
                </div>
            </div>
        );
    }

    onLogoutHandler() {
        Session.logout();
    }

}

export default withRouter(Menu);
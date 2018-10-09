import React, { Component } from 'react';
import { Navbar, NavItem, Button, Icon} from 'react-materialize';
import { withRouter } from 'react-router-dom';
import Logout from './Logout';
import '../styles/Menu.css';
import "../styles/Logout.css";
import {LOGIN_CHANGED, PAGE_CHANGED, Session} from "../utils";

class Menu extends Component {

    constructor(options) {
        super(options);

        this.state = {
            style: "menu-container"
        };

        window.addEventListener(LOGIN_CHANGED, this.onLoginChangedHandler.bind(this));
        window.addEventListener(PAGE_CHANGED, this.onPageChangedHandler.bind(this));
    }

    onLogoutHandler() {
        Session.logout();
    }

    render() {
        const isLoggedIn = Session.isLoggedIn();

        return (
            <div className={this.state.style}>
                <div className="menu-wrapper">
                    <Navbar brand="logo" className="menu" right>
                        <NavItem href='#/'>Home</NavItem>
                        <NavItem href='#/map'>Map</NavItem>
                        <NavItem href='#place/1'>Place</NavItem>
                        <Logout
                            userAvatar={this.props.userAvatar}
                            isLoggedIn={isLoggedIn}
                            logout={this.onLogoutHandler.bind(this)}/>
                        <NavItem href='#/sign-up' id="auth-sign-up" className={isLoggedIn ? "hidden" : ""}>
                            <Button waves="light">
                                Sign Up
                            </Button>
                        </NavItem>

                        <NavItem href='#/sign-in' id="auth-sign-in" className={isLoggedIn ? "hidden" : ""}>
                            Sign In
                        </NavItem>
                        <NavItem href='#/map' id="search"><Icon>search</Icon></NavItem>
                    </Navbar>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener(LOGIN_CHANGED, this.onLoginChangedHandler.bind(this));
        window.removeEventListener(PAGE_CHANGED, this.onPageChangedHandler.bind(this));
    }

    onLoginChangedHandler() {
        this.forceUpdate();

        if (Session.isLoggedIn()) {
            this.props.history.push('/');
        }
    }

    onPageChangedHandler(e) {
        const detail = e.detail;
        const className = "menu-container" + (detail.show ? (" " + detail.name + "-mixin") : "");

        this.setState({
            style: className
        });
    }

}

export default withRouter(Menu);
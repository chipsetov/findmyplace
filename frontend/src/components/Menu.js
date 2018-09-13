import React, { Component } from 'react';
import { Navbar, NavItem, Button } from 'react-materialize';
import { Link } from 'react-router-dom';

import Logout from './Logout/Logout';

import '../styles/Menu.css';

class Menu extends Component {

    render() {
        const img = <img /*style={{height: "90px"}}*/ src="img/logo.png"/>;

        /*if (true) {
            return <Redirect to='/login' />
        }*/

        return (

            <div className="container-fluid">
                <Navbar brand={img}>
                        <NavItem href='#/'>Home</NavItem>
                        <NavItem href='#/login'>Login</NavItem>
                        <NavItem href='#/signin'>Sign in</NavItem>
                        <NavItem href='#/singup'>Sign up</NavItem>
                        <Logout/>
                </Navbar>
            </div>

            /*<div className="container-fluid">
                <Navbar brand={img} right>
                    <NavItem href='#/'>Home</NavItem>
                    <NavItem href='#/login'>Login</NavItem>
                    <NavItem href='#/signin'>Sign in</NavItem>
                    <NavItem href='#/singup'>Sign up</NavItem>
                    <Logout/>
                </Navbar>
            </div>*/

            /*<div className="container">
                <div className="menu-bar">
                    <div className="logo-wrapper">
                        <Link className="logo" to="/">
                            <img src="./img/logo.png" alt="Find Me Place"/>
                        </Link>
                    </div>
                    <div className="menu-wrapper">
                        <Navbar className="menu" right>
                            <NavItem href='#/login'>Home</NavItem>
                            <NavItem href='#/map'>Map</NavItem>
                            <NavItem href='#'>About us</NavItem>
                            <NavItem href='#/login' id="auth-sign-up">
                                <Button waves="light">
                                    Sign Up
                                </Button>
                            </NavItem>
                            <NavItem href='#/signin' id="auth-sign-in">Sign In</NavItem>
                        </Navbar>
                    </div>
                </div>
            </div>*/
        );
    }

    onNavItemClickHandler(event) {
    }
}

export default Menu;
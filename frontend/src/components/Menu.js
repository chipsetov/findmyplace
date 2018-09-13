import React, { Component } from 'react';
import { Navbar, NavItem, Button } from 'react-materialize';
import '../styles/Menu.css';

class Menu extends Component {

    render() {
        return (
            <div className="menu-container">
                <div className="menu-wrapper">
                    <Navbar brand="logo" className="menu" right>
                        <NavItem href='#/'>Home</NavItem>
                        <NavItem href='#/map'>Map</NavItem>
                        <NavItem href='#about'>About us</NavItem>
                        <NavItem href='#/signup' id="auth-sign-up">
                            <Button waves="light">
                                Sign Up
                            </Button>
                        </NavItem>
                        <NavItem href='#/signin' id="auth-sign-in">Sign In</NavItem>
                    </Navbar>
                </div>
            </div>
        );
    }

}

export default Menu;
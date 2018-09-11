import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { Link } from 'react-router-dom';
import AuthenticationBar from './AuthenticationBar.js';
import '../styles/Menu.css';

class Menu extends Component {

    render() {
        return (
            <div className="container">
                <div className="menu-bar">
                    <div className="logo-wrapper">
                        <Link className="logo" to="/">
                            <img src="./img/logo.png" alt="Find Me Place"/>
                        </Link>
                    </div>
                    <div className="menu-wrapper">
                        <Navbar className="menu" right>
                            <NavItem href=''>Home</NavItem>
                            <NavItem href=''>Map</NavItem>
                            <NavItem href=''>About us</NavItem>
                            <NavItem href='' className="auth-bar"><AuthenticationBar/></NavItem>
                        </Navbar>
                    </div>
                </div>
            </div>
        );
    }

}

export default Menu;
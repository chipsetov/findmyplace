import React, {Component} from 'react';
import {NavItem, Dropdown, Col} from 'react-materialize';
import "../../styles/Logout.css";
import {Session} from "../../utils";

export default class Logout extends Component {

    constructor(props) {
        super(props);

        this.viewPlaces = this.viewPlaces.bind(this);
    }


    viewPlaces() {
        if (Session.isOwner()) {
            const userId = Session.userId();
            return (
                <NavItem href={`#/user/${userId}/places`}>Places</NavItem>
            )
        }
    };

    render() {
        const hidden = (this.props.isLoggedIn ? "" : " hidden");

        return (
            <div id="auth-sign-out" className={hidden}>
                <div  className="logout">
                    <Dropdown trigger={<img src="img/avatar.png" alt=""/>}>
                        <NavItem href='#/user/profile'>Profile</NavItem>
                        {this.viewPlaces()}
                        <NavItem href='#'>Booking</NavItem>
                        <NavItem href='#'>Favorite</NavItem>
                        <NavItem href='#/logout' onClick={this.props.handleLogout}>
                            Sign out
                        </NavItem>
                    </Dropdown>
                </div>
            </div>
        );
    }

}
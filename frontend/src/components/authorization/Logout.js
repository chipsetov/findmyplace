import React, {Component} from 'react';
import {Dropdown, NavItem} from 'react-materialize';
import "../../styles/Logout.css";
import {withRouter} from "react-router-dom";

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser === null ? "" : this.props.currentUser
        }
    }


    adminDropdown() {
        return (
            <Dropdown trigger={<img src={this.props.userAvatar} alt=""/>}>
                <NavItem href='#/admin-page'>Dashboard</NavItem>
                <NavItem href='#/logout' onClick={this.props.handleLogout}>
                    Sign out
                </NavItem>
            </Dropdown>
        )
    }

    baseDropdown() {
        return (
            <Dropdown trigger={<img src={this.props.userAvatar} alt=""/>}>
                <NavItem href='#/user/profile'>Profile</NavItem>
                {this.ownerView()}
                <NavItem href='#'>Booking</NavItem>
                <NavItem href='#'>Favorite</NavItem>
                <NavItem onClick={this.props.handleLogout}>
                    Sign out
                </NavItem>
            </Dropdown>
        )
    };

    ownerView = () => {
        if (this.state.user.role === "ROLE_OWNER") {
            const userId = this.state.user.id;
            return (
                <div>
                    <NavItem href={`#/user/${userId}/places`}>Places</NavItem>
                    <NavItem href={`#/user/${userId}/managers`}>Managers</NavItem>
                </div>
            )
        }
    };

    render() {
        const hidden = (this.props.isLoggedIn ? "" : " hidden");

        return (
            <div id="auth-sign-out" className={hidden}>
                <div className="logout">
                    {this.state.user.role === "ROLE_ADMIN" ? this.adminDropdown() : this.baseDropdown()}
                </div>
            </div>
        );
    }

}
export default withRouter(Logout);
import React, { Component } from 'react';
import './Logout.css';

class Logout extends Component {
    render() {
        return (
            <div className="logout">
                <img src="./img/avatar.png" />
                <a href="#">Log out</a>
            </div>
        );
    }
}

export default Logout;
import React, {Component} from 'react';
import '../styles/BanPage.css'
import {Link} from "react-router-dom";

class BanPage extends Component {
    render() {
        return(
            <div className="ban-wrapper">
                <div className="ban-container">
                    <div className="title">
                        <h1>You are banned</h1>
                    </div>
                    <Link to="/contact-us">
                        <h2>write to administrator</h2>
                    </Link>
                </div>
            </div>
        );
    }
}

export default BanPage
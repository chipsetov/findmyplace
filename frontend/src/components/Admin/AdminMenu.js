import React, {Component} from 'react';
import {Row} from "react-materialize";
import {Link} from "react-router-dom";
import './AdminPage.css';

class AdminMenu extends Component {

    render() {
        return (
            <div className="admin-menu">
                <Row className="admin-avatar">
                    <img src="img/admin/admin-avatar.png" alt="avatar"/>
                </Row>
                <Row className="admin-name">
                    {this.props.firstName} {this.props.lastName}
                </Row>
                <Row className="admin-menu-items">
                    <Row>
                        <Link to="/">
                            <img src="img/admin/user.png" alt="user"/>
                            Profile Settings
                        </Link>
                    </Row>
                    <Row>
                        <Link to="/">
                            <img src="img/admin/dashboard.png" alt="dashboard"/>
                            Dashboard
                        </Link>
                    </Row>
                    <Row>
                        <Link to="/">
                            <img src="img/admin/place.png" alt="place"/>
                            Places
                        </Link>
                    </Row>
                    <Row>
                        <Link to="/">
                            <img src="img/admin/users.png" alt="users"/>
                            Users
                        </Link>
                    </Row>
                </Row>
            </div>
        );
    }

}

export default AdminMenu;
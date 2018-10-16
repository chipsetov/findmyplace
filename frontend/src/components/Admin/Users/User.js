import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AppModal from "../../Modal/AppModal";
import Moment from "react-moment";

class User extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const id = this.props.id;
        this.props.handleDelete(id);
    }

    render() {
        return (
            <tr>
                <td className="user">
                    <img src="img/admin/user-avatar.png" alt="user"/>
                    <Link to="/user/profile" className="user-name">
                        {this.props.fistName} {this.props.lastName}
                    </Link>
                    <span className="user-role">{this.props.role}</span>
                </td>
                <td>
                    <Moment format="DD/MM/YYYY">
                        {this.props.registrationDate}
                    </Moment>
                </td>
                <td>
                    <Moment format="DD/MM/YYYY">
                        {this.props.lastUpdateDate}
                    </Moment>
                </td>
                <td className={this.props.banStatus.value === "BAN" ? "banned-user" : ""}>
                    {this.props.banStatus.name}
                </td>
                <td className="user-email">{this.props.email}</td>
                <td className="delete-user">
                    <AppModal action={"Delete"}
                              message={"Are you sure you want to delete this user?"}
                              handleSubmit={this.handleDelete}
                    />
                </td>
            </tr>

        );
    }

}

export default User;
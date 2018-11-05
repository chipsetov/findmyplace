import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AppModal from "../../Modal/AppModal";
import Moment from "react-moment";
import {Button} from 'react-materialize';
import EmailModal from "../../Modal/EmailModal";
import {emailToUser} from "../../../util/APIUtils";
import InputModal from "../../Modal/InputModal";

class User extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.banUser = this.banUser.bind(this);
    }

    handleDelete() {
        const id = this.props.id;
        this.props.handleDelete(id);
    }

    sendEmail(subject, message) {
        const userId = this.props.id;
        const emailToUserRequest = {
            userId: userId,
            subject: subject,
            message: message,
        };

        emailToUser(emailToUserRequest)
            .then(response => {
                window.Materialize.toast("Email has been sent", 3000);
            }).catch(err => {
                console.log(err);
                window.Materialize.toast("Server error", 3000);
            })
    }

    banUser(message) {
        //TODO: Send data to server
    }

    render() {
        return (
            <tr>
                <td className="user">
                    <img src={this.props.userAvatar} alt="user"/>
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
                <td className="send-email">
                    <EmailModal action="Send email"
                                buttonStyle="black"
                                handleSubmit={this.sendEmail}/>
                </td>
                <td className="delete-user">
                    <InputModal
                        header="Write the reason of ban"
                        actionName="ban"
                        buttonClassName="orange darken-2"
                        modalTitle="Write the reason of ban"
                        handleAction={this.handleReject}/>
                </td>
                <td className="delete-user">
                    <AppModal action={"DELETE"}
                              buttonStyle="red"
                              message={"Are you sure you want to delete this user?"}
                              handleSubmit={this.handleDelete}
                    />
                </td>
            </tr>

        );
    }

}

export default User;
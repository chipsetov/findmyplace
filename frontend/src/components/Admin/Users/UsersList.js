import React, {Component} from 'react';
import {Row, Table} from 'react-materialize';
import {Redirect} from "react-router-dom";
import {deleteUser} from "../../../util/APIUtils";
import {Session} from "../../../utils";
import User from "./User";
import './UsersList.css';

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    componentDidMount() {
        fetch("/users")
            .then((response) => response.json())
            .then((result) => {
                let users = result.filter((user) => {
                    return user.id !== Session.userId();
                });

                this.setState({
                    users: users
                });
            })
    };

    handleDelete(id) {
        deleteUser(id)
            .then((data) => {
                let users = this.state.users.filter((user) => {
                    return id !== user.id;
                });

                this.setState({
                    users: users
                });

                window["Materialize"].toast("User deleted", 3000);
            }).catch((error) => {
            console.error('error', error);
        });
    };

    renderRedirect = () => {
        if (!Session.isAdmin()) {
            return <Redirect to='/'/>
        }
    };

    render() {
        return (
            <div className="users-list-wrapper">
                <Row className="title">
                    <h5>Users</h5>
                </Row>
                <Row className="users-list-table">
                    <Table>
                        <thead>
                            <tr>
                                <th data-field="user-name">Name</th>
                                <th data-field="name">Created</th>
                                <th data-field="price">Last Update</th>
                                <th data-field="price">Ban Status</th>
                                <th data-field="price">Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map((item) => (
                                        <User  id={item.id}
                                               key={item.id}
                                               fistName={item.fistName}
                                               lastName={item.lastName}
                                               role={item.role.name}
                                               registrationDate={item.registrationDate}
                                               lastUpdateDate={item.lastUpdateDate}
                                               banStatus={item.banStatus}
                                               email={item.email}
                                               handleDelete={this.handleDelete}
                                        />
                                    )
                                )
                            }
                        </tbody>
                    </Table>
                </Row>
            </div>
        );
    }

}

export default UsersList;
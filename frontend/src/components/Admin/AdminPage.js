import React, {Component} from 'react';
import {Col, Row, Tab, Tabs} from "react-materialize";
import {getUserProfile} from "../../util/APIUtils";
import {USER_ID} from "../../constants";
import AdminMenu from "./AdminMenu";
import AdminProfile from "./AdminProfile";
import {withRouter} from "react-router-dom";
import './AdminPage.css';

class AdminPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            phone: "",
            avatar: "",
            oldPassword: "",
            newPassword: "",
        }
    }

    componentDidMount() {
        const userId = localStorage.getItem(USER_ID);

        getUserProfile(userId)
            .then((response) => {
                this.setState({
                    firstName: response['firstName'],
                    lastName: response['lastName'],
                    userName: response['nickName'],
                    email: response['email'],
                    phone: response['phone'],
                    avatar: response['avatar'],
                });
            });

    }

    render() {
        return (
            <div className="admin-page-wrapper">
                <Row className="admin-page">
                    <Col s={2} className="admin-menu-wrapper">
                        <AdminMenu firstName={this.state.firstName}
                                   lastName={this.state.lastName}
                                   avatar={this.state.avatar}
                        />
                    </Col>
                    <Col s={10} className="admin-view-features">
                        <Tabs className="tab-menu">
                            <Tab className="tab-menu-item" active>
                                <AdminProfile firstName={this.state.firstName}
                                              lastName={this.state.lastName}
                                              email={this.state.email}
                                              userName={this.state.userName}
                                />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default withRouter(AdminPage);
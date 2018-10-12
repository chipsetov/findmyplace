import React, {Component} from 'react';
import {Row} from "react-materialize";
import {deleteManagers} from "../../../util/APIUtils";
import Manager from "./Manager";

class UserManagers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            managers: [],
            searchValue:''
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        fetch("/user/" + this.props.match.params.id + "/managers")
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    managers: result
                });
            })
    }

    handleDelete(id) {
        const ownerId = this.props.match.params.id;
        const managerId = id;
        deleteManagers(ownerId, managerId)
            .then((result) => {
                this.setState({
                    managers: result
                });

                window["Materialize"].toast("Managers deleted", 3000);
            }).catch((error) => {
                console.error('error', error);
            });
    }

    render() {
        const managers = this.state.managers;

        return(
                <Row className="places-container">
                    {
                        managers.map((item) => (
                                <Manager id={item.id}
                                       key={item.id}
                                       nickName={item.nickName}
                                       email={item.email}
                                       avatarUrl={item.avatarUrl}
                                       phone={item.phone}
                                       handleDelete={this.handleDelete}
                                />
                            )
                        )
                    }
                </Row>
        );
    }

}

export default UserManagers;

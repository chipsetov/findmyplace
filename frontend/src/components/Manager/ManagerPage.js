import React, { Component } from 'react';
import {getManagerBookings} from "../../util/APIUtils";

export default class ManagerPage extends Component {
    render() {
        return (
            <div>
                <h1>Manager page</h1>
            </div>
        );
    }

    componentDidMount() {
        const userId = this.props.userId;

        getManagerBookings(userId)
            .then(response => console.log("response:", response))
            .catch(error => console.log("error", error));
    }
}

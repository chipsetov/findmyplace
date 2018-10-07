import React, { Component } from 'react';
import BasePage from "./BasePage";
import {getBookings} from "../../util/APIUtils";
import {USER_ID} from "../../constants";

export default class Booking extends BasePage {
    render() {
        return (
            <div ref="root">
                <h1>Booking component</h1>
            </div>
        );
    }

    componentDidMount() {
        const userId = localStorage.getItem(USER_ID);

        getBookings(userId)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}
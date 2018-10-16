import React, { Component } from 'react';
import BookingItem from "./BookingItem";
import BasePage from "./BasePage";

export default class Booking extends BasePage {
    render() {
        return (
            <div ref="root">
                <div className="container">
                    {
                        this.props.bookings.map((item, i) => {
                            console.log(item);

                            return (
                                <BookingItem key={i} booking={item} cancelBooking={this.props.cancelBooking.bind(this)}/>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
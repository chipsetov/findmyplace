import React, { Component } from 'react';
import "../../styles/Booking.css";
import AppModal from "../Modal/AppModal";

const STATUS = [
    "sent",
    "active",
    "closed"
];

export default class BookingItem extends Component {
    render() {
        const booking = this.props.booking;

        return (
            <div className="booking-item-wrapper">
                <div className="booking-item-title-wrapper">
                    <p>{booking.placeName}</p>
                </div>

                <p>Status: {STATUS[booking.status]}</p>

                <AppModal action={"Cancel"}
                          message={"Are you sure you want to cancel this booking?"}
                          handleSubmit={this.onCancelBookingHandler.bind(this)}
                />
            </div>
        );
    }

    onCancelBookingHandler() {
        const id = this.props.booking.id;
        this.props.cancelBooking(id);
    }
}
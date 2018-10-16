import React, { Component } from 'react';
import { Col, Row} from 'react-materialize';
import "../../styles/Booking.css";
import AppModal from "../Modal/AppModal";

const STATUS = [
    "SEND",
    "APPROVED",
    "CLOSED"
];

export default class BookingItem extends Component {
    render() {
        const booking = this.props.booking;

        return (
            <div className="booking-item-wrapper">
                <Row>
                    <div className="booking-item-title-wrapper">
                        <p>{booking.placeName}</p>
                    </div>
                </Row>
                <Row>
                    <Col>
                        <img className="place-img-wrapper" src="img/place.jpg" alt=""/>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <p>Status: {STATUS[booking.status]}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <p>Booking time: {booking.bookingTime}</p>
                            </Col>
                        </Row>

                        <AppModal action={"Cancel"}
                                  buttonStyle="grey darken-4"
                                  buttonSubmitStyle="grey darken-4"
                                  message={"Are you sure you want to cancel this booking?"}
                                  handleSubmit={this.onCancelBookingHandler.bind(this)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    onCancelBookingHandler() {
        const id = this.props.booking.id;
        this.props.cancelBooking(id);
    }
}
import React, { Component } from 'react';
import {Row, Col, Button} from 'react-materialize';
import StarRatings from "react-star-ratings";
import Moment from 'react-moment';
import "../../styles/Main.css";
import './Review.css';
import {Session} from "../../utils";

class Review extends Component {

    constructor(props) {
        super(props);

        this.viewDeleteButton = this.viewDeleteButton.bind(this);
    }

    viewDeleteButton () {
        if(Session.isAdmin() || Session.isOwner()) {
            return (
                <Button className="btn-delete">Delete</Button>
            )
        }
    }

    render() {
        return(
            <Row className="review-container">
                <Col s={1}>
                    <img src={this.props.avatar}/>
                </Col>
                <Col s={11}>
                    <Row className="review-author">
                        <span>{this.props.userName}</span>
                        <StarRatings
                            rating={this.props.mark}
                            starRatedColor="#ff8d15"
                            starDimension="18px"
                            starSpacing="5px"
                        />
                    </Row>
                    <Row className="review-text">
                        <span>{this.props.comment}</span>
                    </Row>
                    <Row className="review-creation-date">
                        <Moment format="DD MMM YYYY HH:mm">
                            {this.props.creationDate}
                        </Moment>
                        {this.viewDeleteButton()}
                    </Row>
                </Col>
            </Row>
        );
    }

}

export default Review;
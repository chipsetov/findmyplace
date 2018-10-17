import React, {Component} from "react";
import {Card, CardTitle, Col, Row} from 'react-materialize';
import {Link} from "react-router-dom";
import StarRatings from 'react-star-ratings';
import AppModal from "../../Modal/AppModal";
import './Place.css';
import {Session} from "../../../utils";

class Place extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.viewModalWindow = this.viewModalWindow.bind(this);
    }

    handleDelete() {
        const id = this.props.id;
        this.props.handleDelete(id);
    }

    viewModalWindow() {
        if(Session.isAdmin() || (Session.isOwner() && Session.userId() == this.props.ownerId)) {
            return (
                <AppModal action={"Delete"}
                          message={"Are you sure you want to delete this place?"}
                          handleSubmit={this.handleDelete}
                />
            )

        }
    }

    renderForApproved() {
        if(this.props.isApprove) {
            return(
                <Row className="place-rating">
                    <StarRatings
                        rating={this.props.rating}
                        starRatedColor="#ff8d15"
                        starDimension="20px"
                        starSpacing="5px"
                    />
                </Row>
            )
        } else if(this.props.isRejected) {
            return(
                <Row>
                    <h5>Status: <span style={{color: 'red'}}>rejected</span></h5>
                </Row>
            )
        } else {
            return(
                <Row>
                    <h5>Status: <span style={{color: 'orange'}}>wait for approve</span></h5>
                </Row>
            )
        }
    }

    render() {
        return(
            <Card className='small' header={<CardTitle image='img/place.jpg'/>} >
                <Row className="place-info">
                    <Row className="place-type">
                        <span>{this.props.placeType}</span>
                    </Row>
                    {this.renderForApproved()}
                    <Row className="place-name">
                        <Link to={`/place/${this.props.id}`}>{this.props.name}</Link>
                    </Row>
                    <Row className="place-description">
                        <span>{this.props.description}</span>
                    </Row>
                </Row>

                <Row className="additional-info">
                    <Col s={6} className="free-places">
                        Free places: {this.props.countFreePlaces}
                    </Col>
                    <Col s={6} className="place-modal">
                        {this.viewModalWindow()}
                    </Col>
                </Row>
            </Card>
        );
    }

}

export default Place;

import React, {Component} from "react";
import {Card, CardTitle, Col, Row} from 'react-materialize';
import {Link} from "react-router-dom";
import StarRatings from 'react-star-ratings';
import AppModal from "../../Modal/AppModal";
import './Place.css';

class Place extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const id = this.props.id;
        this.props.handleDelete(id);
    }

    render() {
        return(
            <Card className='small' header={<CardTitle image='img/place.jpg'/>} >
                <Row className="place-info">
                    <Row className="place-type">
                        <span>{this.props.placeType}</span>
                    </Row>
                    <Row className="place-rating">
                        <StarRatings
                            rating={this.props.rating}
                            starRatedColor="#ff8d15"
                            starDimension="20px"
                            starSpacing="5px"
                        />
                    </Row>
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
                        <AppModal action={"Delete"}
                                  message={"Are you sure you want to delete this place?"}
                                  handleSubmit={this.handleDelete}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }

}

export default Place;

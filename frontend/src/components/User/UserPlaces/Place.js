import React, {Component} from "react";
import {Card, CardTitle, Row} from 'react-materialize';
import StarRatings from 'react-star-ratings';
import './Place.css';
import {Link} from "react-router-dom";

class Place extends Component {

    render() {
        return(
            <Card className='small' header={<CardTitle image='img/place.jpg'/>} >
                <Row className="place-info place-type">
                    <span>{this.props.placeType}</span>
                </Row>
                <Row className="place-info place-rating">
                    <StarRatings
                        rating={this.props.rating}
                        starRatedColor="#ff8d15"
                        starDimension="20px"
                        starSpacing="5px"
                    />
                </Row>
                <Row className="place-info place-name">
                    <Link to={`/place/${this.props.id}`}>{this.props.name}</Link>
                </Row>
                <Row className="place-info place-description">
                    <span>{this.props.description}</span>
                </Row>
                <Row className="place-info free-places">
                    <span>Free places: {this.props.countFreePlaces}</span>
                </Row>
            </Card>
        );
    }

}

export default Place;

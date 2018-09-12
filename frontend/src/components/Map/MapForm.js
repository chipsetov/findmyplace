import React, {Component} from 'react';
import {Button, Input, Row} from 'react-materialize';
//import { Link } from 'react-router-dom';
import MapLayout from './MapLayout.js';
import '../../styles/Map.css';


export default class MapForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: []
        };
    }

    componentDidMount() {
        fetch("/map")
            .then(response => response.json())
            .then(
                result => {
                    this.setState({places: result});
                    console.log("state", this.state.places)
                })
    }

    render() {
        return (
            <div className="main-map-form">
                <div className="filter-form">
                    <Row>
                        <div className="confirm-row">
                            <Input
                                id="place_name"
                                type="text"
                                placeholder="What are you looking for?"
                                onChange={e => this.handleChange("place_name", e.target.value)}
                            />
                            <Button id="search" waves="light" /*onClick={}*/>Search</Button>
                        </div>
                    </Row>
                    <Row>
                        <div className="confirm-row">
                            <select className="select-form">
                                <option disabled>Тип місця</option>
                                <option>All</option>
                                <option value="RESTAURANT">Restaurant</option>
                                <option value="PARKING">Parking</option>
                                <option value="HOTEL">Hotel</option>
                            </select>
                            <Button id="submit" waves="light" /*onClick={}*/>Submit</Button>

                        </div>
                    </Row>
                    {this.state.places.map(place => (
                        <Row key={place.name}>
                            <div className="place-row">
                                <h2>{place.name}</h2>
                                <h3>Free place: {place.countFreePlaces}</h3>
                            </div>
                        </Row>
                    ))}
                </div>
                <div className="map-form">
                    <MapLayout/>
                </div>
            </div>
        );
    }

}
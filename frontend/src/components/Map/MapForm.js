import React, {Component} from 'react';
import {Button, Col, Input, Row} from 'react-materialize';
import MapLayout from './MapLayout.js';
import SearchPlace from './SearchPlace';
import {filterPlace, searchPlace} from '../../util/APIUtils';
import '../../styles/Map.css';


class MapForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: [],
            latitude: 50.6219427,
            longitude: 26.2493254,
            zoom: 15,
            active: true,
            parking: true,
            restaurant: true,
            hotel: true,
            searchValue: ''

        };
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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


    handleChange(event) {
        const filterRequest = {
            parking: this.state.parking,
            hotel: this.state.hotel,
            restaurant: this.state.restaurant,
        };

        if (event.target.name === "parking") {
            this.setState({parking: event.target.checked});
            filterRequest.parking = event.target.checked;
        }
        if (event.target.name === "hotel") {
            this.setState({hotel: event.target.checked});
            filterRequest.hotel = event.target.checked;
        }
        if (event.target.name === "restaurant") {
            this.setState({restaurant: event.target.checked});
            filterRequest.restaurant = event.target.checked;
        }


        filterPlace(filterRequest)
            .then(result => {
                this.setState({places: result});
            })
    }

    updateData = (value) => {
        this.setState({ searchValue: value })

        const searchRequest = {
            searchValue: value,
        };

        console.log(searchRequest);

        searchPlace(searchRequest)
            .then(result => {
                this.setState({places: result});
        })
    }

    handleSearchSubmit() {
        const searchRequest = {
            searchValue: this.state.searchValue,
        };
        console.log(searchRequest);

    }

    render() {
        return (
            <div className="container-fluid">
                    <Row className="up-row">
                        <Col s={2} id="check-row-filter">
                            <Input
                                type='checkbox'
                                name="parking"
                                label='Parking'
                                checked={this.state.active}
                                onChange={this.handleChange}/>
                        </Col>
                        <Col s={2} id="check-row-filter">
                            <Input
                                type='checkbox'
                                name='hotel'
                                label='Hotel'
                                checked={this.state.active}
                                onChange={this.handleChange}/>
                        </Col>
                        <Col s={2} id="check-row-filter">
                            <Input
                                type='checkbox'
                                name='restaurant'
                                label='Restaurant'
                                checked={this.state.active}
                                onChange={this.handleChange}/>
                        </Col>

                        <Col s={3} offset="s3">
                            <SearchPlace updateData={this.updateData}/>
                        </Col>

                    </Row>
                <Row className="map-row">
                    <MapLayout items={this.state.places}
                               latitude={this.state.latitude}
                               longitude={this.state.longitude}
                               zoom={this.state.zoom}/>
                </Row>
            </div>
        );
    }

}

export default MapForm


/*
                    {this.state.places.map(place => (
                        <div class="row" key={place.name} className="place-row">
                            <a href="/#/map" onClick={() => {
                                this.setState({latitude: place.latitude, longitude: place.longitude, zoom: 18})
                            }}>{place.name}  </a>
                            <h6>Free place: {place.countFreePlaces}</h6>
                            <h6>
                                <Link to={`/place/${place.id}`}>Place page</Link>
                            </h6>
                        </div>
                    ))}
                </div>
                <div class="col s10">
                    <MapLayout items={this.state.places}
                               latitude={this.state.latitude}
                               longitude={this.state.longitude}
                               zoom={this.state.zoom}/>
                </div>
            </div>*/
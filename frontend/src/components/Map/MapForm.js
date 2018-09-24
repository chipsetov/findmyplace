import React, {Component} from 'react';
import {Icon, Row, Button, Input, Col} from 'react-materialize';
import MapLayout from './MapLayout.js';
import '../../styles/Map.css';


class MapForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: [],
            latitude: 50.6219427,
            longitude: 26.2493254,
            zoom: 15,
            selectedOption: null
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

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        console.log(`Option selected:`, selectedOption);
    }

    render() {
        const options = [
            {value: 'RESTAURANT', label: 'Restaurant'},
            {value: 'PARKING', label: 'Parking'},
            {value: 'HOTEL', label: 'Hotel'}
        ];
        const {selectedOption} = this.state;
        return (

            <div className="container-fluid">
                <div className="up-row">
                    <Row>
                    <Col s={2}>
                        <Input type="switch"/>
                    </Col>
                    <Col s={2} offset="s9">
                            <Input
                                type="text"
                                className="form-input"
                                offset="true"
                                label="Type the Place name..."
                                validate
                                onChange={e => this.handleChange("place_name", e.target.value)}
                            />
                    </Col>
                    <Col s={1} >
                        <Button waves='light'>Search<Icon right>search</Icon></Button>
                    </Col>
                    </Row>
                </div>
                    <Row>
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

/*<div class="row">
                <div class="col s2">
                    <div class="row valign-wrapper">
                        <div class="col s10">
                            <input
                                id="place_name"
                                type="text"
                                placeholder="Type the Place name..."
                                onChange={e => this.handleChange("place_name", e.target.value)}
                            />
                        </div>
                        <div class="col s2">
                            <i class="material-icons small">search</i>
                        </div>
                    </div>
                    <div class="row" >
                        <Select
                            name="basic-multi-select"
                            value={selectedOption}
                            onChange={this.handleChange}
                            isMulti={true}
                            options={options}
                        />
                    </div>
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
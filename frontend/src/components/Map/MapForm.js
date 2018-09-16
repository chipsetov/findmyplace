import React, {Component} from 'react';
import Select from 'react-select'
import {Link} from 'react-router-dom';
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
        const options = [
            {value: 'RESTAURANT', label: 'Restaurant'},
            {value: 'PARKING', label: 'Parking'},
            {value: 'HOTEL', label: 'Hotel'}
        ];
        return (
            <div class="row">
                <div class="col s2">
                    <div class="input-field inline">
                            <input
                                id="place_name"
                                type="text"
                                placeholder="Type the Place name..."
                                onChange={e => this.handleChange("place_name", e.target.value)}
                            />
                            <i class="material-icons small prefix">search</i>
                    </div>
                    <div class="row">
                        <Select placeholder="Place Filter" className="select-form" options={options}/>
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
            </div>
        );
    }

}

export default MapForm
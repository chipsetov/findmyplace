import React, {Component} from 'react';
import {Button, Input, Row} from 'react-materialize';
import Select from 'react-select'
import MapLayout from './MapLayout.js';
import '../../styles/Map.css';


export default class MapForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: [],
            latitude: 50.6219427,
            longitude: 26.2493254
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
    console.log("render");
        const options = [
            {value: 'RESTAURANT', label: 'Restaurant'},
            {value: 'PARKING', label: 'Parking'},
            {value: 'HOTEL', label: 'Hotel'}
        ];
        return (
            <div class="row">
                <div class="col s2" >
                    <Row>
                        <Input
                            id="place_name"
                            type="text"
                            placeholder="What are you looking for?"
                            onChange={e => this.handleChange("place_name", e.target.value)}
                        />
                        <Button id="search" waves="light" /*onClick={}*/>Search</Button>
                    </Row>
                    <Row>
                        <Select placeholder="Place Filter" className="select-form" options={options}/>
                    </Row>
                    {this.state.places.map(place => (
                        <Row key={place.name} className="place-row">
                            <button  onClick={() => {
                                console.log("setState");
                                this.setState({latitude : place.latitude, longitude : place.longitude})
                            }}>{place.name}  </button>

                            <p/>
                            <span>Free place: {place.countFreePlaces}</span>
                        </Row>
                    ))}
                </div>
                <div class="col s10">
                    <MapLayout items={this.state.places} latitude={this.state.latitude} longitude={this.state.longitude}/>
                </div>
            </div>
        );
    }

}
import React, { Component, createRef } from 'react';
import {Row, Input, Button} from 'react-materialize';
import PutMarker from "./PutMarker";
import {registerPlace} from '../../util/APIUtils';


class RegisterPlace extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
        this.state = {
            placeName: "",
            address: "",

            openTime: "",
            closeTime: "",
            placeType: "",
            description: "",

            latitude: 50.6219427,
            longitude: 26.2493254,

            placeTypes: []
        }
    };

    handleCoordinates(lat, lng) {
        this.setState({
            latitude: lat,
            longitude: lng
        })
    }

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(event) {

        event.preventDefault();

        const registerPlaceRequest = {
            name: this.state.placeName,
            address: this.state.address,

            open: this.state.openTime + ":00",
            close: this.state.closeTime + ":00",
            placeType: this.state.placeType,
            description: this.state.description,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        };
        console.log(JSON.stringify(registerPlaceRequest));

        registerPlace(registerPlaceRequest)
            .then(registerPlaceRequest => {

                this.props.history.push("/map");
                window.Materialize.toast("Place registered", 7000);

            }).catch(error => {
                console.log(error);
                window.Materialize.toast('Sorry! Something went wrong. Please try again!', 3000);
        });

    }

    componentDidMount() {
        fetch("/places/types")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        placeTypes: result
                    });
                }
            )
    }

    render() {

        const placeTypes = this.state.placeTypes;

        return(
            <div className="container">
                <Row>
                    <Input
                        id="placeName"
                        type="text"
                        value={this.state.placeName}
                        s={12}
                        label="Place name"
                        onChange={e => this.handleChange("placeName", e.target.value)}/>
                </Row>
                <Row>
                    <Input
                        id="address"
                        type="text"
                        value={this.state.address}
                        s={12}
                        label="Address"
                        onChange={e => this.handleChange("address", e.target.value)}/>
                    <Input
                        type="time"
                        label="Open time"
                        options = {{twelvehour: false}}
                        onChange={e => this.handleChange("openTime", e.target.value)}
                    />
                    <Input
                        type="time"
                        label="Close time"
                        options = {{twelvehour: false}}
                        onChange={e => this.handleChange("closeTime", e.target.value)}
                    />
                </Row>
                <Row>
                    <Input
                        s={12}
                        type='select'
                        label="Place type"
                        onChange={e => this.handleChange("placeType", e.target.value)}>
                            { placeTypes.map(type => (
                                <option key={type.name}
                                        value={type.value}
                                >{type.name}</option>
                            ))}
                    </Input>
                </Row>
                <Row>
                    <Input
                        id="description"
                        type="textarea"
                        value={this.state.description}
                        s={12}
                        label="Description"
                        onChange={e => this.handleChange("description", e.target.value)}/>
                </Row>
                <Row>
                    <PutMarker
                        lat={this.state.latitude}
                        lng={this.state.longitude}
                        handleCoordinates={this.handleCoordinates}
                        zoom={13}
                    />
                </Row>
                <Button className="grey darken-4" waves="light" onClick={this.handleSubmit}>
                    Register place
                </Button>
            </div>
        );
    }
}

export default RegisterPlace;
import React, { Component, createRef } from 'react';
import {Row, Input, Button} from 'react-materialize';
import PutMarker from "./PutMarker";
import {registerPlace} from '../../util/APIUtils';
import { Session } from "../../utils";
import { Redirect } from 'react-router-dom';
import "../../styles/RegisterPlace.css";


class RegisterPlace extends Component {
    constructor(props) {
        super(props);

        this.isError = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
        this.validateData = this.validateData.bind(this);
        this.state = {
            placeName: "",
            address: "",

            openTime: "00:00",
            closeTime: "00:00",
            placeType: "",
            description: "",

            latitude: 50.6219427,
            longitude: 26.2493254,

            placeTypes: [],

            error_placeName: "",
            error_address: "",
            error_openTime: "",
            error_closeTime: "",
            error_placeType: "",
            error_description: "",

            redirect: !Session.isOwner()
        }
    };



    validateData() {
        this.setState({
            error_placeName: "",
            error_address: "",
            error_placeType: "",
            error_description: "",
        });
        this.isError = false;

        if(this.state.placeName.trim().length === 0) {
            this.setState({
                error_placeName: "Place name is required field",
            });
            this.isError = true;
        }
        if(this.state.address.trim().length === 0) {
            this.setState({
                error_address: "Address is required field",
            });
            this.isError = true;
        }
        if(this.state.description.trim().length === 0) {
            this.setState({
                error_description: "Description is required field",
            });
            this.isError = true;
        }
        if(this.state.placeType.trim().length === 0) {
            this.setState({
                error_placeType: "PlaceType is required field",
            });
            this.isError = true;
        }
    }

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
        this.validateData();

        if(!this.isError) {
            const registerPlaceRequest = {
                name: this.state.placeName,
                address: this.state.address,

                open: this.state.openTime + ":00",
                close: this.state.closeTime + ":00",
                placeType: this.state.placeType,
                description: this.state.description,
                longitude: this.state.longitude,
                latitude: this.state.latitude,
            };
            console.log(JSON.stringify(registerPlaceRequest));

            registerPlace(registerPlaceRequest)
                .then(registerPlaceRequest => {

                    this.props.history.push("/map");
                    window.Materialize.toast("Place registered", 7000);

                }).catch(error => {
                console.log(error);
                if(error.status === 403)
                    window.Materialize.toast("You are not the owner", 3000);
                else window.Materialize.toast(error.message, 3000);
            });
        } else {
            window.Materialize.toast("Check the fields", 3000);
        }
    }

    componentDidMount() {
        fetch("/places/types")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        placeTypes: result
                    });
                }
            )
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/map' />
        }
    }

    render() {

        const placeTypes = this.state.placeTypes;

        return(
            <div className="container form-container">
                {this.renderRedirect()}
                <Row>
                    <h1>Register place</h1>
                </Row>
                <Row>
                    <Input
                        id="placeName"
                        type="text"
                        value={this.state.placeName}
                        error={this.state.error_placeName}
                        validate
                        required
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
                        error={this.state.error_address}
                        validate
                        required
                        label="Address"
                        onChange={e => this.handleChange("address", e.target.value)}/>
                    <Input
                        type="time"
                        validate
                        required
                        label="Open time"
                        defaultValue="00:00"
                        options = {{twelvehour: false}}
                        onChange={e => this.handleChange("openTime", e.target.value)}
                    />
                    <Input
                        type="time"
                        validate
                        required
                        label="Close time"
                        defaultValue="00:00"
                        options = {{twelvehour: false}}
                        onChange={e => this.handleChange("closeTime", e.target.value)}
                    />
                </Row>
                <Row>
                    <Input
                        s={12}
                        type='select'
                        validate
                        required
                        error={this.state.error_placeType}
                        label="Place type"
                        onChange={e => this.handleChange("placeType", e.target.value)}>
                                <option></option>
                            {
                                placeTypes.map(type => (
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
                        validate
                        required
                        error={this.state.error_description}
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
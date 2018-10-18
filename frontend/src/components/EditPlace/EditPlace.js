import React, {Component} from 'react';
import {Button, Input, Row} from 'react-materialize';
import {Session} from "../../utils";
import {Redirect} from 'react-router-dom';
import "../../styles/RegisterPlace.css";
import '../../styles/Form.css';

import EditImages from "./EditImages";


class EditPlace extends Component {
    constructor(props) {
        super(props);

        this.isError = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateData = this.validateData.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {

            placeName: "",
            openTime: "00:00",
            closeTime: "00:00",
            placeType: "",
            description: "",


            placeTypes: [],

            error_placeName: "",
            error_openTime: "",
            error_closeTime: "",
            error_placeType: "",
            error_description: "",

            redirect: !Session.isOwner(),

            pictures: []
        }
    };


    validateData() {
        this.setState({
            error_placeName: "",
            error_placeType: "",
            error_description: "",
        });
        this.isError = false;

        if (this.state.placeName.trim().length === 0) {
            this.setState({
                error_placeName: "Place name is required field",
            });
            this.isError = true;
        }
        if (this.state.description.trim().length === 0) {
            this.setState({
                error_description: "Description is required field",
            });
            this.isError = true;
        }
    }

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.validateData();

        if (!this.isError) {
            const updatePlaceRequest = {
                name: this.state.placeName,
                open: this.state.openTime + ":00",
                close: this.state.closeTime + ":00",
                placeType: this.state.placeType.value,
                description: this.state.description,
            };
            console.log(JSON.stringify(updatePlaceRequest));

            // registerPlace(registerPlaceRequest)
            //     .then(registerPlaceRequest => {
            //
            //         this.props.history.push("/map");
            //         window.Materialize.toast("Place registered", 7000);
            //
            //     }).catch(error => {
            //     console.log(error);
            //     if (error.status === 403)
            //         window.Materialize.toast("You are not the owner", 3000);
            //     else window.Materialize.toast(error.message, 3000);
            // });
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
            );

        fetch("/places/" + this.props.match.params.placeId)
            .then(res => res.json())
            .then(
                (place) => {
                    console.log(place);
                    this.setState({
                        placeName: place.name,
                        // openTime: place.open,
                        // closeTime: place.close,
                        openTime: place.open.substring(0, place.open.lastIndexOf(":00")),
                        closeTime: place.close.substring(0, place.close.lastIndexOf(":00")),
                        placeType: place.placeType,
                        description: place.description,
                    });
                }
            )
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/map'/>
        }
    };

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureFiles,
        });
    }

    renderSendButton = () => {
        if(this.state.pictures.length > 0) {
            return (
                <Button className="grey darken-4" waves='light'>SEND TO SERVER</Button>
            )
        }
    };

    render() {

        const placeTypes = this.state.placeTypes;
        console.log(this.state.pictures);
        return (
            <div className="container form-container">
                {this.renderRedirect()}
                <Row>
                    <h1>Edit Place</h1>
                </Row>
                <Row>
                    <Input
                        id="placeName"
                        type="text"
                        value={this.state.placeName}
                        label="PLACE NAME"
                        error={this.state.error_placeName}
                        placeholder=" "
                        validate
                        required
                        s={12}
                        onChange={e => this.handleChange("placeName", e.target.value)}/>
                </Row>
                <Row>
                    <Input
                        type="time"
                        validate
                        required
                        label="OPEN TIME"
                        value={this.state.openTime}
                        options={{twelvehour: false}}
                        onChange={e => this.handleChange("openTime", e.target.value)}
                    />
                    <Input
                        type="time"
                        validate
                        required
                        label="CLOSE TIME"
                        value={this.state.closeTime}
                        options={{twelvehour: false}}
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
                        label="PLACE TYPE"
                        value={this.state.placeType.value}
                        onChange={e => this.handleChange("placeType", e.target.value)}>
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
                        type="textarea"
                        validate
                        required
                        label="DESCRIPTION"
                        error={this.state.error_description}
                        value={this.state.description}
                        s={12}
                        placeholder=" "
                        onChange={e => this.handleChange("description", e.target.value)}/>
                </Row>
                <Button className="grey darken-4" waves="light" onClick={this.handleSubmit}>
                    Save changes
                </Button>
                <EditImages/>
            </div>
        );
    }
}

export default EditPlace;
import React, { Component } from 'react';
import {Row, Input, Button} from 'react-materialize';
//import SelectType from "./SelectType";


class RegisterPlace extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            placeName: "",
            address: "",

            openTime: "",
            closeTime: "",
            placeType: "",
            description: "",

            placeTypes: []
        }
    };

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(event) {

        event.preventDefault();

        const data = {
            placeName: this.state.placeName,
            address: this.state.address,

            openTime: this.state.openTime,
            closeTime: this.state.closeTime,
            placeType: this.state.placeType,
            description: this.state.description
        };

        console.log(JSON.stringify(data));
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
                <Button className="grey darken-4" waves="light" onClick={this.handleSubmit}>
                    Register place
                </Button>
            </div>
        );
    }
}

export default RegisterPlace;
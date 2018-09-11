import React, { Component } from 'react';

class PlacePage extends Component {

    constructor(props) {
        super(props);
        this.state = { place: {} } ;
    }

    componentDidMount() {
        fetch("/places/" + this.props.placeId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        place: result
                    });
                }
            )
    }

    render() {

        const place = this.state.place;

        return (
            <div>
                <h1>Name: {place.name}</h1>
                <h2>Address: {place.address}</h2>
                <h2>Description: {place.description}</h2>
                <h2>Free places: {place.countFreePlaces}</h2>
                <h2>Open time: {place.open}</h2>
                <h2>Close time: {place.close}</h2>
            </div>
        );
    }
}

export default PlacePage;
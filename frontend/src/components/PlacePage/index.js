import React, { Component } from 'react';
import { Row } from 'react-materialize';
import '../../styles/PlacePage.css';
import ButtonsBlock from './ButtonsBlock.js';
import ReviewsBlock from './ReviewsBlock.js';
import Info from './Info.js';
import Menu from "../Menu";

class PlacePage extends Component {

    constructor(props) {
        super(props);
        this.state = { place: {} } ;
    }

    componentDidMount() {
        fetch("/places/" + this.props.match.params.placeId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        place: result
                    });
                }
            )
    }

    render() {

        const place = this.state.place;

        return (
            <div className="place-page">
                <Menu/>
                <div className="content-container">
                    <Row className="place-header">
                        <h2>{place.name}</h2>
                        <h2>{place.address}</h2>
                    </Row>
                    <ButtonsBlock/>
                    <Info openTime={place.open}
                          closeTime={place.close}
                          freePlaces={place.countFreePlaces}
                          description={place.description}/>
                    <ReviewsBlock placeId={this.props.match.params.placeId}/>
                </div>
            </div>
        );
    }
}

export default PlacePage;
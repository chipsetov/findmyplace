import React, { Component } from 'react';
import { Carousel } from 'react-materialize';
import '../../styles/PlacePage.css';
import ButtonsBlock from './ButtonsBlock.js';
import ReviewsBlock from './ReviewsBlock.js';

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
            <div>
                <Carousel
                    fixedItem={
                        <div>
                            <h2 className="name">{place.name}</h2>
                            <h4>{place.address}</h4>
                        </div>
                    }
                    options={{
                        fullWidth: true,
                        indicators: true }}
                    images={[
                    '../img/background.jpg',
                    '../img/background1.jpg'
                ]} />
                <ButtonsBlock/>
                <ReviewsBlock placeId={this.props.match.params.placeId}/>

                {/*<h2>Description: {place.description}</h2>*/}
                {/*<h2>Free places: {place.countFreePlaces}</h2>*/}
                {/*<h2>Open time: {place.open}</h2>*/}
                {/*<h2>Close time: {place.close}</h2>*/}
            </div>
        );
    }
}

export default PlacePage;
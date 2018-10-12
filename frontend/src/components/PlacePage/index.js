import React, {Component} from 'react';
import {Row} from 'react-materialize';
import '../../styles/PlacePage.css';
import ButtonsBlock from './ButtonsBlock.js';
import ReviewBlock from './ReviewsBlock';
import Info from './Info.js';
import {PAGE_CHANGED} from "../../utils";
import StarRatings from "react-star-ratings";

class PlacePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {},
        };
    }

    componentWillMount() {
        window.dispatchEvent(new CustomEvent(PAGE_CHANGED, {
            detail: {
                show: true,
                name: "place-page"
            }
        }));
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
        console.log(this.state);

        const place = this.state.place;

        return (

            <div className="place-page">
                <Row className="place-header">
                    <h2>{place.name}</h2>
                    <h2>{place.address}</h2>
                </Row>
                <StarRatings
                   // rating={this.props.mark}
                    starRatedColor="#ff8d15"
                    starDimension="18px"
                    starSpacing="5px"
                />
                <div className="container content-container">
                    <ButtonsBlock/>
                    <Info openTime={place.open}
                          closeTime={place.close}
                          freePlaces={place.countFreePlaces}
                          description={place.description}/>
                    <ReviewBlock currentUser={this.props.currentUser}
                                 placeId={this.props.match.params.placeId}
                                 isAuthenticated={this.props.isAuthenticated}/>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        window.dispatchEvent(new CustomEvent(PAGE_CHANGED, {

            detail: {
                show: false,
                name: "place-page"
            }
        }));
    }
}

export default PlacePage;
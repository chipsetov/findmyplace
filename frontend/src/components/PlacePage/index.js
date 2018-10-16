import React, {Component} from 'react';
import {Row} from 'react-materialize';
import '../../styles/PlacePage.css';
import ButtonsBlock from './ButtonsBlock.js';
import ReviewBlock from './ReviewsBlock';
import Info from './Info.js';
import {PAGE_CHANGED} from "../../utils";
import StarRatings from "react-star-ratings";
import {addMark} from '../../util/APIUtils';

class PlacePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {},
            rating: 0,

        };
        this.changeRating = this.changeRating.bind(this);
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
                        place: result,
                        rating: result.rating
                    });
                }
            )
    }

    changeRating(newRating) {
        const markRequest = {
            mark: newRating,
            userId: this.props.currentUser.id,
            placeId: this.state.place.id
        };

        addMark(markRequest)
            .then(response => {
                console.log(response);
                this.setState({
                    rating: response,
                });
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout();
                window.Materialize.toast('You are not logged in!', 1000);
            } else {
                window.Materialize.toast('Sorry! Something went wrong. Please try again!', 1000);
            }
        });


    }

    render() {

        const place = this.state.place;

        return (
            <div className="place-page">
                <Row className="place-header">
                    <h2>{place.name}</h2>
                    <h2>{place.address}</h2>
                    <StarRatings
                        rating={this.state.rating}
                        starRatedColor="#ff8d15"
                        starHoverColor="yellow"
                        starDimension="40px"
                        starSpacing="10px"
                    />

                </Row>


                <div className="container content-container">
                    <ButtonsBlock rating={this.state.rating}
                                  changeRating={this.changeRating}
                                  isAuthenticated={this.props.isAuthenticated}/>
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
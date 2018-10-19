import React, {Component} from 'react';
import {Row} from 'react-materialize';
import '../../styles/PlacePage.css';
import ButtonsBlock from './ButtonsBlock.js';
import ReviewsBlock from './ReviewsBlock.js';
import ManagersBlock from './ManagersBlock.js';
import Info from './Info.js';
import {changeCountFreePlaces} from "../../util/APIUtils";
import {checkBookingTime, PAGE_CHANGED, Session} from "../../utils";
import {bookPlace} from "../../util/APIUtils";
import StarRatings from "react-star-ratings";
import {addMark} from '../../util/APIUtils';

const toast = window["Materialize"].toast;


class PlacePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {},
            rating: 0,

        };
        this.changeRating = this.changeRating.bind(this);
        this.state = {
            place: {},
            viewManager: Session.isOwner()
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

    viewManagers() {
        if (this.state.viewManager && (Session.userId() == this.state.place.ownerId)) {
            return (
                <ManagersBlock
                    placeId={this.props.match.params.placeId}
                />
            )
        }
    }

    countChange = (count) => {
        changeCountFreePlaces(this.props.match.params.placeId, count)
            .then((result) => {
                this.setState({
                    place: result
                });
            }).catch((error) => {
            console.error('error', error);
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
                    <ButtonsBlock onBookCompleteHandler={this.onBookCompleteHandler.bind(this)}
                                  placeId={place.id}
                                  rating={this.state.rating}
                                  changeRating={this.changeRating}
                                  isAuthenticated={this.props.isAuthenticated}
                    />
                    <Info openTime={place.open}
                          closeTime={place.close}
                          placeId={this.props.match.params.placeId}
                          freePlaces={place.countFreePlaces}
                          description={place.description}
                          countChange={this.countChange}/>
                    <ReviewsBlock placeId={this.props.match.params.placeId}
                                  currentUser={this.props.currentUser}
                                  isAuthenticated={this.props.isAuthenticated}
                    />
                    {this.viewManagers()}
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

    onBookCompleteHandler(time) {
        const result = checkBookingTime(time, this.state.place);

        if (result.success) {
            bookPlace({
                placeId: this.state.place.id,
                bookingTime: time
            }).then((response) => {
                console.log(response);
            });
            return;
        }

        toast(`You can book this place from ${result.open} to ${result.close}`, 3000);

    }
}

export default PlacePage;
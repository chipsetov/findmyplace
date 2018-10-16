import React, { Component } from 'react';
import { Row } from 'react-materialize';
import '../../styles/PlacePage.css';
import ButtonsBlock from './ButtonsBlock.js';
import ReviewsBlock from './ReviewsBlock.js';
import ManagersBlock from './ManagersBlock.js';
import Info from './Info.js';
import {changeCountFreePlaces} from "../../util/APIUtils";
import {checkBookingTime, PAGE_CHANGED, Session} from "../../utils";
import { bookPlace } from "../../util/APIUtils";

const toast = window["Materialize"].toast;

class PlacePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {},
            viewManager: Session.isOwner()
        } ;
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

    viewManagers() {
        if (this.state.viewManager) {
            return (
                <ManagersBlock
                    placeId={this.props.match.params.placeId}
                />
        )}
    }

    countChange = (count) => {
            console.log(this.state.place);
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
                </Row>
                <div className="container content-container">
                    <ButtonsBlock onBookCompleteHandler={ this.onBookCompleteHandler.bind(this) } placeId={place.id}/>
                    <Info openTime={place.open}
                          closeTime={place.close}
                          freePlaces={place.countFreePlaces}
                          description={place.description}
                          countChange={this.countChange}/>
                    <ReviewsBlock placeId={this.props.match.params.placeId}/>
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
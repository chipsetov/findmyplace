import React, { Component } from 'react';
import { Row } from 'react-materialize';
import '../../styles/PlacePage.css';
import ButtonsBlock from './ButtonsBlock.js';
import ReviewsBlock from './ReviewsBlock.js';
import ManagersBlock from './ManagersBlock.js';
import Info from './Info.js';
import {PAGE_CHANGED, Session} from "../../utils";

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

    render() {

        const place = this.state.place;

        return (
            <div className="place-page">
                <Row className="place-header">
                    <h2>{place.name}</h2>
                    <h2>{place.address}</h2>
                </Row>
                <div className="container content-container">
                    <ButtonsBlock/>
                    <Info openTime={place.open}
                          closeTime={place.close}
                          freePlaces={place.countFreePlaces}
                          description={place.description}/>
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
}

export default PlacePage;
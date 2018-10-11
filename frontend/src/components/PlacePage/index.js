import React, {Component} from 'react';
import {Row} from 'react-materialize';
import '../../styles/PlacePage.css';
import ButtonsBlock from './ButtonsBlock.js';
import CommentsBlock from './CommentsBlock.js';
import Info from './Info.js';
import {PAGE_CHANGED} from "../../utils";

class PlacePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {},
            userId: this.props.currentUser == null ? "" : this.props.currentUser.id
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
                <div className="container content-container">
                    <ButtonsBlock/>
                    <Info openTime={place.open}
                          closeTime={place.close}
                          freePlaces={place.countFreePlaces}
                          description={place.description}/>
                    <CommentsBlock userId={this.state.userId}
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
import React, {Component} from 'react';
import {deleteUserPlace} from "../../../util/APIUtils";
import {Row} from "react-materialize";
import Place from "../../User/UserPlaces/Place";
import PlacesFilter from "./Filter/PlacesFilter";
import './Places.css';

class Places extends Component {

    constructor(props) {
        super(props);

        this.state = {
            places: [],
            filteredPlaces: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        fetch("/map")
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    places: result,
                    filteredPlaces: result
                });
            })
    };

    handleDelete(id) {
        deleteUserPlace(id)
            .then((data) => {
                let places = this.state.places.filter((place) => {
                    return id !== place.id;
                });

                this.setState({
                    places: places,
                    filteredPlaces: places
                });

                window["Materialize"].toast("Place deleted", 3000);
            }).catch((error) => {
            console.error('error', error);
        });
    };

    handleUpdate = (places) => {
        this.setState({
            filteredPlaces: places
        });
    };

    render() {
        const places = this.state.filteredPlaces;

        return(
            <Row className="places-wrapper">
                <Row className="title">
                    <h5>Places</h5>
                </Row>
                <Row className="places-filter">
                    <PlacesFilter   places={this.state.places}
                                    filteredPlaces={this.state.filteredPlaces}
                                    handleUpdate={this.handleUpdate}
                    />
                </Row>
                <Row className="places-container">
                    {
                        places.map((item) => (
                                <Place id={item.id}
                                       key={item.id}
                                       name={item.name}
                                       placeType={item.placeType.name}
                                       description={item.description}
                                       rating={item.rating}
                                       countFreePlaces={item.countFreePlaces}
                                       isApprove={item.approved}
                                       isRejected={item.rejected}
                                       ownerId={item.ownerId}
                                       handleDelete={this.handleDelete}
                                />
                            )
                        )
                    }
                </Row>
            </Row>
        );
    }

}

export default Places;
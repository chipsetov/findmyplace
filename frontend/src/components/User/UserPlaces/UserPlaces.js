import React, {Component} from 'react';
import {Col, Row} from "react-materialize";
import {deleteUserPlace, getAllMyPlaces} from "../../../util/APIUtils";
import Place from "./Place";
import {Link} from "react-router-dom";
import SearchPlace from "../../Map/SearchPlace";

class UserPlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: [],
            searchValue:''
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        getAllMyPlaces()
            .then((response) => {
                console.log(response);
                this.setState({
                    places: response
                });
            })
    }

    handleDelete(id) {
        deleteUserPlace(id)
            .then((data) => {
                let places = this.state.places.filter((place) => {
                    return id !== place.id;
                });

                this.setState({
                    places: places
                });

                window["Materialize"].toast("Place deleted", 3000);
            }).catch((error) => {
                console.error('error', error);
            });
    }

    render() {
        const places = this.state.places;

        return(
            <Row className="user-places-wrapper">
                <Row className="places-search">
                    <Col s={3}>
                        <SearchPlace />
                    </Col>
                    <Link to={`/register-place`} id="register-place">Add place</Link>
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

export default UserPlaces;

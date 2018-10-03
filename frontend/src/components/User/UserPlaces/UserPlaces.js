import React, {Component} from 'react';
import {Row} from "react-materialize";
import {deleteUserPlace} from "../../../util/APIUtils";
import Place from "./Place";
import {Link} from "react-router-dom";
import {Session} from "../../../utils";
import {Redirect} from 'react-router-dom';

class UserPlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    componentDidMount() {
        fetch(this.props.match.path)
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    places: result
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
                    places: places
                });

                window["Materialize"].toast("Place deleted", 3000);
            }).catch((error) => {
                console.error('error', error);
            });
    };

    renderRedirect = () => {
        if (!Session.isAdmin() && !Session.isOwner()) {
            return <Redirect to='/'/>
        }
    };

    render() {
        const places = this.state.places;

        return(
            <Row className="user-places-wrapper">
                {this.renderRedirect()}
                <Row className="places-search">
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
                                       handleDelete={this.handleDelete}
                                />
                            )
                        )
                    }
                </Row>
            </Row>
        );
    };

}

export default UserPlaces;

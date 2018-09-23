import React, {Component} from 'react';
import {Row} from "react-materialize";
import Place from "./Place";

class UserPlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: []
        };
    }

    componentDidMount() {
        fetch("/users/" + this.props.match.params.userId + "/places")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        places: result
                    });
                }
            )
    }

    render() {
        const places = this.state.places;

        return(
            <Row className="places-container">
                {
                    places.map(item => (
                            <Place id={item.id}
                                   name={item.name}
                                   placeType={item.placeType.name}
                                   description={item.description}
                                   rating={item.rating}
                                   countFreePlaces={item.countFreePlaces}
                            />
                        )
                    )
                }
            </Row>
        );
    }

}

export default UserPlaces;

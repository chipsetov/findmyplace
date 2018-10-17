import React, {Component} from 'react';
import {Col, Row} from "react-materialize";
import ApprovablePlace from "./ApprovablePlace";
import {getApprovePlaces} from "../../util/APIUtils";

class ApprovablePlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: [],
        };
    }

    componentDidMount() {
        getApprovePlaces()
            .then(response => {
                this.setState({
                    places: response
                })
            })
    }

    handleUpdate = () => {
        this.componentDidMount();
    };

    render() {
        const places = this.state.places;

        return(
            <Row className="user-places-wrapper">
                <Row className="places-container">
                    {
                        places.map((item) => (
                                <ApprovablePlace placeId={item.id}
                                       key={item.id}
                                       name={item.name}
                                       placeType={item.placeType.name}
                                       description={item.description}
                                       handleUpdate={this.handleUpdate}
                                />
                            )
                        )
                    }
                </Row>
            </Row>
        );
    }

}

export default ApprovablePlaces;

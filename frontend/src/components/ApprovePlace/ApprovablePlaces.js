import React, {Component} from 'react';
import {Col, Row} from "react-materialize";
//import {deleteUserPlace} from "../../util/APIUtils";
import {Link} from "react-router-dom";
import SearchPlace from "../Map/SearchPlace";
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
        // this.setState = {
        //     places: [],
        // }
        //this.forceUpdate();
    };

    render() {
        const places = this.state.places;

        return(
            <Row className="user-places-wrapper">
                {/*<Row className="places-search">*/}
                    {/*<Col s={3}>*/}
                        {/*<SearchPlace />*/}
                    {/*</Col>*/}
                    {/*<Link to={`/register-place`} id="register-place">Add place</Link>*/}
                {/*</Row>*/}
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

import React, {Component} from 'react';
import { Input, Row, Button } from 'react-materialize';
//import { Link } from 'react-router-dom';
import MapLayout from './MapLayout.js';
import '../../styles/Map.css';



export default class MapForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            place_name: '',
        }
    };
    handleChange(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        return(
            <div className="main-map-form">
                <div className="filter-form">
                    <Row>
                        <div className="confirm-row">
                            <Input
                                id="place_name"
                                type="text"
                                value={this.state.place_name}
                                placeholder="What are you looking for?"
                                onChange={e => this.handleChange("place_name", e.target.value)}
                            />
                            <Button id="search" waves="light" /*onClick={}*/>Search</Button>
                        </div>
                    </Row>
                </div>
                <div className="map-form">
                    <MapLayout/>
                </div>
            </div>
        );
    }

}
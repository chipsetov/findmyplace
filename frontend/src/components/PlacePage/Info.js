import React, {Component} from 'react';
import {Button, Col, Icon, Row} from 'react-materialize';
import '../../styles/PlacePage.css';
import {Session} from "../../utils";

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manageFreePlaces: (Session.isManager() || Session.isOwner())
        };
    }

    viewButton() {
        return (
            <Row className="managers-container">
                <Col>
                    <Button waves='light' onClick={() => {
                        this.props.countChange(-1)
                    }}>
                        <Icon>remove</Icon>
                    </Button>
                </Col>
                <Col>
                    <p>Free places: {this.props.freePlaces}</p>
                </Col>
                <Col>
                    <Button waves='light' onClick={() => {
                        this.props.countChange(1)
                    }}>
                        <Icon>add</Icon>
                    </Button>
                </Col>
            </Row>
        )
    }


    render() {
        return (
            <div>
                <Row>
                    <h1>Information</h1>
                </Row>
                <Row>
                    <Col className="image-container" s={6}>
                        <img className="place-image" src="./img/presto-pizza.jpg"/>
                    </Col>
                    <Col s={6}>
                        <p>Open time: {this.props.openTime}</p>
                        <p>Close time: {this.props.closeTime}</p>
                        {(this.state.manageFreePlaces) ? this.viewButton() : <p>Free places: {this.props.freePlaces}</p>}
                        <p>{this.props.description}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Info;
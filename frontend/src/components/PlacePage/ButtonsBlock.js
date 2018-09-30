import React, {Component} from 'react';
import {Icon, Row, Col, CardPanel} from 'react-materialize';
import {Link} from 'react-router-dom';
import '../../styles/PlacePage.css';

class ButtonsBlock extends Component {

    render() {
        return (
            <CardPanel className="card-panel-btn blue lighten-5">
                <Row className="center">
                    <Link to="/map">
                        <Col>
                            <Icon className="black-text" large>place</Icon>
                            <p className="text">On the map</p>
                        </Col>
                    </Link>
                    <Link to="/">
                        <Col>
                            <Icon className="black-text" large>call</Icon>
                            <p className="text">Call Now</p>
                        </Col>
                    </Link>
                    <Link to="/">
                        <Col>
                            <Icon className="black-text" large>book</Icon>
                            <p className="text">Book Now</p>
                        </Col>
                    </Link>
                    <Link to="/">
                        <Col>
                            <Icon className="black-text" large>star</Icon>
                            <p className="text">Rate Us</p>
                        </Col>
                    </Link>
                </Row>
            </CardPanel>
        );
    }
}

export default ButtonsBlock;
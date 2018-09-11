import React, { Component } from 'react';
import { Icon, Row, Col } from 'react-materialize';
import '../../styles/PlacePage.css';

class ButtonsBlock extends Component {

    render() {
        return (
            <div>
                <Row className="center">
                    <Col>
                        <Icon large>call</Icon>
                        <p>Call Now</p>
                    </Col>
                    <Col>
                        <Icon large>book</Icon>
                        <p>Book Now</p>
                    </Col>
                    <Col>
                        <Icon large>star</Icon>
                        <p>Rate Us</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ButtonsBlock;
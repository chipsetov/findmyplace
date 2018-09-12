import React, { Component } from 'react';
import { Icon, Row, Col } from 'react-materialize';
import '../../styles/PlacePage.css';

class ButtonsBlock extends Component {

    render() {
        return (
            <div>
                <Row className="center">
                    <Col>
                        <a href="#">
                            <Icon large>call</Icon>
                        </a>
                        <p>Call Now</p>
                    </Col>
                    <Col>
                        <a href="#">
                            <Icon large>book</Icon>
                        </a>
                        <p>Book Now</p>
                    </Col>
                    <Col>
                        <a href="#">
                            <Icon large>star</Icon>
                        </a>
                        <p>Rate Us</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ButtonsBlock;
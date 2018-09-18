import React, {Component} from 'react';
import { Row, Col } from 'react-materialize';
import '../../styles/PlacePage.css';

class Info extends Component {

    render() {
        return(
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
                        <p>Free places: {this.props.freePlaces}</p>
                        <p>{this.props.description}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Info;
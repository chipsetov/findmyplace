import React, {Component} from 'react';
import {Icon, Row, Col, CardPanel} from 'react-materialize';
import {Link} from 'react-router-dom';
import '../../styles/PlacePage.css';
import {USER_ID} from "../../constants";
import {bookPlace} from "../../util/APIUtils";

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
                    <div onClick={this.onBookNowHandler.bind(this)}>
                        <Col>
                            <Icon className="black-text" large>book</Icon>
                            <p className="text">Book Now</p>
                        </Col>
                    </div>
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

    onBookNowHandler() {
        const placeId = this.props['placeId'];
        const userId = localStorage.getItem(USER_ID);

        bookPlace({
            userId: userId,
            placeId: placeId
        }).then((response) => {
            console.log(response);
        });
    }
}

export default ButtonsBlock;
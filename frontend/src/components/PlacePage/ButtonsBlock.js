import React, {Component} from 'react';
import {CardPanel, Col, Icon, Row} from 'react-materialize';
import {Link} from 'react-router-dom';
import '../../styles/PlacePage.css';
import BookingModal from "../UserPage/BookingModal";
import MarkModal from "../Modal/MarkModal";

class ButtonsBlock extends Component {
    constructor(props) {
        super(props);
        this.action = this.action.bind(this);

    }

    action() {
        return (
            <MarkModal rating={this.props.rating}
                       changeRating={this.props.changeRating}
                       message={"Rate this place"}
                       isAuthenticated={this.props.isAuthenticated}/>
        )
    }

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
                    <BookingModal onBookCompleteHandler={this.props.onBookCompleteHandler}/>
                    {this.action()}
                </Row>
            </CardPanel>
        );
    }
}

export default ButtonsBlock;
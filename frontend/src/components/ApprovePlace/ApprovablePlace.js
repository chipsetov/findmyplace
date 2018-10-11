import React, {Component} from "react";
import {Card, CardTitle, Col, Row, Button} from "react-materialize";
import {Link} from "react-router-dom";
import RejectModal from "./RejectModal";

class ApprovablePlace extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card className='small' header={<CardTitle image='img/place.jpg'/>} >
                <Row className="place-info">
                    <Row className="place-type">
                        <span>{this.props.placeType}</span>
                    </Row>
                    <Row className="place-name">
                        <Link to={`/place/${this.props.placeId}`}>{this.props.name}</Link>
                    </Row>
                    <Row>
                        <span>{this.props.description}</span>
                    </Row>
                </Row>

                <Row>
                    <Col s={6}>
                        <Button waves="light">Approve</Button>
                    </Col>
                    <Col s={6}>
                        <RejectModal
                            placeId={this.props.placeId}
                            header="Write the reason of reject"
                        />
                    </Col>
                </Row>
            </Card>
        );
    }

}

export default ApprovablePlace

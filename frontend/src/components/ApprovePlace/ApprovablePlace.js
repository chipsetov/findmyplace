import React, {Component} from "react";
import {Card, CardTitle, Col, Row, Button} from "react-materialize";
import {Link} from "react-router-dom";
import RejectModal from "./RejectModal";
import {approvePlace} from "../../util/APIUtils";

class ApprovablePlace extends Component {

    constructor(props) {
        super(props);
    }

    handleApprove = () => {
        approvePlace(this.props.placeId)
            .then(response => {
                if(response.success) {
                    window.Materialize.toast("Place approved", 1500);
                    this.props.handleUpdate();
                }
                else window.Materialize.toast(response.message, 1500);
            });
    };

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
                        <Button className="black" waves="light" onClick={this.handleApprove}>Approve</Button>
                    </Col>
                    <Col s={6}>
                        <RejectModal
                            handleUpdate = {this.props.handleUpdate}
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

import React, {Component} from "react";
import {Input, Col, Button, Row} from "react-materialize";
import Modal from 'react-responsive-modal';

class RejectModal extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isOpen: false,
            rejectMessage: ""
        }
    }

    handleOpen = () => {
        this.setState({isOpen: true})
    };

    handleClose = () => {
        this.setState({isOpen: false});
    };

    handleChange(key, value) {
        this.setState({
            [key]: value,
            formChanged: true
        });
    }

    handleSubmit() {
        //TODO: send reject data to server
        const data = {
            placeId: this.props.placeId,
            rejectMessage: this.state.rejectMessage,
        };
        console.log(data);
        window.Materialize.toast("Place rejected", 1500);
        this.handleClose();
    };

    render() {

        const {isOpen} = this.state;

        return(
            <div>
                <Button
                    onClick={this.handleOpen}
                    className="red darken-1"
                    waves="light">Reject</Button>
                <Modal styles={{
                    modal: {
                        width: 800,
                        }
                    }}
                    open={isOpen}
                    onClose={this.handleClose}
                    header={this.props.header}
                    showCloseIcon={false}
                    closeOnOverlayClick={false}
                >
                    <div>
                        <b>Write the reason of reject</b>
                    </div>
                    <Input
                        s={12}
                        type='textarea'
                        onChange={e => this.handleChange("rejectMessage", e.target.value)}/>
                    <Row style={{margin: 0}}>
                        <Col className="right">
                            <Button
                                waves="light"
                                onClick={this.handleClose}
                            >
                                Close
                            </Button>
                        </Col>
                        <Col className="right">
                            <Button
                                className="red darken-1"
                                waves="light"
                                onClick={this.handleSubmit}
                            >
                                Reject
                            </Button>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}

export default RejectModal
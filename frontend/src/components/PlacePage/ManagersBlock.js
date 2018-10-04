import React, {Component} from 'react';
import {Button, CardPanel, Col, Row, Icon} from 'react-materialize';
import {deletePlaceManager} from "../../util/APIUtils";

class ReviewsBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {managers: []};
    }

    componentDidMount() {
        fetch("/places/" + this.props.placeId + "/managers")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        managers: result
                    });
                }
            )
    }

    handleDelete(id) {
        deletePlaceManager(id)
            .then((result) => {
                this.setState({
                    managers: result
                });
                window["Materialize"].toast("Manager fired", 3000);
            }).catch((error) => {
            console.error('error', error);
        });
    }

    render() {

        const managers = this.state.managers;

        return (
            <Row className="managers-container">
                <h1>Managers</h1>
                <CardPanel className="card-panel-rvw blue lighten-5">
                    {managers.map(item => (
                        <Row className="center" key={item.id}>
                            <Col s={5}>
                                <p>{item.userNickName}</p>
                            </Col>
                            <Col s={5}>
                                <p>{item.userEmail}</p>
                            </Col>
                            <Col s={2}>
                                <Button waves='light' onClick={() => {
                                    this.handleDelete(item.id);
                                }}>Fire manager</Button>
                            </Col>
                        </Row>
                    ))}
                        <Row>
                            <Col s={1} offset="s11">
                                <Button title="Add new manager for this place!" waves='light' onClick={() => {
                                    this.props.updateData(this.state.value)
                                }}><Icon>person_add</Icon></Button>
                            </Col>
                        </Row>
                </CardPanel>
            </Row>
        );
    }
}

export default ReviewsBlock;
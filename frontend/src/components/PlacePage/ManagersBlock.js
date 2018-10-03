import React, {Component} from 'react';
import {Row, Col, CardPanel} from 'react-materialize';

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

    render() {

        const managers = this.state.managers;

        return (
            <Row className="reviews-container">
                <h1>Managers</h1>
                <CardPanel className="card-panel-rvw blue lighten-5">
                    {managers.map(item => (
                        <Row className="center" key={item.id}>
                            <Col s={6}>
                                <p>{item.userNickName}</p>
                            </Col>
                            <Col s={6}>
                                <p>{item.userEmail}</p>
                            </Col>
                        </Row>
                    ))}
                </CardPanel>
            </Row>
        );
    }
}

export default ReviewsBlock;
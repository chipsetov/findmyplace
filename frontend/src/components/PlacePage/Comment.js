import React, { Component } from 'react';
import {Row, Col, CardPanel} from 'react-materialize';

class Comment extends Component {

    render() {
        return(
            <CardPanel className="card-panel-rvw blue lighten-5">
                <Row className="center">
                    <Col s={1}>
                        <p>{this.props.ownerName}</p>
                        <img src={this.props.avatar}/>
                    </Col>
                    <Col s={10}>
                        <p>{this.props.comment}</p>
                    </Col>
                    <Col s={1}>
                        <h1>{this.props.id}</h1>
                    </Col>
                </Row>
            </CardPanel>
        );
    }

}

export default Comment;
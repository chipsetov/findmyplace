import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';

class Review extends Component {

    render() {
        return(
            <div>
                <Row className="center">
                    <Col>
                        <p>{this.props.ownerName}</p>
                        <img src={this.props.avatar}/>
                    </Col>
                    <Col>
                        <p>{this.props.comment}</p>
                    </Col>
                    <Col>
                        <p>{this.props.mark}</p>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Review;
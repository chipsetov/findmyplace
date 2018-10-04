import React, { Component } from 'react';
import Review from "./Review";
import { Row } from 'react-materialize';
import './Review.css';

class ReviewsBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        };
    }

    componentDidMount() {
        fetch("/places/" + this.props.placeId + "/feedbacks")
            .then((response) => response.json())
            .then((result) => {
                    this.setState({
                        reviews: result
                    });
                }
            )
    }

    render() {
        const reviews = this.state.reviews;

        return(
            <Row className="reviews-container">
                <h1>Reviews</h1>
                {
                    reviews.map(item => (
                        <Review key={item.userName}
                                userName={item.userName}
                                comment={item.comment}
                                mark={item.mark}
                                creationDate={item.creationDate}
                                avatar="./favicon.ico"
                        />
                    ))
                }
            </Row>
        );
    }
}

export default ReviewsBlock;
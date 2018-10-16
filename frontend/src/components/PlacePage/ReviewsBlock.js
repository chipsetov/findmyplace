import React, { Component } from 'react';
import Review from "./Review";
import { Row } from 'react-materialize';
import './Review.css';
import {deleteUserFeedback} from "../../util/APIUtils";

class ReviewsBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        };

        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete(id) {
        deleteUserFeedback(id)
            .then((data) => {
                let reviews = this.state.reviews.filter((review) => {
                    return id !== review.id;
                });

                this.setState({
                    reviews: reviews
                });

                window["Materialize"].toast("Feedback deleted", 3000);
            }).catch((error) => {
            console.error('error', error);
        });
    };

    render() {
        const reviews = this.state.reviews;

        return(
            <Row className="reviews-container">
                <h1>Reviews</h1>
                {
                    reviews.map(item => (
                        <Review id={item.id}
                                key={item.id}
                                userId={item.userId}
                                userName={item.userName}
                                comment={item.comment}
                                mark={item.mark}
                                creationDate={item.creationDate}
                                avatar="./favicon.ico"
                                handleDelete={this.handleDelete}
                        />
                    ))
                }
            </Row>
        );
    }
}

export default ReviewsBlock;
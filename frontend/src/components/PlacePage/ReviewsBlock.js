import React, { Component } from 'react';
import Review from "./Review";
import { Row } from 'react-materialize';

class ReviewsBlock extends Component {

    constructor(props) {
        super(props);
        this.state = { reviews: [] };
    }

    componentDidMount() {
        fetch("/places/" + this.props.placeId + "/feedbacks")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
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
                { reviews.map(item => (
                    <Review key={item.ownerNickName}
                            ownerName={item.ownerNickName}
                            avatar="./favicon.ico"
                            comment={item.comment}
                            mark={item.mark}/>
                ))}
            </Row>
        );
    }
}

export default ReviewsBlock;
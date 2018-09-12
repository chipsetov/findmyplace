import React, { Component } from 'react';
import Review from "./Review";

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
            <div>
                { reviews.map(item => (
                    <Review key={item.feedbackOwner.nickName}
                            ownerName={item.feedbackOwner.nickName}
                            avatar="./favicon.ico"
                            comment={item.comment}
                            mark={item.mark}/>
                ))}
            </div>
        );
    }
}

export default ReviewsBlock;
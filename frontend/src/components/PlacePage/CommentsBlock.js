import React, {Component} from 'react';
import Comment from "./Comment";
import {Row} from 'react-materialize';
import NewComment from "./AddNewComment";
import PrivateRoute from "../../common/PrivateRoute";


class CommentsBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: this.props.isAuthenticated,
            reviews: []
        };
        this.addNewComment = this.addNewComment.bind(this);
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

    addNewComment(reviev) {

        console.log(reviev);
        this.setState(pervState => ({
            reviews: [reviev,...pervState.reviews]}));
        // var comments = this.state.reviews;
        // var newComments = [reviev, ...comments];
        // console.log(newComments);
        //
        // this.setState({reviews: newComments});
        console.log(this.state.reviews);
    }

    render() {

        const reviews = this.state.reviews;

        return (
            <Row className="reviews-container">

                <h1>Comments:</h1>
                <div className={this.state.authenticated ? "" : "hidden"}>
                    <NewComment
                        newComment={this.addNewComment}
                        userId={this.props.userId}
                        placeId={this.props.placeId}/>
                </div>
                {reviews.map(item => (
                    <Comment key={item.ownerNickName}
                             ownerName={item.ownerNickName}
                             avatar="./favicon.ico"
                             comment={item.comment}
                             id={item.userId}/>
                ))}
            </Row>
        );
    }
}

export default CommentsBlock;
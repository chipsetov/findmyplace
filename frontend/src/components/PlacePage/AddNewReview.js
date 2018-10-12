import React, {Component} from 'react';
import {Button, Input, Row} from 'react-materialize';
import {Link} from 'react-router-dom';
import '../../styles/Form.css';
import {ACCESS_TOKEN} from '../../constants';
import {addComment} from '../../util/APIUtils';
import LoadingIndicator from "../../common/LoadingIndicator";


class NewReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            isLoading: false,
            error: ""
        };
        this.onLogin = this.props.onLogin;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(event) {

        event.preventDefault();
        if (this.state.comment.trim().length === 0) {
            this.setState({
                error: 'Your comment shouldn\'t be empty!'
            });
        }
        else {



            const commentRequest = {
                comment: this.state.comment,
                userId: this.props.userId,
                placeId: this.props.placeId,
            };

            addComment(commentRequest)
                .then(response => {
                    this.props.newComment({
                        comment: this.state.comment,
                        userId: this.props.userId,
                        placeId: this.props.placeId
                    });
                    this.setState({
                        comment: ''
                    });


                }).catch(error => {
                if (error.status === 401) {
                    window.Materialize.toast('Your Username or Password is incorrect. Please try again!', 3000);
                } else {
                    window.Materialize.toast('Sorry! Something went wrong. Please try again!', 3000);
                }
            });
        }

    }


    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <div className="form-wrapper">
                <div className="app-form">
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <Input
                                id="comment"
                                type="text"
                                value={this.state.comment}
                                placeholder="What's on your mind..."
                                onChange={e => this.handleChange("comment", e.target.value)}
                                s={12}
                            />
                            <div className="errorMsg">{this.state.error}</div>
                        </Row>

                        <div className="confirm-row">
                            <Button waves="light" id="sign-in" type="submit">Add comment</Button>

                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default NewReview;
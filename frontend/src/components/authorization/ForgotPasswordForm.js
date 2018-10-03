import React, {Component} from 'react';
import {Button, Col, Input, Row} from 'react-materialize';
import {Link, withRouter} from 'react-router-dom';
import '../../styles/Form.css';
import {ACCESS_TOKEN, ROLE, USER_ID, RESTORE_TOKEN} from '../../constants';
import {forgotPassword} from '../../util/APIUtils';


class ForgotPasswordForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: ""

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(event) {

        event.preventDefault();
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
            this.setState({
                email: "",
                error: 'Please enter valid e-mail.'
            });
        }


        else {
            const forgotRequest = {
                email: this.state.email,
            };

            forgotPassword(forgotRequest)
                .then(response => {

                    if (!response.success) {
                        window.Materialize.toast('User with such email doesn\'t exist', 3000);
                        this.setState({
                            email: "",
                        });

                    } else {
                        localStorage.setItem(RESTORE_TOKEN, response.message);
                        window.Materialize.toast('Email confirmation has been send to yor email', 3000);
                        this.setState({
                            email: "",
                        });
                        this.props.history.push("/");
                    }

                }).catch(error => {
                window.Materialize.toast('Sorry! Something went wrong. Please try again!', 3000);
            });
        }

    }


    render() {
        return (
            <div className="form-wrapper">
                <div className="app-form">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Restore your password</h2>

                        <Row>

                            <Input
                                id="usernameOrEmail"
                                value={this.state.email}
                                placeholder="EMAIL"
                                onChange={e => this.handleChange("email", e.target.value)}
                                s={12}
                            />

                        </Row>

                        <Row>
                            <div className="errorMsg">{this.state.error}</div>
                        </Row>
                        <div className="confirm-row">
                            <Button waves="light" type="submit"></Button>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(ForgotPasswordForm);
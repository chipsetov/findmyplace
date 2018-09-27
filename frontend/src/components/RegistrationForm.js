import React, {Component} from 'react';
import {Input, Button, Row} from 'react-materialize';
import {signup, checkUserAvailability} from '../util/APIUtils';
import {Link} from 'react-router-dom';
import {
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {
            username : "",
            email : "",
            password : "",
            confirm_password : "",
            },
            errors: {
            }
        };
        this.formIsValid = true;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

   async handleSubmit(event) {
        event.preventDefault();
       await this.validateForm();
        if (this.formIsValid) {
            const signupRequest = {
                nickName: this.state.fields["username"],
                email: this.state.fields["email"],
                password: this.state.fields["password"]
            };
            console.log(signupRequest);
            signup(signupRequest)
                .then(response => {
                    window.Materialize.toast("Thank you! You're successfully registered. Please Login to continue!", 5000);
                    this.props.history.push("/login");
                }).catch(error => {
                window.Materialize.toast("Ooops something wrong with our servers! Try again!", 5000);

            });

            //clear form
            let fields = {};
            fields["username"] = "";
            fields["email"] = "";
            fields["password"] = "";
            fields["confirm_password"] = "";
            this.setState({fields: fields});
        }
    }

     render() {
            return (
                <div className="form-wrapper">
                    <div className="app-form">
                        <form onSubmit={this.handleSubmit}>
                            <h2>Sign Up</h2>
                            <Row>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={this.state.fields.username}
                                    placeholder="USER NAME"
                                    onChange={this.handleChange}
                                    s={12}
                                />
                                <div className="errorMsg">{this.state.errors.username}</div>
                            </Row>
                            <Row>
                                <Input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={this.state.fields.email}
                                    onChange={this.handleChange}
                                    placeholder="EMAIL"
                                    s={12}
                                />
                                <div className="errorMsg">{this.state.errors.email}</div>
                            </Row>
                            <Row>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={this.state.fields.password}
                                    placeholder="PASSWORD"
                                    onChange={this.handleChange}
                                    s={12}
                                />
                                <div className="errorMsg">{this.state.errors.password}</div>
                            </Row>
                            <Row>
                                <Input
                                    id="confirm_password"
                                    type="password"
                                    name="confirm_password"
                                    value={this.state.fields.confirm_password}
                                    placeholder="CONFIRM PASSWORD"
                                    onChange={this.handleChange}
                                    s={12}
                                />
                                <div className="errorMsg">{this.state.errors.confirm_password}</div>
                            </Row>
                            <Row className="confirm-row">
                                <Button id="sign-up" waves="light">Sign Up</Button>
                            </Row>
                            <Row className="check-register">
                                <span>Already registered?</span>
                                <Link to="/sign-in">Login now!</Link>
                            </Row>
                        </form>
                    </div>
                </div>
            );
        }

    // Validation Function

  async validateForm() {

        let fields = this.state.fields;
        let errors = {};
        this.formIsValid = true;


        if (!fields["username"]) {
            this.formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }
        else if (fields["username"].length < USERNAME_MIN_LENGTH) {
            this.formIsValid = false;
            errors["username"] = `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`;
        } else if (fields["username"].length > USERNAME_MAX_LENGTH) {
            this.formIsValid = false;
            errors["username"] = `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`;
        }



        if (!fields["email"]) {
            this.formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }

        else if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                this.formIsValid = false;
                errors["email"] = "*Please enter valid e-mail.";
            }
        }
        else if (fields["email"].length > EMAIL_MAX_LENGTH) {
            errors["email"] = `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`;
        }


        if (!fields["password"]) {
            this.formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
        else if (fields["password"].length < PASSWORD_MIN_LENGTH) {
            this.formIsValid = false;
            errors["password"] = `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`;


        } else if (fields["password"].length > PASSWORD_MAX_LENGTH) {
            this.formIsValid = false;
            errors["password"] = `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`;
        }

        if (!fields["confirm_password"]) {
            this.formIsValid = false;
            errors["confirm_password"] = "*Please confirm your password.";
        }
        else if (fields["password"] !== fields["confirm_password"]) {
            this.formIsValid = false;
            errors["confirm_password"] = "Password doesn't match";
        }

        if (this.formIsValid) {
                await  checkUserAvailability(fields["username"],fields["email"])
                        .then(response => {
                            if (!response.isNickNameAvailable) {
                                this.formIsValid = false;
                                errors["username"] = `This username is already taken`;
                            }
                            if (!response.isEmailAvailable) {
                               this.formIsValid = false;
                               errors["email"] = "This Email is already registered";
       }

                        }).catch(error => {

                        window.Materialize.toast('Sorry! Something went wrong. Please try again!', 5000);

                    });
                }

        this.setState({
            errors: errors
        });
    }

}

export default RegistrationForm;
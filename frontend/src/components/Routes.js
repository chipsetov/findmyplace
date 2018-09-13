import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";


export  default class Routes extends Component {

    render() {
        return (
            <div>
                <Route path="/signin" component={LoginForm}/>
                <Route path="/signup" component={RegistrationForm}/>
            </div>
        );
    }

}
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginPage from "./LoginPage";
import RegistrationForm from "./RegistrationForm";


export  default class Routes extends Component {

    render() {
        return (
            <div>
                <Route path="/sign-in" component={LoginPage}/>
                <Route path="/sign-up" component={RegistrationForm}/>
            </div>
        );
    }

}
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import MapForm from "./Map/MapForm"



export  default class Routes extends Component {

    render() {
        return (
            <div>
                <Route path="/signin" component={LoginForm}/>
                <Route path="/signup" component={RegistrationForm}/>
                <Route path="/map" component={MapForm}/>
            </div>
        );
    }

}
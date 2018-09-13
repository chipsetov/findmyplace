import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LoginForm from "../LoginForm";

export default class Routes extends Component {
    render() {
        return (
            <Route path="/login" component={LoginForm}/>
            /*<React.Fragment>
            </React.Fragment>*/
        );
    }
}
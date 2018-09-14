import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginPage from "./LoginPage";
import RegistrationForm from "./RegistrationForm";
import MapForm from "./Map/MapForm"


import '../styles/Menu.css'
import PlacePage from "./PlacePage/index.js";


export  default class Routes extends Component {

    render() {
        return (
            <div className='router'>
                <Route path="/sign-in" component={LoginPage}/>
                <Route path="/sign-up" component={RegistrationForm}/>
                 <Route path="/map" component={MapForm}/>
                 <Route path="/place/:placeId" component={PlacePage}/>
            </div>
        );
    }

}
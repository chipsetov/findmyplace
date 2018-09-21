import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from "./Home/Home.js";
import PlacePage from "./PlacePage/index.js";
import RegistrationForm from "./RegistrationForm";
import LoginPage from "./LoginPage";
import MapForm from "./Map/MapForm";
import AppInfo from "./Home/AppInfo";

export default class Routes extends Component {

    render() {
        return (
            <div className='router'>
                <Route path="//" component={Home}/>
                <Route path="/app-info" component={AppInfo}/>
                <Route path="/sign-in" component={LoginPage}/>
                <Route path="/sign-up" component={RegistrationForm}/>
                <Route path="/map" component={MapForm}/>
                <Route path="/place/:placeId" component={PlacePage}/>
            </div>
        );
    }

}
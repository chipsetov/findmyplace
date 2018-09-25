import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from "./Home/Home.js";
import PlacePage from "./PlacePage/index.js";
import RegistrationForm from "./RegistrationForm";
import LoginPage from "./LoginPage";
import MapForm from "./Map/MapForm";
import UserPage from "./UserPage/UserPage";
import AppInfo from "./Home/AppInfo";
import UserPlaces from "./User/Place/UserPlaces";

export default class Routes extends Component {

    render() {
        const style = {
            minHeight: this.props.minHeight
        };

        return (
            <div id="router" style={style} /*className='router'*/>
                <Route path="//" component={Home}/>
                <Route path="/app-info" component={AppInfo}/>
                <Route path="/sign-in" component={LoginPage}/>
                <Route path="/sign-up" component={RegistrationForm}/>
                <Route path="/map" component={MapForm}/>
                <Route path="/place/:placeId" component={PlacePage}/>
                <Route path="/user" component={UserPage}/>
                <Route path="/users/:userId/places" component={UserPlaces}/>
            </div>
        );
    }

}
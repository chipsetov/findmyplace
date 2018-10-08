import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./Home/Home.js";
import PlacePage from "./PlacePage/index.js";
import RegistrationForm from "./authorization/RegistrationForm";
import LoginForm from "./authorization/LoginForm";
import ForgotPasswordForm from "./authorization/ForgotPasswordForm";
import RestorePasswordForm from "./authorization/RestorePasswordForm";
import MapForm from "./Map/MapForm";
import UserPage from "./UserPage/UserPage";
import RegisterPlace from "./RegisterPlace/RegisterPlace";
import AppInfo from "./Home/AppInfo";
import UserPlaces from "./User/UserPlaces/UserPlaces";

import NotFound from "../common/NotFound.js";

import PrivateRoute from '../common/PrivateRoute';
import LoadingIndicator from "../common/LoadingIndicator";

export default class Routes extends Component {

    render() {
        const style = {
            minHeight: this.props.minHeight
        };

        return (
            <div id="router" style={style}>
                <Switch>
                    <Route path="//" component={Home}/>
                    <Route path="/app-info" component={AppInfo}/>
                    <Route path="/sign-up" component={RegistrationForm}/>
                    <Route path="/place/:placeId" component={PlacePage}/>
                    <Route path="/user/profile" component={UserPage}/>
                    <Route path="/user/:id/places" component={UserPlaces}/>
                    <Route path="/register-place" component={RegisterPlace}/>
                    <Route path="/forgot-password" component={ForgotPasswordForm}/>
                    <Route path="/restore/:token" component={RestorePasswordForm}/>
                    <Route path="/test" component={LoadingIndicator}/>

                    <PrivateRoute authenticated={this.props.isAuthenticated} path="/map" component={MapForm}
                                  handleLogout={this.props.handleLogout}>
                    </PrivateRoute>

                    <Route path="/sign-in"
                           render={(props) => <LoginForm onLogin={this.props.handleLogin} {...props} />}></Route>

                    {/*<Route path="/users/:username"*/}
                    {/*render={(props) => <Profile isAuthenticated={this.props.isAuthenticated}*/}
                    {/*currentUser={this.props.currentUser} {...props}  />}>*/}
                    {/*</Route>*/}

                    <Route path="*" component={NotFound}/>
                </Switch>


            </div>
        );
    }

}
import React, {Component} from 'react';
import {HashRouter, Route, Switch, withRouter} from 'react-router-dom';
//import './App.css';
import Menu from './components/Menu.js';
import Footer from './components/Footer';


import NotFound from './common/NotFound';
import Profile from './components/UserPage/Profile.js';
import PrivateRoute from './common/PrivateRoute';
import MapForm from "./components/Map/MapForm";
import LoginForm from "./components/authorization/LoginForm";
import RegistrationForm from "./components/authorization/RegistrationForm.js";
import {ACCESS_TOKEN} from "./constants";
import {getCurrentUser} from "./util/APIUtils";
import LoadingIndicator from "./common/LoadingIndicator";
import Routes from "./components/Routes";
import Home from "./components/Home/Home";
import AppInfo from "./components/Home/AppInfo";

import PlacePage from "./components/PlacePage";
import UserPage from "./components/UserPage/UserPage";
import UserPlaces from "./components/User/UserPlaces/UserPlaces";
import RegisterPlace from "./components/RegisterPlace/RegisterPlace";
import ForgotPasswordForm from "./components/authorization/ForgotPasswordForm";
import RestorePasswordForm from "./components/authorization/RestorePasswordForm";

class App extends Component {
    constructor(props) {
        super(props);

        this.app = React.createRef();

        this.state = {
            routerHeight: 0,
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        const style = {
            minHeight: this.state.routerHeight
        };
        return (
            <HashRouter>
                <div ref={this.app} className="app">
                    <div style={style}>

                        <Menu/>

                        <Switch>
                            <Route path="//" component={Home}/>
                            <Route path="/app-info" component={AppInfo}/>

                            <Route path="/place/:placeId" component={PlacePage}/>
                            <Route path="/user/profile" component={UserPage}/>
                            <Route path="/user/:id/places" component={UserPlaces}/>
                            <Route path="/register-place" component={RegisterPlace}/>
                            <Route path="/forgot-password" component={ForgotPasswordForm}/>
                            <Route path="/restore/:token" component={RestorePasswordForm}/>

                            <Route path="/sign-in"
                                   render={(props) => <LoginForm onLogin={this.handleLogin} {...props} />}></Route>

                            <Route path="/sign-up" component={RegistrationForm}></Route>

                            <Route path="/users/:username"
                                   render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                               currentUser={this.state.currentUser} {...props}  />}>
                            </Route>

                            <PrivateRoute authenticated={this.state.isAuthenticated} path="/map" component={MapForm}
                                          handleLogout={this.handleLogout}></PrivateRoute>
                            <Route path="*" component={NotFound}></Route>
                            {/*<Routes minHeight={this.state.routerHeight}/>*/}


                        </Switch>

                        <Footer/>
                    </div>
                </div>
            </HashRouter>
        );
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {

                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    handleLogout(redirectTo = "/", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);
        window.Materialize.toast(description, 3000);

    }

    handleLogin() {

        this.loadCurrentUser();
        console.log(this.state.currentUser);
        window.Materialize.toast('You\'re successfully logged in.', 7000);
        this.props.history.push("#/map");
    }


    componentDidMount() {
        this.loadCurrentUser();
      //  this.resize();
        window.addEventListener('resize', this.onResizeHandler.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeHandler.bind(this));
    }

    resize() {
        const node = this.app.current;
        const children = node.children;

        let route, height = 0;
        Array.from(children).forEach((el, i) => {
            if (el.id == "router") {
                route = el;
            } else {
                height += el.clientHeight;
            }
        });

        const newRouterHeight = window.innerHeight - height;

        this.setState({
            routerHeight: newRouterHeight
        });
    }

    onResizeHandler() {
        this.resize();
    }
}

export default withRouter(App);

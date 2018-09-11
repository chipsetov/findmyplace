import React, {Component} from 'react';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import MapForm from './components/Map/MapForm.js';
import LoginForm from './components/Login/LoginForm.js';
import RegistrationForm from './components/Registration/RegistrationForm.js';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="app">
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/registration">Registration</Link>
                        </li>
                        <li>
                            <Link to="/map">Map</Link>
                        </li>
                    </ul>

                    <Route exact path="/" component={LoginForm}/>
                    <Route path="/registration" component={RegistrationForm}/>
                    <Route path="/map" component={MapForm}/>
                </div>
            </Router>
        );
    }
}

export default App;

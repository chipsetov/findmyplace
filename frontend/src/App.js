import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Login/LoginForm.js';

import RegistrationForm from './components/Registration/RegistrationForm.js';
import AuthenticationBar from './components/Header/AuthenticationBar.js';

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
                    </ul>

                    <Route exact path="/" component={LoginForm}/>
                    <Route path="/registration" component={RegistrationForm}/>
                </div>
            </Router>
        );
    }

}

export default App;

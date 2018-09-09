import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Login/LoginForm.js';
//import RegistrationForm from './components/Registration/RegistrationForm.js';
//import AuthenticationBar from './components/Header/AuthenticationBar.js';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <LoginForm/>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;

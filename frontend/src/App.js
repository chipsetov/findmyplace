import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
//import LoginForm from './components/LoginForm.js';
//import RegistrationForm from './components/RegistrationForm.js';
//import AuthenticationBar from './components/AuthenticationBar.js';
import Menu from './components/Menu.js';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Menu />
                </div>
            </BrowserRouter>
        );
    }

}

export default App;

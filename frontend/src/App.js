import React, { Component } from 'react';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import './App.css';
//import LoginForm from './components/LoginForm.js';
//import RegistrationForm from './components/RegistrationForm.js';

import Menu from './components/Menu.js';
import Routes from "./components/Route/Routes";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Menu />
                    <Routes/>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;

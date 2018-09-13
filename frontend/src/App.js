import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from './components/Routes';
import './App.css';
//import LoginForm from './components/LoginForm.js';
//import RegistrationForm from './components/RegistrationForm.js';
import Menu from './components/Menu.js';


class App extends Component {

    render() {
        return (
            <HashRouter>
                <div className="app">
                    <Menu />
                    <Routes />
                </div>
            </HashRouter>
        );
    }

}

export default App;

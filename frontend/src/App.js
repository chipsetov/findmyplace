import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from './components/Routes';
import './App.css';
import Menu from './components/Menu.js';
// import HomePage from './components/HomePage.js';
import Footer from './components/Footer';


class App extends Component {

    render() {
        return (
            <HashRouter>
                <div className="app">
                    <Menu />
                    <Routes />
                    <Footer />
                </div>
            </HashRouter>
        );
    }
}

export default App;

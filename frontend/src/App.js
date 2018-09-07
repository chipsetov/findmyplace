import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
//import LoginForm from './components/Login/LoginForm.js';
//import RegistrationForm from './components/Registration/RegistrationForm.js';
import AuthenticationBar from './components/Header/AuthenticationBar.js';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <AuthenticationBar/>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LogInForm from './components/LogIn/LogInForm.js';
//import RegistrationForm from './components/Registration/RegistrationForm.js';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <LogInForm/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

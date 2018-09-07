import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
//import LoginForm from './components/Login/Logi
nForm.js';
import RegistrationForm from './components/Registration/RegistrationForm.js';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <RegistrationForm/>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;

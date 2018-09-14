import React, { Component } from 'react';
import Menu from './Menu.js';
import Footer from './Footer.js';
import '../styles/HomePage.css';
import '../App.css';

class HomePage extends Component {

    render() {
        return (
         <div className="container">
             <div className="header-container">
                <div className="header">
                    <Menu />
                </div>
             </div>
             <Footer/>
         </div>
        );
    }

}

export default HomePage;
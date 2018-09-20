import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import '../../styles/HomePage.css';
import { NavItem } from "react-materialize";

class Home extends Component {

    render() {
         return (
             <div className="container-fluid">
                 <div className="greeting">
                     <p>Speed up the search and booking of places with our service</p>
                     <NavItem href='#/app-info' id="learn-more">Learn more</NavItem>
                 </div>
             </div>
        );
    }

}

export default withRouter(Home);
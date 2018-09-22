import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import '../../styles/HomePage.css';
import {NavItem, Row} from "react-materialize";

class Home extends Component {

    render() {
         return (
             <div className="container-fluid">
                 <Row className="greeting">
                     <p>Speed up the search and booking of places with our service</p>
                     <NavItem href='#/app-info' id="learn-more">Learn more</NavItem>
                 </Row>
             </div>
        );
    }

}

export default withRouter(Home);
import React, { Component } from 'react';
import { Col } from "react-materialize";
import '../../styles/AppInfo.css';

class AppInfo extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="app-info">
                    <Col className="text-col">
                        <h3>What is fmp?</h3>
                        <p>
                            "Find Me Place" is a service for quick search and booking of places for rest.
                            We work with a large base of checked institutions and provide accurate
                            information about the availability of available places for booking.
                        </p>
                    </Col>
                    <Col className="picture-col"></Col>
                </div>
            </div>
        );
    }

}

export default AppInfo;
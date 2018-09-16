import React, { Component } from 'react';
import Animation from './Animation.js';
import { withRouter } from "react-router-dom";

class HomePage extends Component {

    render() {
        const greeting = "Speed up the search and booking of places with our service";

        return (
             <div className="container-fluid">
                 <Animation text={greeting}/>
             </div>
        );
    }

}

export default withRouter(HomePage);
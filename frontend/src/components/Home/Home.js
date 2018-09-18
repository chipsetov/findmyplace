import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Animation from './Animation.js';
import AppInfo from "./AppInfo";

class Home extends Component {

    render() {
        const greeting = "Speed up the search and booking of places with our service";

        return (
             <div className="container-fluid">
                 <Animation text={greeting}/>
                 <AppInfo/>
             </div>
        );
    }

}

export default withRouter(Home);
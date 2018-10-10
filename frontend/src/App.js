import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from './components/Routes';
//import './App.css';
import Menu from './components/Menu.js';
import Footer from './components/Footer';
import {getAvatar} from "./util/APIUtils";
import {Session} from "./utils";

class App extends Component {
    constructor(props) {
        super(props);

        this.app = React.createRef();
        this.state = {
            routerHeight: 0,
            userAvatar: "img/avatar.png",
        };
    }

    render() {
        return (
            <HashRouter>
                <div ref={this.app} className="app">
                    <Menu userAvatar={this.state.userAvatar}/>
                    <Routes
                        handleAvatarUpdated={this.handleAvatarUpdated.bind(this)}
                        minHeight={this.state.routerHeight}/>
                    <Footer />
                </div>
            </HashRouter>
        );
    }

    handleAvatarUpdated() {
        if(Session.isLoggedIn()) {
            getAvatar()
                .then(response => {
                    if(response) {
                        this.setState({
                            userAvatar: response
                        });
                    }
                });
        }
    }

    componentDidMount() {
        this.resize();
        this.handleAvatarUpdated();
        window.addEventListener('resize', this.onResizeHandler.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeHandler.bind(this));
    }

    resize() {
        const node = this.app.current;
        const children = node.children;

        let route, height = 0;
        Array.from(children).forEach((el, i) => {
            if (el.id == "router") {
                route = el;
            } else {
                height += el.clientHeight;
            }
        });

        const newRouterHeight = window.innerHeight - height;

        this.setState({
            routerHeight: newRouterHeight
        });
    }

    onResizeHandler() {
        this.resize();
    }
}

export default App;

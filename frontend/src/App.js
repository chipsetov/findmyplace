import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from './components/Routes';
//import './App.css';
import Menu from './components/Menu.js';
import Footer from './components/Footer';

class App extends Component {
    constructor(props) {
        super(props);

        this.app = React.createRef();

        this.state = {
            routerHeight: 0
        }
    }

    render() {
        return (
            <HashRouter>
                <div ref={this.app} className="app">
                    <Menu />
                    <Routes minHeight={this.state.routerHeight}/>
                    <Footer />
                </div>
            </HashRouter>
        );
    }

    componentDidMount() {
        this.resize();
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

class AppFooter extends Component {

    render() {
        return (
             <div className="footer-container">
                <div className="footer">
                   <div className="column">
                        <p><Link to="/">About Us</Link></p>
                        <p><Link to="/">Terms of Service</Link></p>
                   </div>
                   <div className="column">
                        <p><Link to="/">Privacy Policy</Link></p>
                        <p><Link to="/">Customer Support</Link></p>
                   </div>
                   <div className="column">
                        <p><Link to="/">Contact Us</Link></p>
                   </div>
                   <div className="column">
                        <p>Social:</p>
                        <Link id="social-fb" className="social-icon" to="/"></Link>
                        <Link id="social-twitter" className="social-icon" to="/"></Link>
                        <Link id="social-instagram" className="social-icon" to="/"></Link>
                   </div>
                   <div className="copyright">© 2018 Find Me Place</div>
                </div>
             </div>
        );
    }

}

export default AppFooter;
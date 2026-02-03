import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
    // State for visitor count
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        // Check if we already counted this session to avoid spamming on reload (optional simple optimization)
        const hasVisited = sessionStorage.getItem('visited_session');

        const fetchCount = async () => {
            try {
                // If first visit in session, hit (increment). Else just get (read).
                const url = hasVisited
                    ? 'http://localhost:5000/api/visitors'
                    : 'http://localhost:5000/api/visitors/hit';

                const response = await fetch(url);
                const data = await response.json();
                setVisitorCount(data.value);

                if (!hasVisited) {
                    sessionStorage.setItem('visited_session', 'true');
                }
            } catch (error) {
                console.error("Error fetching visitor count:", error);
                // Fallback to a static number if API fails (e.g. adblockers)
                setVisitorCount(1024);
            }
        };

        fetchCount();
    }, []);

    return (
        <footer id="contact" className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h2>I2E E-CELL</h2>
                    <p>CMSCET</p>
                </div>
                <div className="footer-links">
                    <h4>Connect With Us</h4>
                    <div className="social-links">
                        <a href="https://www.instagram.com/e_cell_cmscet?igsh=a2M3MGg4NWtvZTk3" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.linkedin.com/company/i%C2%B2e/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>ecell@cmscet.ac.in</p>
                    <p>+91 98765 43210</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 I2E E-Cell CMSCET. All rights reserved.</p>
                <div className="visitor-count">
                    <span>Live Visitors: <span className="count-number">{visitorCount.toLocaleString()}</span></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

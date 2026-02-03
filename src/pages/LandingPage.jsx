import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
import JoinUs from '../components/JoinUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import FluidBackground from '../components/FluidBackground';
import SmoothScroll from '../components/SmoothScroll';

const LandingPage = () => {
    return (
        <div className="LandingPage">
            <SmoothScroll />
            <FluidBackground />
            <Navbar />
            <Hero />
            <About />
            <Events />
            <JoinUs />
            <Contact />
            <Footer />
        </div>
    );
};

export default LandingPage;

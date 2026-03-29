import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <motion.div
                className="hero-glow"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            ></motion.div>
            <div className="container hero-container">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">
                        <motion.span
                            className="gradient-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >Ideate.</motion.span> <br />
                        <motion.span
                            className="gradient-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >Integrate.</motion.span> <br />
                        <motion.span
                            className="gradient-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >Enterprise.</motion.span>
                    </h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        The official <span className="highlight-text">I<span className="super">2</span>E E-Cell</span> of CMS College of Engineering and Technology. Creating Next-Gen entrepreneurs since 2017.
                    </motion.p>
                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <a href="#events" className="btn-primary">Explore Events</a>
                        <a href="#about" className="btn-secondary">Learn More</a>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="logo-glow-container">
                        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="I2E Giant Logo" className="hero-logo floating" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

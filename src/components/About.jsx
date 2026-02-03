import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="about" className="section-padding">
            <div className="container">
                <motion.h2
                    className="section-title text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >Who We Are</motion.h2>
                <div className="about-grid">
                    <motion.div
                        className="glass-card"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h3>Our Vision</h3>
                        <p>To produce vibrant entrepreneurs with integrity and encourage individual creativity.</p>
                    </motion.div>
                    <motion.div
                        className="glass-card highlight"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Our Mission</h3>
                        <p>To create Next-Gen entrepreneurs by developing entrepreneurial qualities in budding professionals and transforming innovative ideas into products/services.</p>
                    </motion.div>
                    <motion.div
                        className="glass-card"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3>What We Do</h3>
                        <p>We provide mentoring, planning, and execution support for startup ideas, along with infrastructure and technical backing.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;


import React, { useEffect, useRef } from 'react';
import WebGLFluid from 'webgl-fluid';
import './FluidBackground.css';

const FluidBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        // Configuration for "Buttery Smooth" Liquid
        const options = {
            IMMEDIATE: true, // Trigger immediately
            TRIGGER: 'hover', // Mouse interaction
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 1024,
            CAPTURE_RESOLUTION: 512,
            DENSITY_DISSIPATION: 1,
            VELOCITY_DISSIPATION: 0.2,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: 20,
            CURL: 30,
            SPLAT_RADIUS: 0.25,
            SPLAT_FORCE: 6000,
            SHADING: true,
            COLORFUL: true,
            COLOR_UPDATE_SPEED: 10,
            PAUSED: false,
            BACK_COLOR: { r: 7, g: 7, b: 11 }, // Matching our deep dark theme #07070B
            TRANSPARENT: false, // Ensure we see the background color
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 0.8,
            BLOOM_THRESHOLD: 0.6,
            BLOOM_SOFT_KNEE: 0.7,
            SUNRAYS: true,
            SUNRAYS_RESOLUTION: 196,
            SUNRAYS_WEIGHT: 1.0,
        };

        // Initialize simulation
        // Note: webgl-fluid might export a singleton/function. 
        // We try calling it as a function based on standard usage.
        try {
            WebGLFluid(canvas, options);
        } catch (e) {
            console.error("WebGL Fluid initialization failed:", e);
        }

    }, []);

    return <canvas ref={canvasRef} className="fluid-canvas" />;
};

export default FluidBackground;

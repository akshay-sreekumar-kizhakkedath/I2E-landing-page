import React, { useEffect, useRef } from 'react';
import './RippleBackground.css';

const RippleBackground = () => {
    const canvasRef = useRef(null);
    const ripples = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const createRipple = (x, y) => {
            ripples.current.push({
                x,
                y,
                radius: 0,
                alpha: 0.5,
                color: Math.random() > 0.5 ? '#2D9CDB' : '#F2994A' // Primary colors
            });
        };

        const handleMouseMove = (e) => {
            // Throttling creation for performance
            if (Math.random() > 0.8) {
                createRipple(e.clientX, e.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw ripples
            for (let i = ripples.current.length - 1; i >= 0; i--) {
                const r = ripples.current[i];
                r.radius += 1; // Expansion speed
                r.alpha -= 0.005; // Fade speed

                if (r.alpha <= 0) {
                    ripples.current.splice(i, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                    ctx.strokeStyle = r.color;
                    ctx.globalAlpha = r.alpha;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
            ctx.globalAlpha = 1; // Reset alpha

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="ripple-canvas" />;
};

export default RippleBackground;

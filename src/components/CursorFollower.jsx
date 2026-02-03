import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CursorFollower.css';

const CursorFollower = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            opacity: 1,
            height: 24,
            width: 24,
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle background
            borderColor: "var(--primary-teal)",
            borderWidth: "1px",
            borderStyle: "solid",
            transition: {
                type: "spring",
                mass: 0.3,
                damping: 15,
                stiffness: 200 // Slightly faster to feel responsive but fluid
            }
        },
        hover: {
            x: mousePosition.x - 30, // Center larger circle
            y: mousePosition.y - 30,
            height: 60,
            width: 60,
            opacity: 0.5,
            backgroundColor: "rgba(45, 156, 219, 0.2)",
            borderColor: "var(--primary-orange)",
            transition: {
                type: "spring",
                mass: 0.4,
                damping: 10
            }
        }
    };

    return (
        <motion.div
            className="cursor-follower"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
        />
    );
};

export default CursorFollower;

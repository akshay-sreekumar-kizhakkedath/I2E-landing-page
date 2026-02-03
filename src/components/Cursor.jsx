import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        // Add event listeners for hover effects
        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setCursorVariant("text");
            } else {
                setCursorVariant("default");
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
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "var(--primary-teal)",
            borderWidth: "1px",
            borderStyle: "solid",
            height: 32,
            width: 32,
            transition: {
                type: "spring",
                mass: 0.6
            }
        },
        text: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            backgroundColor: "rgba(242, 153, 74, 0.2)",
            borderColor: "var(--primary-orange)",
            height: 80,
            width: 80,
            mixBlendMode: "screen",
            transition: {
                type: "spring",
                mass: 0.6
            }
        }
    };

    const centerDotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
        },
        text: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
        }
    };

    return (
        <>
            <motion.div
                className="cursor"
                variants={variants}
                animate={cursorVariant}
            />
            <motion.div
                className="cursor-dot"
                variants={centerDotVariants}
                animate={cursorVariant}
            />
        </>
    );
};

export default Cursor;

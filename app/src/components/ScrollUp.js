import React, { useState, useEffect } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import '../styles/ScrollUp.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={`top-to-btm ${isVisible ? 'visible' : 'hidden'}`} onClick={scrollToTop}>
            <FaAngleUp className="icon-position icon-style" />
        </div>
    );
};

export default ScrollToTop;

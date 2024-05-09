import React from 'react';
import { FaAngleUp } from 'react-icons/fa';
import '../styles/ScrollUp.css';

const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="top-to-btm" onClick={scrollToTop}>
            <FaAngleUp className="icon-position icon-style" />
        </div>
    );
};

export default ScrollToTop;

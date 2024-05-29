import { useState, useCallback } from 'react';

const useHover = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        console.log('Mouse entering')
    }, []);


    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        console.log('Mouse leaving')
    }, []);

    return {
        isHovered, handleMouseEnter, handleMouseLeave
    };
}

export default useHover;
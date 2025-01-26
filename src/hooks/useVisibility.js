import { useEffect, useState } from 'react';

const useVisibility = (ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const checkVisibility = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            // Check if the element is in the viewport
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
    };

    useEffect(() => {
        // Check visibility immediately when the component mounts
        checkVisibility();

        // Optionally, you can still listen for scroll events if you want to update visibility later
        window.addEventListener('scroll', checkVisibility);
        return () => {
            window.removeEventListener('scroll', checkVisibility);
        };
    }, [ref]);

    return isVisible;
};

export default useVisibility; 
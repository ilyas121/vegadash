import { useEffect, useState } from 'react';

const useCountTo = (to, speed) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = to;
        const duration = speed;
        const increment = end / (duration / 1000);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                clearInterval(timer);
                setCount(end);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60); // 60 FPS

        return () => clearInterval(timer);
    }, [to, speed]);

    return count;
};

export default useCountTo; 
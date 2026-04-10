import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHashElement = () => {
    const { hash, key } = useLocation();

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const smoothScrollTo = (targetY: number, duration: number = 1000) => {
        const startY = window.scrollY;
        const change = targetY - startY;
        let currentTime = 0;
        const increment = 20;

        const animateScroll = () => {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, startY, change, duration);
            window.scrollTo(0, val);
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        };
        requestAnimationFrame(animateScroll);
    };

    useEffect(() => {
        if (hash) {
            const timeoutId = setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    const targetY = element.getBoundingClientRect().top + window.scrollY;
                    smoothScrollTo(targetY, 1200); // 1.2 seconds for a slower feel
                }
            }, 100);
            return () => clearTimeout(timeoutId);
        } else {
            smoothScrollTo(0, 1000); // 1 second for scroll to top
        }
    }, [hash, key]);

    return null;
};

export default ScrollToHashElement;

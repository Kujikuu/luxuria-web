import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
    children: ReactNode;
    options?: {
        duration?: number;
        easing?: (t: number) => number;
        direction?: 'vertical' | 'horizontal';
        gestureDirection?: 'vertical' | 'horizontal' | 'both';
        smooth?: boolean;
        mouseMultiplier?: number;
        smoothTouch?: boolean;
        touchMultiplier?: number;
        infinite?: boolean;
    };
}

export default function LenisProvider({ 
    children, 
    options = {
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    }
}: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        lenisRef.current = new Lenis(options);

        // Animation frame function
        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        // Start the animation loop
        requestAnimationFrame(raf);

        // Cleanup function
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    return <>{children}</>;
}
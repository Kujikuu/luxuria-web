import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

// Predefined scroll speed presets
export const scrollSpeedPresets = {
    slow: {
        duration: 2.5,
        mouseMultiplier: 0.6,
        touchMultiplier: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
    },
    normal: {
        duration: 1.6,
        mouseMultiplier: 1,
        touchMultiplier: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    },
    fast: {
        duration: 0.8,
        mouseMultiplier: 1.5,
        touchMultiplier: 2.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
    },
    instant: {
        duration: 0.3,
        mouseMultiplier: 2,
        touchMultiplier: 3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -15 * t)),
    }
};

interface LenisProviderProps {
    children: ReactNode;
    scrollSpeed?: 'slow' | 'normal' | 'fast' | 'instant';
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
    scrollSpeed = 'normal',
    options = {}
}: LenisProviderProps) {
    // Get preset configuration
    const presetConfig = scrollSpeedPresets[scrollSpeed];
    
    // Merge preset with custom options (custom options override preset)
    const finalOptions = {
        direction: 'vertical' as const,
        gestureDirection: 'vertical' as const,
        smooth: true,
        smoothTouch: false,
        infinite: false,
        ...presetConfig,
        ...options,
    };
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        lenisRef.current = new Lenis(finalOptions);

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
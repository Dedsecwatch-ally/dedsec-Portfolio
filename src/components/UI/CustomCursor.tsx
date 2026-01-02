'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Move cursor elements
        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0,
                ease: "none"
            });
            gsap.to(followerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        // Hover detection
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer') || target.classList.contains('group')) {
                setIsHovering(true);
            }
        };

        const onMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    return (
        <>
            {/* Main Cursor (Dot) */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-neon-green rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
            />

            {/* Follower (Ring) */}
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 border border-neon-blue rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out flex items-center justify-center ${isHovering ? 'w-12 h-12 bg-neon-blue/20 border-neon-green' : 'w-8 h-8'}`}
            >
                <div className={`w-1 h-1 bg-white rounded-full opacity-50 ${isHovering ? 'hidden' : 'block'}`}></div>

                {/* Crosshair lines on hover */}
                {isHovering && (
                    <>
                        <div className="absolute w-full h-[1px] bg-neon-green/50"></div>
                        <div className="absolute h-full w-[1px] bg-neon-green/50"></div>
                    </>
                )}
            </div>
        </>
    );
}

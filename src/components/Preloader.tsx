'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const terminalLines = [
    "Initializing Kernel...",
    "Loading sarcasm modules...",
    "Optimizing spaghetti code...",
    "Accessing neural network...",
    "Breaching mainfame...",
    "System Ready."
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [lines, setLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Glitch effect before removing
                gsap.to(containerRef.current, {
                    duration: 0.5,
                    skewX: 20,
                    scale: 1.1,
                    opacity: 0,
                    ease: "power2.inOut",
                    onComplete: onComplete
                });
            }
        });

        terminalLines.forEach((line, index) => {
            tl.to({}, {
                duration: 0.5,
                onStart: () => {
                    setLines(prev => [...prev, line]);
                }
            });
        });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-void flex items-center justify-center font-mono text-neon-green">
            <div className="w-full max-w-md p-6">
                {lines.map((line, i) => (
                    <div key={i} className="mb-2">
                        <span className="mr-2">&gt;</span>
                        {line}
                    </div>
                ))}
                <div className="animate-pulse">_</div>
            </div>
        </div>
    );
}

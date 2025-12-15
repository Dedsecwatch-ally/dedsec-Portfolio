'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function SystemMonitor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [score, setScore] = useState(0);
    const [loadTime, setLoadTime] = useState(0);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Entrance
            gsap.from(containerRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                delay: 2, // Wait for intro
                ease: "power3.out"
            });

            // Score Counter
            gsap.to({}, {
                duration: 2,
                delay: 2.5,
                onUpdate: function () {
                    setScore(Math.round(this.progress() * 100));
                },
                ease: "power2.out"
            });

            // Load Time Counter (simulated)
            gsap.to({}, {
                duration: 1.5,
                delay: 2.5,
                onUpdate: function () {
                    setLoadTime(Math.round(this.progress() * 120 + 20)); // animate to ~140ms
                },
                ease: "power2.out"
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed bottom-6 left-6 z-50 flex flex-col gap-4 font-mono pointer-events-none mix-blend-difference text-white"
        >
            {/* Lighthouse Score */}
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="#333" strokeWidth="4" fill="none" />
                        <circle
                            cx="24" cy="24" r="20"
                            stroke="#00ff41" strokeWidth="4" fill="none"
                            strokeDasharray="125.6"
                            strokeDashoffset={125.6 - (125.6 * score) / 100}
                            className="transition-all duration-100"
                        />
                    </svg>
                    <span className="text-sm font-bold">{score}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Lighthouse</span>
                    <span className="text-xs text-neon-green">PERFORMANCE</span>
                </div>
            </div>

            {/* WCAG & Load Time */}
            <div className="flex items-center gap-6 pl-1">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">WCAG 2.1</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                        <span className="text-xs font-bold text-neon-blue">AAA_READY</span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Latency</span>
                    <span className="text-xs font-bold text-white">{loadTime}ms</span>
                </div>
            </div>

            {/* Aesthetic Grid Line */}
            <div className="absolute -left-2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function OpeningLoader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Option A: Just hide it via CSS to avoid unmounting jank
                if (containerRef.current) {
                    containerRef.current.style.display = "none";
                }
            },
        });

        // Animate percentage counter
        const counter = { val: 0 };
        tl.to(counter, {
            val: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                setPercent(Math.floor(counter.val));
            }
        });

        // Text Reveal
        tl.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "<" // Start with counter
        );

        // Progress Bar Expansion
        tl.fromTo(
            progressRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 2, ease: "expo.inOut", transformOrigin: "left" },
            "<"
        );

        // Glitch / Exit effect
        tl.to(textRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in",
            delay: 0.2
        });

        // Wipe away
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
        });

        // Cleanup
        return () => {
            tl.kill();
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void text-off-white"
        >
            <div className="w-64 space-y-4">
                <div className="flex justify-between items-end overflow-hidden">
                    <h1 ref={textRef} className="text-xl font-jetbrains font-bold tracking-widest text-neon-cyan">
                        SYSTEM_INIT
                    </h1>
                    <span className="font-jetbrains text-neon-green text-sm">{percent}%</span>
                </div>

                {/* Progress Bar Track */}
                <div className="h-1 w-full bg-void-light overflow-hidden">
                    {/* Progress Bar Fill */}
                    <div ref={progressRef} className="h-full w-full bg-neon-cyan/80 shadow-[0_0_15px_rgba(0,255,255,0.5)]"></div>
                </div>
            </div>

            {/* Decorative localized grid background */}
            <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
    );
}

'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ManifestoSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    end: "bottom 75%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 20,
                duration: 1.5,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 bg-void flex justify-center items-center">
            <div className="max-w-4xl text-center">
                <span className="text-neon-blue font-mono text-sm tracking-[0.2em] mb-8 block opacity-70">
                    // PERSONAL_MANIFESTO
                </span>

                <h2
                    ref={textRef}
                    className="relative text-3xl md:text-5xl font-sans font-light leading-snug text-off-white/90 z-10"
                >
                    "I believe good design is <span className="text-white font-normal italic animate-pulse-slow">invisible</span>,
                    <br className="hidden md:block" /> curiosity is a <span className="text-neon-green animate-glow">superpower</span>,
                    <br className="hidden md:block" /> and learning <span className="relative inline-block group">
                        <span className="relative z-10 underline decoration-neon-blue decoration-2 underline-offset-4 group-hover:text-void transition-colors duration-300">never stops</span>
                        <span className="absolute inset-0 bg-neon-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0"></span>
                    </span>."
                </h2>

                <div className="mt-12 flex justify-center relative">
                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="absolute top-0 h-1 w-20 bg-gradient-to-r from-transparent via-neon-blue to-transparent blur-sm animate-track-light"></div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import TechCloud from './TechCloud';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
    const [display, setDisplay] = useState(text);
    const elementRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: elementRef.current,
                start: "top 80%",
                onEnter: () => {
                    let iteration = 0;
                    const interval = setInterval(() => {
                        setDisplay(prev => text.split("").map((letter, index) => {
                            if (index < iteration) return text[index];
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        }).join(""));

                        if (iteration >= text.length) clearInterval(interval);
                        iteration += 1 / 3;
                    }, 30);
                }
            });
        }, elementRef);
        return () => ctx.revert();
    }, [text]);

    return <h2 ref={elementRef} className={className}>{display}</h2>;
};

const BlurReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const el = useRef(null);
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(el.current,
                { opacity: 0, filter: 'blur(10px)', y: 20 },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 1,
                    delay: delay,
                    scrollTrigger: {
                        trigger: el.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, el);
        return () => ctx.revert();
    }, [delay]);

    return <div ref={el}>{children}</div>;
};

export default function AboutSection() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // No specific staggered entrance for text children needed here, BlurReveal handles it.
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full flex items-center justify-center bg-void py-10 md:py-20 px-4 md:px-6 relative z-10">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Left Side: Copy */}
                <div className="space-y-8">
                    <div className="glitch-hover inline-block">
                        <ScrambleText
                            text="<ABOUT_ME />"
                            className="text-neon-green font-mono text-xl tracking-wider mb-4 cursor-default"
                        />
                    </div>

                    <BlurReveal delay={0.2}>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans leading-tight">
                            Hi, I'm Ayushman. <br />
                            I have a love-hate relationship with <span className="text-neon-blue inline-block hover:scale-110 transition-transform cursor-crosshair">Stack Overflow</span>.
                        </h3>
                    </BlurReveal>

                    <div className="text-lg text-off-white/80 space-y-6 font-mono leading-relaxed relative">
                        {/* Decorative Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-green to-transparent opacity-30" />

                        <BlurReveal delay={0.4}>
                            <p className="pl-6 relative group">
                                <span className="absolute left-0 top-0 text-neon-blue opacity-50 -ml-2 group-hover:opacity-100 transition-opacity">01</span>
                                I’m a Full Stack Developer obsessed with <span className="text-white font-bold hover:text-neon-green transition-colors cursor-help">high-performance Java backends</span> and <span className="text-white font-bold hover:text-neon-blue transition-colors cursor-help">buttery smooth React frontends</span>.
                                My friends think I fix printers; my parents think I work for 'The Internet';
                                I actually just move brightly colored rectangles around a screen and scream at Linux terminals.
                            </p>
                        </BlurReveal>

                        <BlurReveal delay={0.6}>
                            <p className="pl-6 relative group">
                                <span className="absolute left-0 top-0 text-neon-green opacity-50 -ml-2 group-hover:opacity-100 transition-opacity">02</span>
                                If you're looking for someone who writes clean code, follows best practices, and makes great nerdy references—you've found your player 2.
                            </p>
                        </BlurReveal>
                    </div>
                </div>

                {/* Right Side: Tech Cloud */}
                <div className="h-[350px] md:h-[500px] w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void z-10 pointer-events-none" />
                    <TechCloud />
                </div>
            </div>
        </section>
    );
}

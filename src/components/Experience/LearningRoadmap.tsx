'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Milestone = {
    year: string;
    title: string;
    description: string;
    icon: string; // Emoji or SVG path
    side: 'left' | 'right';
    color: string;
};

const MILESTONES: Milestone[] = [
    {
        year: '2020',
        title: 'UI/UX_INITIATION',
        description: 'Started with Figma & Adobe XD. Learned the laws of UX, color theory, and typography. Obsessed with making things "pop".',
        icon: '🎨',
        side: 'left',
        color: 'border-neon-pink'
    },
    {
        year: '2021',
        title: 'FRONTEND_FOUNDATIONS',
        description: 'Mastered HTML, CSS, and JavaScript. Discovered React and the joy of component-based architecture. Animation became a priority.',
        icon: '⚛️',
        side: 'right',
        color: 'border-neon-blue'
    },
    {
        year: '2022',
        title: 'BACKEND_STABILITY',
        description: 'Drove into Node.js and Databases. Understood REST, GraphQL, and the importance of a solid infrastructure. Security first.',
        icon: '🛡️',
        side: 'left',
        color: 'border-yellow-400'
    },
    {
        year: '2023',
        title: 'FULL_STACK_SYNTHESIS',
        description: 'Bridged the gap between Design and Code. Next.js became the weapon of choice. Focusing on performance and SEO.',
        icon: '🌐',
        side: 'right',
        color: 'border-neon-green'
    },
    {
        year: '2024+',
        title: 'AI_INTEGRATION',
        description: 'Exploring Generative AI, LLMs, and intelligent interfaces. The future is automated and personalized.',
        icon: '🤖',
        side: 'left',
        color: 'border-purple-500'
    },
];

export default function LearningRoadmap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const milestones = gsap.utils.toArray('.milestone-card');

            // Safe check for line ref
            if (lineRef.current) {
                const length = lineRef.current.getTotalLength();

                // Set initial state via GSAP to avoid hydration mismatch
                gsap.set(lineRef.current, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    autoAlpha: 1
                });

                // Animate SVG Line
                gsap.to(lineRef.current, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 60%',
                        end: 'bottom 80%',
                        scrub: 1,
                    }
                });
            }

            // Unlock Milestones
            milestones.forEach((milestone: any, i) => {
                gsap.from(milestone, {
                    scale: 0.8,
                    opacity: 0,
                    filter: 'blur(10px)',
                    y: 50,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: milestone,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-4 relative min-h-screen overflow-hidden">
            <div className="max-w-6xl mx-auto relative">

                {/* Header */}
                <div className="text-center mb-24 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest mb-4">
                        LEARNING_<span className="text-neon-green">ROADMAP</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
                        A visual journey through the layers of the stack. From pixels to databases.
                    </p>
                </div>

                {/* Central Line (SVG) */}
                <div className="absolute left-1/2 top-32 bottom-0 w-1 -translate-x-1/2 z-0 hidden md:block h-[85%]">
                    <svg className="w-full h-full overflow-visible">
                        {/* Define glowing effect */}
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Background Path (faint) */}
                        <path
                            d="M 2 0 V 1500" // Adjust height dynamically in real app, hardcoded for consistency here
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="4"
                        />

                        {/* Animated Forepath */}
                        <path
                            ref={lineRef}
                            d="M 2 0 V 1500"
                            fill="none"
                            stroke="#00ff41"
                            strokeWidth="4"
                            filter="url(#glow)"
                            className="opacity-0" // Hidden initially, revealed by GSAP
                        />
                    </svg>
                </div>

                {/* Milestones */}
                <div className="flex flex-col gap-12 md:gap-32 relative z-10">
                    {MILESTONES.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center w-full ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Content Side */}
                            <div className={`w-full md:w-1/2 flex ${item.side === 'right' ? 'md:justify-start' : 'md:justify-end'} justify-center px-4`}>
                                <div className={`milestone-card relative bg-void/80 backdrop-blur-md p-6 border-l-4 ${item.color} rounded-r-lg max-w-md w-full shadow-2xl hover:scale-105 transition-transform duration-300 group`}>
                                    {/* Locked Overlay Effect */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none milestone-lock"></div>

                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-white">{item.year}</h3>
                                        <span className="text-3xl animate-bounce">{item.icon}</span>
                                    </div>
                                    <h4 className={`text-xl font-mono mb-2 ${item.color.replace('border-', 'text-')}`}>
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Decorative Corner */}
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20"></div>
                                </div>
                            </div>

                            {/* Center Node (Desktop) */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-void border-2 border-white/20 z-20">
                                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Bottom Connector */}
                <div className="flex justify-center mt-24">
                    <div className="w-16 h-16 rounded-full border-2 border-neon-green/30 flex items-center justify-center animate-spin-slow">
                        <div className="w-12 h-12 rounded-full border border-neon-green/60 border-dashed"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}

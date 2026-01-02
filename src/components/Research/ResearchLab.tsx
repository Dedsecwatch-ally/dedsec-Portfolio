'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ModuleType = 'BLUEPRINT' | 'TERMINAL';

interface ResearchModule {
    id: string;
    title: string;
    subtitle: string;
    type: ModuleType;
    content: string[]; // For terminal lines or blueprint specs
    description: string;
}

const MODULES: ResearchModule[] = [
    {
        id: 'MOD_01',
        title: 'ROBOTICS_&_IOT',
        subtitle: 'AUTONOMOUS_SYSTEMS',
        type: 'BLUEPRINT',
        content: [
            "SERVO_DRIVER... OK",
            "SENSOR_FUSION... ACTIVE",
            "LIDAR_MAPPING... INIT",
            "ESP32_CORE... CONNECTED"
        ],
        description: "Designing intelligent hardware interfaces. From Arduino sensor arrays to complex Raspberry Pi clusters."
    },
    {
        id: 'MOD_02',
        title: 'ETHICAL_HACKING',
        subtitle: 'REVERSE_ENGINEERING',
        type: 'TERMINAL',
        content: [
            "0x45 0x12 0x9A 0xBC",
            "DECOMPILING BINARY...",
            "> ANALYZING HEAP...",
            "VULNERABILITY SCAN: 0"
        ],
        description: "Deconstructing software to understand its core. Penetration testing and securing vulnerabilities before they are exploited."
    }
];

export default function ResearchLab() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

            // Blueprint Reveal
            gsap.utils.toArray('.blueprint-grid').forEach((grid: any) => {
                gsap.fromTo(grid,
                    { backgroundSize: "0px 0px", opacity: 0 },
                    {
                        backgroundSize: "40px 40px",
                        opacity: 0.2,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: { trigger: grid, start: "top 80%" }
                    }
                );
            });

            // Terminal Typing Effect
            gsap.utils.toArray('.terminal-line').forEach((line: any, i) => {
                gsap.from(line, {
                    width: 0,
                    opacity: 0,
                    duration: 0.5,
                    delay: i * 0.2,
                    ease: "steps(20)",
                    scrollTrigger: {
                        trigger: line.parentElement,
                        start: "top 85%"
                    }
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 bg-void relative overflow-hidden">

            {/* Background Tech Graph */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full">
                    <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10h80v80h-80z" fill="none" stroke="currentColor" className="text-neon-blue" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="2" fill="currentColor" className="text-neon-green" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold font-sans text-white mb-4 tracking-widest">
                        RESEARCH_<span className="text-neon-pink">LAB</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm">
                        &gt; EXPERIMENTAL_PROJECTS && SIDE_QUESTS
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {MODULES.map((mod) => (
                        <div key={mod.id} className="group relative bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-colors duration-500">

                            {/* Blueprint/Schematic Background for Type 1 */}
                            {mod.type === 'BLUEPRINT' && (
                                <div className="absolute inset-0 blueprint-grid opacity-20 bg-[linear-gradient(to_right,#00f3ff_1px,transparent_1px),linear-gradient(to_bottom,#00f3ff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                            )}

                            {/* Header Stripe */}
                            <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
                                <span className="font-mono text-xs text-neon-pink">{mod.id}</span>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                            </div>

                            <div className="p-8 relative">
                                <h3 className="text-3xl font-bold text-white mb-2">{mod.title.replace(/_/g, ' ')}</h3>
                                <h4 className={`text-sm font-mono mb-6 ${mod.type === 'BLUEPRINT' ? 'text-neon-blue' : 'text-neon-green'}`}>
                                    [{mod.subtitle}]
                                </h4>

                                {/* Visualizer Area */}
                                <div className={`h-48 mb-6 rounded border border-white/20 p-4 font-mono text-xs overflow-hidden ${mod.type === 'TERMINAL' ? 'bg-black text-green-400' : 'bg-neon-blue/10 text-neon-blue'}`}>
                                    {mod.content.map((line, i) => (
                                        <div key={i} className="terminal-line whitespace-nowrap overflow-hidden mb-1">
                                            {mod.type === 'TERMINAL' && <span className="text-gray-500 mr-2">$</span>}
                                            {line}
                                        </div>
                                    ))}
                                    <div className="w-2 h-4 bg-current animate-pulse inline-block mt-1"></div>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {mod.description}
                                </p>

                                {/* Interactive Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

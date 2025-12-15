'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const skills = [
    { name: 'Python', type: 'Backend/AI', level: 98, status: 'OPTIMIZED' },
    { name: 'Java', type: 'Backend', level: 95, status: 'STABLE' },
    { name: 'Spring Boot', type: 'Framework', level: 92, status: 'ACTIVE' },
    { name: 'React', type: 'Frontend', level: 96, status: 'RENDERING' },
    { name: 'Node.js', type: 'Runtime', level: 90, status: 'ASYNC' },
    { name: 'JavaScript', type: 'Language', level: 99, status: 'COMPILED' },
    { name: 'HTML', type: 'Structure', level: 100, status: 'SOLID' },
    { name: 'TypeScript', type: 'Language', level: 94, status: 'STRICT' },
    { name: 'Jira', type: 'Tool', level: 85, status: 'TRACKING' },
    { name: 'TestLink', type: 'QA', level: 88, status: 'VERIFIED' },
];

export default function SkillsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            rowsRef.current.forEach((row, i) => {
                if (!row) return;

                // Animate row entrance
                gsap.from(row, {
                    scrollTrigger: {
                        trigger: row,
                        start: "top 90%",
                        toggleActions: 'play none none reverse'
                    },
                    x: -50,
                    opacity: 0,
                    duration: 0.5,
                    delay: i * 0.1,
                    onComplete: () => {
                        // Continuous subtle glitch/flicker effect
                        gsap.to(row, {
                            opacity: "random(0.8, 1)",
                            duration: 0.1,
                            repeat: -1,
                            yoyo: true,
                            repeatRefresh: true,
                            ease: "steps(1)"
                        });
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen py-24 px-4 bg-void flex items-center justify-center">
            <div className="w-full max-w-5xl">
                <div className="mb-12 border-b border-neon-green/30 pb-4 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold font-sans text-off-white">System Capabilities</h2>
                        <p className="font-mono text-neon-green mt-2 text-sm">
                            &gt; SELECT * FROM SKILLS_DB WHERE STATUS='ACTIVE';
                        </p>
                    </div>
                    <div className="text-xs font-mono text-neon-green/50 hidden md:block">
                        SYS.UPTIME: 99.99%
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full font-mono text-left border-collapse">
                        <thead>
                            <tr className="text-neon-blue border-b border-neon-blue/20 text-sm">
                                <th className="py-4 px-4">ID</th>
                                <th className="py-4 px-4">MODULE_NAME</th>
                                <th className="py-4 px-4">TYPE</th>
                                <th className="py-4 px-4">INTEGRITY</th>
                                <th className="py-4 px-4">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill, index) => (
                                <tr
                                    key={skill.name}
                                    ref={el => { rowsRef.current[index] = el; }}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                                >
                                    <td className="py-4 px-4 text-gray-500 text-xs">0x{index.toString(16).padEnd(2, '0').toUpperCase()}</td>
                                    <td className="py-4 px-4 font-bold text-lg text-off-white group-hover:text-neon-green transition-colors">
                                        {skill.name}
                                    </td>
                                    <td className="py-4 px-4 text-neon-blue/80 text-sm">{skill.type}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-neon-green"
                                                    style={{ width: `${skill.level}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-neon-green">{skill.level}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-xs">
                                        <span className="px-2 py-1 bg-neon-green/10 text-neon-green rounded border border-neon-green/20">
                                            {skill.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-right font-mono text-xs text-gray-600">
                    <span className="animate-pulse">_CURSOR_IDLE</span>
                </div>
            </div>
        </section>
    );
}

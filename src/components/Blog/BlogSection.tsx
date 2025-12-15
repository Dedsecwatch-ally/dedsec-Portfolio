'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const posts = [
    {
        id: "LOG_001",
        title: "UX Mistakes Beginners Make",
        date: "2023-10-24",
        preview: "Designing for yourself instead of the user is the first sin. The second is using infinite scroll on a footer-heavy site.",
        tags: ["UX", "Design", "Critique"]
    },
    {
        id: "LOG_002",
        title: "Animations That Improve Usability",
        date: "2023-11-05",
        preview: "Motion isn't just candy. It's context. Learn how to use layout shifts and micro-interactions to guide the user's eye, not just dazzle it.",
        tags: ["Animation", "GSAP", "Frontend"]
    }
];

export default function BlogSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.blog-card');

            gsap.from(cards, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 bg-void relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-sans text-off-white mb-2">System Logs</h2>
                    <div className="h-0.5 w-24 bg-neon-blue"></div>
                    <p className="font-mono text-neon-blue mt-4 text-sm max-w-xl">
                        &gt; DECRYPTING_THOUGHTS... <br />
                        &gt; ACCESSING_ARCHIVE [MODE: READ_ONLY]
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="blog-card group relative p-1">
                            {/* Holographic Border Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-green to-neon-blue opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm"></div>

                            <div className="relative h-full bg-black/90 border border-white/10 rounded-lg p-8 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,243,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

                                <div className="flex justify-between items-start mb-6">
                                    <span className="font-mono text-xs text-neon-green/70 border border-neon-green/30 px-2 py-1 rounded">
                                        {post.id}
                                    </span>
                                    <span className="font-mono text-xs text-gray-500">{post.date}</span>
                                </div>

                                <h3 className="text-2xl font-bold font-sans text-off-white mb-4 group-hover:text-neon-blue transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                                    {post.preview}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-off-white/50 bg-white/5 px-2 py-1 rounded">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Glitch Overlay on Hover */}
                                <div className="absolute inset-0 bg-neon-blue/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 pointer-events-none mix-blend-overlay"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

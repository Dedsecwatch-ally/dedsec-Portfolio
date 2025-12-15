'use client';

import { useRef, useState, MouseEvent } from 'react';
import { gsap } from 'gsap';

interface ProjectProps {
    title: string;
    description: string;
    repoUrl: string; // Placeholder for now
    color: string;
}

export default function ProjectCard({ title, description, repoUrl, color }: ProjectProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            className="relative w-[400px] h-[500px] perspective-1000 group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className="w-full h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-transform duration-100 ease-out flex flex-col justify-between"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Glow Effect */}
                <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`
                    }}
                />

                {/* Content */}
                <div className="transform translate-z-10 space-y-4">
                    <div className="text-sm font-mono opacity-50">{'{ PROJECT }'}</div>
                    <h3 className="text-4xl font-bold font-sans" style={{ color: color }}>{title}</h3>
                    <p className="text-off-white/80 font-mono text-sm leading-relaxed">{description}</p>
                </div>

                <div className="transform translate-z-10 pt-8 border-t border-white/10">
                    <a href={repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 text-sm font-mono hover:text-white transition-colors">
                        <span>VIEW_REPO</span>
                        <span>→</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

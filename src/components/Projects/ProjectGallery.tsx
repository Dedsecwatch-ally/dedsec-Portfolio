'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Sentiment Analysis",
        description: "An AI model that detects if your customers hate you, or just mildly dislike you. Trained on Twitter threads and YouTube comments for maximum toxicity tolerance.",
        repoUrl: "https://github.com/Dedsecwatch-ally/sentiment-analysis-model",
        color: "#ff0055"
    },
    {
        title: "FID Model",
        description: "Fréchet Inception Distance calculator. Basically, it judges how fake your GAN-generated images look. It's the art critic of the AI world, but with more math and less berets.",
        repoUrl: "https://github.com/Dedsecwatch-ally/FID-Model",
        color: "#00f3ff"
    },
    {
        title: "AI Bug Detection",
        description: "Predicts bugs before you write them. It's like Minority Report for spaghetti code. Saves hours of debugging by pointing out your incompetence in real-time.",
        repoUrl: "https://github.com/Dedsecwatch-ally/AI-bug-detection-model",
        color: "#0aff00"
    },
    {
        title: "HBP Model",
        description: "Human Behavior Prediction? Hierarchical Bayesian Prior? Honestly, check the repo. It's complex, it involves tensors, and it probably shouldn't be allowed near the internet.",
        repoUrl: "https://github.com/Dedsecwatch-ally/HBP-Model",
        color: "#ffd700"
    },
    {
        title: "Cookiezz",
        description: "A project so sweet it might give your browser diabetes. Not actually a cookie clicker clone, but a serious tool with a whimsical name. (Probably).",
        repoUrl: "https://github.com/Dedsecwatch-ally/Cookiezz",
        color: "#ff00ff"
    }
];

export default function ProjectGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const pin = gsap.fromTo(sectionRef.current,
                { translateX: 0 },
                {
                    translateX: "-300vw",
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "3000 top",
                        scrub: 0.6,
                        pin: true,
                    }
                }
            );
            return () => {
                pin.kill();
            };
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="overflow-hidden bg-void">
            <div ref={triggerRef} className="">
                <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">

                    {/* Intro Slide */}
                    <div className="w-[100vw] h-full flex flex-col justify-center px-24 border-r border-white/5 bg-void relative z-10">
                        <h2 className="text-8xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-off-white to-gray-600 mb-8">
                            Selected <br /> Works
                        </h2>
                        <p className="font-mono text-neon-blue max-w-md text-xl">
                            &lt;GALLERY_MODE sticky="true" /&gt;
                        </p>
                    </div>

                    {/* Projects */}
                    <div className="w-[300vw] h-full flex items-center px-24 space-x-32 bg-zinc-950/50">
                        {projects.map((p, i) => (
                            <ProjectCard key={i} {...p} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

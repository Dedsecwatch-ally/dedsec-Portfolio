import Scene from './Scene';

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* 3D Scene Background */}
            <div className="absolute inset-0 z-0">
                <Scene />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-4 md:px-6 pointer-events-none">
                <div className="space-y-4">
                    <h2 className="text-neon-blue font-mono text-sm md:text-lg tracking-widest typewriter">
                        SYSTEM.INIT(2023)
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-sans font-bold leading-tight mix-blend-exclusion">
                        Turning Coffee into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">
                            NullPointerExceptions
                        </span>
                    </h1>
                    <p className="max-w-xl text-base md:text-xl text-off-white/80 font-mono mt-4 md:mt-6">
                        I build pixel-perfect frontends and bomb-proof backends.
                        Sometimes I even document my code.
                    </p>
                </div>
            </div>
        </section>
    );
}

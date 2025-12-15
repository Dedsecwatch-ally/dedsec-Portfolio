'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import HoloObject from './HoloObject';
import Background from './Background';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: false, alpha: false }}
        >
            <Suspense fallback={null}>
                <Background />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />
                <pointLight position={[-10, -10, -10]} intensity={1.0} color="#0aff00" />

                <HoloObject />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
                    <Noise opacity={0.05} />
                </EffectComposer>

                {/* OrbitControls for debug ease, remove later or limit */}
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Suspense>
        </Canvas>
    );
}

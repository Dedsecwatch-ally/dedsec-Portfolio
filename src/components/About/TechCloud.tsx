'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
    'Python', 'Java', 'Spring Boot', 'React', 'Node.js',
    'JavaScript', 'HTML', 'TypeScript', 'Jira', 'TestLink',
    'Three.js', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'Linux'
];

function Word({ children, ...props }: { children: string;[key: string]: any }) {
    const ref = useRef<THREE.Mesh>(null);
    const color = new THREE.Color();
    const fontProps = { font: '/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };

    useFrame(({ camera }) => {
        // Make text face camera
        if (ref.current) {
            ref.current.quaternion.copy(camera.quaternion);
        }
    });

    return (
        <Text ref={ref} {...props} {...fontProps} color="#E0E0E0">
            {children}
        </Text>
    );
}

function Cloud({ count = 4, radius = 20 }: { count?: number; radius?: number }) {
    // Create a spherical distribution
    const words = useMemo(() => {
        const temp: [THREE.Vector3, string][] = [];
        const phiSpan = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < skills.length; i++) {
            const y = 1 - (i / (skills.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y
            const theta = phiSpan * i; // golden angle increment
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), skills[i]]);
        }
        return temp;
    }, [radius]);

    return (
        <group rotation={[10, 10, 10]}>
            {words.map(([pos, word], index) => (
                <Word key={index} position={pos}>{word}</Word>
            ))}
        </group>
    );
}

export default function TechCloud() {
    return (
        <div className="h-full w-full min-h-[400px]">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                <fog attach="fog" args={['#050505', 0, 80]} />
                <Cloud count={8} radius={20} />
                <OrbitControls autoRotate enableZoom={false} enablePan={false} autoRotateSpeed={2} />
            </Canvas>
        </div>
    );
}

'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

export default function HoloObject() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            // Basic rotation
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;

            // Mouse interaction
            const { x, y } = state.mouse;
            meshRef.current.rotation.y += x * 0.5;
            meshRef.current.rotation.x -= y * 0.5;
        }
    });

    return (
        <mesh
            ref={meshRef}
            scale={active ? 2.2 : 2}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            position={[2, 0, 0]}
        >
            <icosahedronGeometry args={[1, 15]} />
            {/* 
         Using MeshDistortMaterial for that "fluid/glitch" feel.
         Wireframe is requested, butDistort + Wireframe looks cool.
      */}
            <MeshDistortMaterial
                color={hovered ? "#0aff00" : "#00f3ff"}
                wireframe
                distort={active ? 0.6 : 0.3}
                speed={2}
                roughness={0}
            />
        </mesh>
    );
}

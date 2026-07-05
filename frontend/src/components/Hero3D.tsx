"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

const VaultCore = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Cage */}
      <mesh>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          wireframe 
          transparent 
          opacity={0.3} 
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Inner Core */}
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshDistortMaterial 
          color="#0f172a"
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.9} 
          roughness={0.1}
          distort={0.2}
          speed={2}
        />
      </mesh>

      {/* Floating Symbols */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[
          Math.sin((i / 6) * Math.PI * 2) * 3, 
          Math.cos((i / 6) * Math.PI * 2) * 1.5, 
          Math.cos((i / 6) * Math.PI * 2) * 3
        ]}>
          <Text
            fontSize={0.5}
            color="#00f0ff"
            anchorX="center"
            anchorY="middle"
          >
            {['1', '0', 'A', 'Z', '%', '$'][i]}
          </Text>
        </mesh>
      ))}
    </group>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050510']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <VaultCore />
        </Float>
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

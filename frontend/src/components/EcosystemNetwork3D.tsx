"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

const NetworkGraph = () => {
  const groupRef = useRef<THREE.Group>(null);

  const algorithms = [
    { id: 'aes', name: 'AES-256', color: '#00E5FF' },
    { id: 'rsa', name: 'RSA-2048', color: '#00E5FF' },
    { id: 'caesar', name: 'Caesar', color: '#3B82F6' },
    { id: 'vigenere', name: 'Vigenère', color: '#3B82F6' },
    { id: 'hill', name: 'Hill', color: '#94A3B8' },
    { id: 'playfair', name: 'Playfair', color: '#94A3B8' },
    { id: 'railfence', name: 'Rail Fence', color: '#94A3B8' },
    { id: 'affine', name: 'Affine', color: '#94A3B8' },
  ];

  const nodePositions = useMemo(() => {
    return algorithms.map((_, i) => {
      const angle = (i / algorithms.length) * Math.PI * 2;
      const radius = 4;
      return new THREE.Vector3(
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 2,
        Math.cos(angle) * radius
      );
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Node */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#00E5FF" wireframe />
      </mesh>
      <Text position={[0, -1.5, 0]} fontSize={0.3} color="#FFFFFF" font="/fonts/SpaceGrotesk-Bold.ttf" anchorX="center" anchorY="middle">
        CryptoForge Engine
      </Text>

      {/* Connection Lines & Orbiting Nodes */}
      {algorithms.map((algo, i) => (
        <group key={algo.id}>
          <Line
            points={[[0, 0, 0], [nodePositions[i].x, nodePositions[i].y, nodePositions[i].z]]}
            color={algo.color}
            lineWidth={1}
            transparent
            opacity={0.3}
          />
          <mesh position={[nodePositions[i].x, nodePositions[i].y, nodePositions[i].z]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={algo.color} emissive={algo.color} emissiveIntensity={0.5} />
          </mesh>
          <Text
            position={[nodePositions[i].x, nodePositions[i].y + 0.5, nodePositions[i].z]}
            fontSize={0.25}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            {algo.name}
          </Text>
        </group>
      ))}
    </group>
  );
};

export const EcosystemNetwork3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#00E5FF" />
        
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <NetworkGraph />
        </Float>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

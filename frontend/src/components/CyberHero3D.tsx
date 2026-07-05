"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Environment, Text, Ring } from '@react-three/drei';
import * as THREE from 'three';

const CryptographicCore = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Outer rings refs
  const aesRingRef = useRef<THREE.Mesh>(null);
  const rsaRingRef = useRef<THREE.Mesh>(null);
  const shaRingRef = useRef<THREE.Mesh>(null);

  // Data stream refs
  const dataStream1 = useRef<THREE.Group>(null);
  const dataStream2 = useRef<THREE.Group>(null);
  const dataStream3 = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }

    // Spin Rings
    if (aesRingRef.current) aesRingRef.current.rotation.z = t * 0.5;
    if (rsaRingRef.current) rsaRingRef.current.rotation.x = t * -0.3;
    if (shaRingRef.current) shaRingRef.current.rotation.y = t * 0.4;

    // Orbit Data Streams
    if (dataStream1.current) {
      dataStream1.current.position.x = Math.sin(t * 1.2) * 4;
      dataStream1.current.position.z = Math.cos(t * 1.2) * 4;
    }
    if (dataStream2.current) {
      dataStream2.current.position.y = Math.sin(t * 0.8) * 4.5;
      dataStream2.current.position.z = Math.cos(t * 0.8) * 4.5;
    }
    if (dataStream3.current) {
      dataStream3.current.position.x = Math.sin(t * 1.5 + Math.PI) * 3.5;
      dataStream3.current.position.y = Math.cos(t * 1.5 + Math.PI) * 3.5;
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* 1. CORE ENERGY SPHERE */}
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial 
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={2}
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8} 
          roughness={0.1}
          distort={0.4}
          speed={4}
        />
      </mesh>

      {/* 2. AES-256 RING */}
      <mesh ref={aesRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={1.5} wireframe />
        <Text position={[0, 2.7, 0]} fontSize={0.2} color="#00E5FF" anchorX="center" anchorY="middle">
          AES-256-GCM
        </Text>
      </mesh>

      {/* 3. RSA-2048 RING */}
      <mesh ref={rsaRingRef} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.3} />
        <Text position={[3.7, 0, 0]} fontSize={0.2} color="#FFFFFF" anchorX="center" anchorY="middle" rotation={[0, -Math.PI / 4, 0]}>
          RSA-2048 ASYMMETRIC
        </Text>
      </mesh>

      {/* 4. SHA-256 RING */}
      <mesh ref={shaRingRef} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[4.5, 0.03, 16, 100]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.5} transparent opacity={0.5} />
        <Text position={[0, -4.7, 0]} fontSize={0.2} color="#3B82F6" anchorX="center" anchorY="middle">
          SHA-256 HASH
        </Text>
      </mesh>

      {/* 5. DATA STREAMS */}
      <group ref={dataStream1}>
        <Text fontSize={0.3} color="#FFFFFF" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#00E5FF">
          "HELLO"
        </Text>
      </group>

      <group ref={dataStream2}>
        <Text fontSize={0.2} color="#3B82F6" anchorX="center" anchorY="middle" font="/fonts/SpaceGrotesk-Bold.ttf">
          01001000 01000101
        </Text>
      </group>

      <group ref={dataStream3}>
        <Text fontSize={0.25} color="#FF0055" anchorX="center" anchorY="middle" outlineWidth={0.01} outlineColor="#FF0055">
          b7f8e9a2c4...
        </Text>
      </group>

      {/* 6. BINARY PARTICLES BACKGROUND */}
      {[...Array(30)].map((_, i) => (
        <Text
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10 - 5
          ]}
          fontSize={0.2 + Math.random() * 0.3}
          color={Math.random() > 0.5 ? "#00E5FF" : "#3B82F6"}
          transparent
          opacity={0.3 + Math.random() * 0.5}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </Text>
      ))}

    </group>
  );
};

export const CyberHero3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={['#030712']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00E5FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3B82F6" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#00E5FF" distance={10} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <CryptographicCore />
        </Float>
        
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={1} fade speed={1} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

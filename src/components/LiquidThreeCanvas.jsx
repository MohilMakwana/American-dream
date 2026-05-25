import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function LiquidMesh() {
  const meshRef = useRef();

  // Grid size
  const grid = 32;
  // const count = grid * grid;

  // Set up vertex positions
  const [positions, indices] = useMemo(() => {
    const pos = [];
    const ind = [];
    const size = 15;

    for (let i = 0; i < grid; i++) {
      const y = (i / (grid - 1) - 0.5) * size;
      for (let j = 0; j < grid; j++) {
        const x = (j / (grid - 1) - 0.5) * size;
        pos.push(x, y, 0);
      }
    }

    for (let i = 0; i < grid - 1; i++) {
      for (let j = 0; j < grid - 1; j++) {
        const a = i * grid + j;
        const b = i * grid + j + 1;
        const c = (i + 1) * grid + j;
        const d = (i + 1) * grid + j + 1;

        ind.push(a, c, b);
        ind.push(b, c, d);
      }
    }

    return [new Float32Array(pos), new Uint16Array(ind)];
  }, []);

  const geomRef = useRef();

  useFrame((state) => {
    if (!geomRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = geomRef.current.attributes.position;

    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        const idx = i * grid + j;
        const x = posAttr.getX(idx);
        const y = posAttr.getY(idx);

        // Liquid displacement wave equation
        const z = Math.sin(x * 0.45 + time * 0.8) * Math.cos(y * 0.45 + time * 0.6) * 0.4
          + Math.sin(Math.sqrt(x * x + y * y) * 0.3 - time * 0.5) * 0.25;

        posAttr.setZ(idx, z);
      }
    }

    posAttr.needsUpdate = true;
    geomRef.current.computeVertexNormals();

    // Slow orbital rotation
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -2, -3]}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          args={[indices, 1]}
          count={indices.length}
          array={indices}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        color="#c9a96e"
        emissive="#382512"
        roughness={0.15}
        metalness={0.92}
        wireframe
        transparent
        opacity={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
// Particle data generated once at module load — stable across remounts
const PARTICLE_COUNT = 180;
const _particlePos = new Float32Array(PARTICLE_COUNT * 3);
const _particleSpeeds = new Float32Array(PARTICLE_COUNT);
for (let _i = 0; _i < PARTICLE_COUNT; _i++) {
  _particlePos[_i * 3] = (Math.random() - 0.5) * 14;
  _particlePos[_i * 3 + 1] = (Math.random() - 0.5) * 8;
  _particlePos[_i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
  _particleSpeeds[_i] = 0.1 + Math.random() * 0.2;
}

function FloatingParticles() {
  const pointsRef = useRef();
  const count = PARTICLE_COUNT;
  const positions = _particlePos;
  const speeds = _particleSpeeds;

  const geomRef = useRef();

  useFrame((state) => {
    if (!geomRef.current) return;
    const posAttr = geomRef.current.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      y += speeds[i] * 0.02;

      // Reset at top
      if (y > 4) {
        y = -4;
        posAttr.setX(i, (Math.random() - 0.5) * 14);
      }

      posAttr.setY(i, y);
      // Soft drift on X
      const x = posAttr.getX(i);
      posAttr.setX(i, x + Math.sin(time * 0.5 + i) * 0.002);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e8d5a3"
        size={0.035}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export function LiquidThreeCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: '#030307',
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        <color attach="background" args={['#030307']} />

        {/* Ambient mist fog */}
        <fog attach="fog" args={['#030307', 4, 10]} />

        <ambientLight intensity={0.15} />

        <pointLight
          position={[4, 5, 4]}
          intensity={1.2}
          color="#c9a96e" // Liquid gold specular glow
        />

        <pointLight
          position={[-6, -4, 2]}
          intensity={0.65}
          color="#4a7fd4" // Cyberpunk blue mood accent
        />

        <LiquidMesh />

        <FloatingParticles />
      </Canvas>
    </div>
  );
}

export default LiquidThreeCanvas;

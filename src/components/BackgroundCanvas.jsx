import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// Configuration maps for active sections
const SECTION_THEMES = {
  Hero: {
    waveColor: '#050508', // Deep obsidian
    waveHeight: 0.35,
    waveSpeed: 0.45,
    light1: '#ffffff', // Pure White specular
    light2: '#8e8e93', // Silver Gray
    light3: '#2c2c2e', // Charcoal
    lightIntensity1: 4.5,
    lightIntensity2: 3.0,
    shapes: {
      torus: { pos: [2.2, 1.2, 0.5], rot: [0.3, 0.5, 0], scale: 1 },
      sphere: { pos: [-2.4, -0.8, 1.0], rot: [0, 0, 0], scale: 1 },
      cylinder: { pos: [0.4, -0.6, -1.0], rot: [0.5, 0, 0.5], scale: 1 },
      octahedron: { pos: [-1.5, 1.5, -0.5], rot: [0.2, 0.1, 0.5], scale: 1 }
    }
  },
  Scale: {
    waveColor: '#07070a',
    waveHeight: 0.5,
    waveSpeed: 0.65,
    light1: '#ffffff',
    light2: '#8e8e93',
    light3: '#2c2c2e',
    lightIntensity1: 5.5,
    lightIntensity2: 4.0,
    shapes: {
      torus: { pos: [3.4, 0.8, -1.0], rot: [0.8, 0.2, 0.4], scale: 0.9 },
      sphere: { pos: [-3.4, -1.2, -1.0], rot: [0, 0.5, 0.2], scale: 0.9 },
      cylinder: { pos: [-2.2, 1.8, -2.0], rot: [0.2, 0.8, 0.1], scale: 0.8 },
      octahedron: { pos: [2.2, -1.6, -2.0], rot: [0.5, 0.5, 0.5], scale: 0.9 }
    }
  },
  Retail: {
    waveColor: '#050508',
    waveHeight: 0.3,
    waveSpeed: 0.35,
    light1: '#ffffff',
    light2: '#aeaea3', // Soft silver
    light3: '#1c1c1e',
    lightIntensity1: 4.0,
    lightIntensity2: 3.5,
    shapes: {
      torus: { pos: [2.6, 1.4, 0.2], rot: [0.2, 1.2, 0], scale: 0.95 },
      sphere: { pos: [2.0, -1.2, 0.5], rot: [0, 0.2, 0.8], scale: 0.85 },
      cylinder: { pos: [3.2, 0.1, -0.5], rot: [0.8, 0, 0.2], scale: 0.9 },
      octahedron: { pos: [2.4, -0.5, 0.8], rot: [0.1, 0.6, 0.9], scale: 0.95 }
    }
  },
  Luxury: {
    waveColor: '#08080b',
    waveHeight: 0.2,
    waveSpeed: 0.2,
    light1: '#ffffff',
    light2: '#d1d1d6',
    light3: '#3a3a3c',
    lightIntensity1: 5.0,
    lightIntensity2: 3.0,
    shapes: {
      torus: { pos: [-2.4, 1.5, -0.5], rot: [0.1, 0.3, 0.5], scale: 1.05 },
      sphere: { pos: [2.4, -1.5, -0.5], rot: [0.3, 0.3, 0.3], scale: 0.95 },
      cylinder: { pos: [0.0, 1.8, -1.5], rot: [0.1, 0.1, 0.8], scale: 0.9 },
      octahedron: { pos: [-0.6, -1.6, -1.0], rot: [0.6, 0.3, 0.1], scale: 1.0 }
    }
  },
  Entertainment: {
    waveColor: '#040406',
    waveHeight: 0.55,
    waveSpeed: 0.85,
    light1: '#ffffff',
    light2: '#8e8e93',
    light3: '#1c1c1e',
    lightIntensity1: 6.0,
    lightIntensity2: 5.0,
    shapes: {
      torus: { pos: [1.8, 0.8, 0.8], rot: [1.5, 1.2, 0.5], scale: 1.0 },
      sphere: { pos: [-1.8, -0.8, 0.8], rot: [0.5, 0.5, 1.5], scale: 1.0 },
      cylinder: { pos: [-1.0, 1.2, 0.0], rot: [1.2, 0.5, 0.5], scale: 0.9 },
      octahedron: { pos: [1.0, -1.2, 0.0], rot: [0.5, 1.2, 1.2], scale: 1.0 }
    }
  },
  Events: {
    waveColor: '#060608',
    waveHeight: 0.3,
    waveSpeed: 0.45,
    light1: '#ffffff',
    light2: '#aeaea3',
    light3: '#2c2c2e',
    lightIntensity1: 5.0,
    lightIntensity2: 4.5,
    shapes: {
      torus: { pos: [2.5, 1.8, -3.0], rot: [0.2, 0.2, 0.2], scale: 0.75 },
      sphere: { pos: [-2.5, -1.8, -3.0], rot: [0.2, 0.2, 0.2], scale: 0.75 },
      cylinder: { pos: [-1.8, 1.8, -4.0], rot: [0.2, 0.2, 0.2], scale: 0.7 },
      octahedron: { pos: [1.8, -1.8, -4.0], rot: [0.2, 0.2, 0.2], scale: 0.75 }
    }
  },
  Venues: {
    waveColor: '#050508',
    waveHeight: 0.4,
    waveSpeed: 0.5,
    light1: '#ffffff',
    light2: '#8e8e93',
    light3: '#1c1c1e',
    lightIntensity1: 4.5,
    lightIntensity2: 4.0,
    shapes: {
      torus: { pos: [-2.5, 0.8, 0.0], rot: [0.5, 0.2, 0.8], scale: 1.0 },
      sphere: { pos: [2.5, -0.8, 0.0], rot: [0.2, 0.8, 0.5], scale: 1.0 },
      cylinder: { pos: [0.0, 1.2, -0.5], rot: [0.9, 0.1, 0.2], scale: 0.9 },
      octahedron: { pos: [-1.0, -1.2, -1.0], rot: [0.4, 0.6, 0.9], scale: 0.95 }
    }
  },
  Suite: {
    waveColor: '#06060a',
    waveHeight: 0.38,
    waveSpeed: 0.4,
    light1: '#ffffff',
    light2: '#d1d1d6',
    light3: '#2c2c2e',
    lightIntensity1: 5.0,
    lightIntensity2: 3.5,
    shapes: {
      torus: { pos: [0, 1.0, -0.8], rot: [0.4, 0.6, 0.2], scale: 1.1 },
      sphere: { pos: [-2.2, -0.6, 0.4], rot: [0.2, 0.3, 0.4], scale: 0.9 },
      cylinder: { pos: [2.2, -0.4, 0.2], rot: [0.3, 0.5, 0.3], scale: 0.85 },
      octahedron: { pos: [0.8, -1.2, -0.6], rot: [0.5, 0.2, 0.6], scale: 1.0 }
    }
  }
};

/** Shared normalized pointer from window (canvas has pointer-events: none) */
export const globalPointer = { x: 0, y: 0 };

// 1. 3D Liquid Wave Plane Component
function LiquidWaveMesh({ activeSection }) {
  const meshRef = useRef();
  const geomRef = useRef();
  const materialRef = useRef();

  const grid = 40;
  const size = 18;

  // Create vertex coordinate grid
  const [positions, indices] = useMemo(() => {
    const pos = [];
    const ind = [];

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

  // Sync color & height with GSAP transitions on activeSection change
  useEffect(() => {
    if (!materialRef.current) return;
    const theme = SECTION_THEMES[activeSection] || SECTION_THEMES.Hero;

    gsap.to(materialRef.current.color, {
      r: new THREE.Color(theme.waveColor).r,
      g: new THREE.Color(theme.waveColor).g,
      b: new THREE.Color(theme.waveColor).b,
      duration: 1.5,
      ease: 'power2.out'
    });
  }, [activeSection]);

  useFrame((state) => {
    if (!geomRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = geomRef.current.attributes.position;

    const theme = SECTION_THEMES[activeSection] || SECTION_THEMES.Hero;
    const height = theme.waveHeight;
    const speed = theme.waveSpeed;

    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        const idx = i * grid + j;
        const x = posAttr.getX(idx);
        const y = posAttr.getY(idx);

        // Dynamic liquid wave equations
        const z = Math.sin(x * 0.35 + time * speed) * Math.cos(y * 0.35 + time * speed * 0.8) * height
          + Math.sin(Math.sqrt(x * x + y * y) * 0.2 - time * speed * 0.6) * (height * 0.6);

        posAttr.setZ(idx, z);
      }
    }

    posAttr.needsUpdate = true;
    geomRef.current.computeVertexNormals();

    // Mouse tilt parallax
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2.6 + state.pointer.y * 0.04;
      meshRef.current.rotation.y = state.pointer.x * 0.04;
    }
  });

  const initialTheme = SECTION_THEMES[activeSection] || SECTION_THEMES.Hero;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -1.8, -1.5]}>
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
        ref={materialRef}
        color={initialTheme.waveColor}
        emissive="#1a1a22"
        emissiveIntensity={0.35}
        roughness={0.12}
        metalness={0.98}
        flatShading={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 2. 3D Glassmorphic Morphing Shapes Component
function FloatingGlassShapes({ activeSection }) {
  const torusRef = useRef();
  const sphereRef = useRef();
  const cylinderRef = useRef();
  const octahedronRef = useRef();

  // Smooth layout morphing via GSAP when section changes
  useEffect(() => {
    const theme = SECTION_THEMES[activeSection] || SECTION_THEMES.Hero;
    const duration = 1.8;
    const ease = 'power3.inOut';

    if (torusRef.current) {
      gsap.to(torusRef.current.position, {
        x: theme.shapes.torus.pos[0],
        y: theme.shapes.torus.pos[1],
        z: theme.shapes.torus.pos[2],
        duration, ease
      });
      gsap.to(torusRef.current.scale, {
        x: theme.shapes.torus.scale,
        y: theme.shapes.torus.scale,
        z: theme.shapes.torus.scale,
        duration, ease
      });
    }

    if (sphereRef.current) {
      gsap.to(sphereRef.current.position, {
        x: theme.shapes.sphere.pos[0],
        y: theme.shapes.sphere.pos[1],
        z: theme.shapes.sphere.pos[2],
        duration, ease
      });
      gsap.to(sphereRef.current.scale, {
        x: theme.shapes.sphere.scale,
        y: theme.shapes.sphere.scale,
        z: theme.shapes.sphere.scale,
        duration, ease
      });
    }

    if (cylinderRef.current) {
      gsap.to(cylinderRef.current.position, {
        x: theme.shapes.cylinder.pos[0],
        y: theme.shapes.cylinder.pos[1],
        z: theme.shapes.cylinder.pos[2],
        duration, ease
      });
      gsap.to(cylinderRef.current.scale, {
        x: theme.shapes.cylinder.scale,
        y: theme.shapes.cylinder.scale,
        z: theme.shapes.cylinder.scale,
        duration, ease
      });
    }

    if (octahedronRef.current) {
      gsap.to(octahedronRef.current.position, {
        x: theme.shapes.octahedron.pos[0],
        y: theme.shapes.octahedron.pos[1],
        z: theme.shapes.octahedron.pos[2],
        duration, ease
      });
      gsap.to(octahedronRef.current.scale, {
        x: theme.shapes.octahedron.scale,
        y: theme.shapes.octahedron.scale,
        z: theme.shapes.octahedron.scale,
        duration, ease
      });
    }
  }, [activeSection]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    const isEntertainment = activeSection === 'Entertainment';
    const isLuxury = activeSection === 'Luxury';

    // Auto-rotation speeds matching the theme mood
    const rotSpeed = isEntertainment ? 0.45 : isLuxury ? 0.08 : 0.16;

    // Apply smooth floating oscillations and mouse lag tracking
    if (torusRef.current) {
      // Rotate
      torusRef.current.rotation.x += rotSpeed * 0.03 + py * 0.002;
      torusRef.current.rotation.y += rotSpeed * 0.02 + px * 0.002;
      // Hover offset
      torusRef.current.position.y += Math.sin(time * 0.4) * 0.0015;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y += rotSpeed * 0.025;
      sphereRef.current.position.y += Math.cos(time * 0.5) * 0.0012;
    }

    if (cylinderRef.current) {
      cylinderRef.current.rotation.x += rotSpeed * 0.02;
      cylinderRef.current.rotation.z += rotSpeed * 0.015;
      cylinderRef.current.position.y += Math.sin(time * 0.3) * 0.001;
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.x += rotSpeed * 0.035;
      octahedronRef.current.rotation.y += rotSpeed * 0.015;
      octahedronRef.current.position.y += Math.cos(time * 0.4) * 0.0016;
    }
  });

  const initialTheme = SECTION_THEMES[activeSection] || SECTION_THEMES.Hero;

  // Render frosted glassmorphic shapes with high physical properties
  return (
    <group>
      {/* 1. Frosted Glass Torus */}
      <mesh ref={torusRef} position={initialTheme.shapes.torus.pos} scale={initialTheme.shapes.torus.scale}>
        <torusGeometry args={[0.7, 0.22, 20, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.92}
          roughness={0.12}
          thickness={1.8}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 2. Frosted Glass Sphere */}
      <mesh ref={sphereRef} position={initialTheme.shapes.sphere.pos} scale={initialTheme.shapes.sphere.scale}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          roughness={0.15}
          thickness={2.4}
          ior={1.54}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 3. Frosted Glass Cylinder */}
      <mesh ref={cylinderRef} position={initialTheme.shapes.cylinder.pos} scale={initialTheme.shapes.cylinder.scale}>
        <cylinderGeometry args={[0.38, 0.38, 1.0, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.94}
          roughness={0.1}
          thickness={1.4}
          ior={1.46}
          clearcoat={0.9}
          clearcoatRoughness={0.02}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 4. Frosted Glass Octahedron (Diamond-like style) */}
      <mesh ref={octahedronRef} position={initialTheme.shapes.octahedron.pos} scale={initialTheme.shapes.octahedron.scale}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.92}
          roughness={0.08}
          thickness={2.0}
          ior={1.58} // high reflection
          clearcoat={1.0}
          clearcoatRoughness={0.01}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

// 3. Cinematic cursor field — soft spotlight + silver rings (replaces dot particles)
function CursorCinematicField({ activeSection }) {
  const lightRef = useRef();
  const ringRef = useRef();
  const haloRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const lerp = activeSection === 'Entertainment' ? 0.07 : 0.05;
    target.current.x += (globalPointer.x * 2.4 - target.current.x) * lerp;
    target.current.y += (globalPointer.y * 1.6 - target.current.y) * lerp;
    const { x, y } = target.current;
    const t = state.clock.getElapsedTime();

    if (lightRef.current) {
      lightRef.current.position.set(x, y, 1.4);
      lightRef.current.intensity = 1.8 + Math.sin(t * 0.6) * 0.35;
    }
    if (ringRef.current) {
      ringRef.current.position.set(x * 0.92, y * 0.92, 0.6);
      ringRef.current.rotation.z = t * 0.35 + globalPointer.x * 0.4;
      const pulse = 1 + Math.sin(t * 0.9) * 0.06;
      ringRef.current.scale.setScalar(pulse);
    }
    if (haloRef.current) {
      haloRef.current.position.set(x * 0.7, y * 0.7, -0.2);
      haloRef.current.rotation.x = Math.PI / 2.15;
      haloRef.current.rotation.z = t * 0.18;
    }
  });

  return (
    <group>
      <pointLight ref={lightRef} color="#ffffff" distance={11} decay={2} />
      <mesh ref={ringRef}>
        <torusGeometry args={[0.52, 0.014, 16, 64]} />
        <meshBasicMaterial
          color="#f5f5f7"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={haloRef}>
        <ringGeometry args={[0.42, 0.72, 48]} />
        <meshBasicMaterial
          color="#8e8e93"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function HaloRing({ activeSection }) {
  const ringRef = useRef();
  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.x = Math.PI / 2.2;
    ringRef.current.rotation.z = t * 0.12;
    const pulse = 1 + Math.sin(t * 0.8) * 0.04;
    ringRef.current.scale.setScalar(pulse * (activeSection === 'Entertainment' ? 1.08 : 1));
    if (ringRef.current.material) {
      ringRef.current.material.opacity = 0.12 + Math.sin(t * 0.5) * 0.04;
    }
  });
  return (
    <mesh ref={ringRef} position={[0, 0.2, -2.2]}>
      <torusGeometry args={[3.2, 0.02, 16, 128]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.14} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function AmbientOrbs({ activeSection }) {
  const g1 = useRef();
  const g2 = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (g1.current) {
      g1.current.position.x = Math.sin(t * 0.15) * 2.5;
      g1.current.position.y = Math.cos(t * 0.12) * 1.2 + 0.5;
    }
    if (g2.current) {
      g2.current.position.x = Math.cos(t * 0.1) * -2.8;
      g2.current.position.y = Math.sin(t * 0.14) * -1.0;
    }
  });
  const isHero = activeSection === 'Hero';
  return (
    <group>
      <mesh ref={g1} position={[2, 1, -3]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isHero ? 0.04 : 0.025} />
      </mesh>
      <mesh ref={g2} position={[-2.5, -0.5, -4]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#8e8e93" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.08) * 0.15;
    state.camera.position.y = Math.cos(t * 0.06) * 0.08;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// 4. Adaptive Section-Aware Lighting Component
function ReflectiveLights({ activeSection }) {
  const lightGroupRef = useRef();

  const light1Ref = useRef();
  const light2Ref = useRef();
  const light3Ref = useRef();

  // Color & intensity transitions on section shift
  useEffect(() => {
    const theme = SECTION_THEMES[activeSection] || SECTION_THEMES.Hero;
    const duration = 1.5;
    const ease = 'power2.out';

    if (light1Ref.current) {
      gsap.to(light1Ref.current.color, {
        r: new THREE.Color(theme.light1).r,
        g: new THREE.Color(theme.light1).g,
        b: new THREE.Color(theme.light1).b,
        duration, ease
      });
      gsap.to(light1Ref.current, {
        intensity: theme.lightIntensity1,
        duration, ease
      });
    }

    if (light2Ref.current) {
      gsap.to(light2Ref.current.color, {
        r: new THREE.Color(theme.light2).r,
        g: new THREE.Color(theme.light2).g,
        b: new THREE.Color(theme.light2).b,
        duration, ease
      });
      gsap.to(light2Ref.current, {
        intensity: theme.lightIntensity2,
        duration, ease
      });
    }

    if (light3Ref.current) {
      gsap.to(light3Ref.current.color, {
        r: new THREE.Color(theme.light3).r,
        g: new THREE.Color(theme.light3).g,
        b: new THREE.Color(theme.light3).b,
        duration, ease
      });
    }
  }, [activeSection]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lightGroupRef.current) {
      // Ambient rotation of reflective light positions
      lightGroupRef.current.rotation.y = time * 0.05;
      lightGroupRef.current.rotation.z = Math.sin(time * 0.02) * 0.05;
    }
  });

  const initialTheme = SECTION_THEMES[activeSection] || SECTION_THEMES.Hero;

  return (
    <group ref={lightGroupRef}>
      {/* Dynamic Primary Light */}
      <pointLight
        ref={light1Ref}
        position={[6, 5, 4]}
        intensity={initialTheme.lightIntensity1}
        color={initialTheme.light1}
        distance={18}
        decay={1.8}
      />

      {/* Dynamic Secondary Light */}
      <pointLight
        ref={light2Ref}
        position={[-6, 4, 3]}
        intensity={initialTheme.lightIntensity2}
        color={initialTheme.light2}
        distance={14}
        decay={1.8}
      />

      {/* Dynamic Tertiary Accent Light */}
      <pointLight
        ref={light3Ref}
        position={[0, -5, 5]}
        intensity={1.8}
        color={initialTheme.light3}
        distance={12}
        decay={1.8}
      />
    </group>
  );
}

// Main Canvas Wrapper
export function BackgroundCanvas({ activeIndex = 0, activeSection = 'Hero', quality = 'high' }) {
  useEffect(() => {
    const onMove = (e) => {
      globalPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalPointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className="bg-canvas-wrap"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: '#010103',
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5.5], fov: 48 }}
        dpr={quality === 'low' ? [1, 1] : [1, 1.25]}
      >
        <color attach="background" args={['#010103']} />
        {quality === 'high' && <fog attach="fog" args={['#010103', 6, 14]} />}

        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 8, 2]} intensity={0.55} color="#ffffff" />

        {quality === 'high' && <CameraDrift />}
        <ReflectiveLights activeSection={activeSection} />
        {quality === 'high' && <AmbientOrbs activeSection={activeSection} />}
        <LiquidWaveMesh activeSection={activeSection} />
        {quality === 'high' && <HaloRing activeSection={activeSection} />}
        <FloatingGlassShapes activeSection={activeSection} />
      </Canvas>
    </div>
  );
}

export default BackgroundCanvas;

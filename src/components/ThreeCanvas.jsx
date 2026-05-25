import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// Helper for generating grid coordinates for Towers
const TOWER_COUNT = 15;
const gridLayout = [];
for (let i = 0; i < TOWER_COUNT; i++) {
  const row = Math.floor(i / 3) - 2;
  const col = (i % 3) - 1;
  gridLayout.push({ x: col * 1.5, z: row * 1.5 });
}

// 1. Towers Component
function Towers({ activeSection }) {
  const towersRef = useRef([]);
  const groupRef = useRef();

  // Initialize geometries
  useEffect(() => {
    towersRef.current = towersRef.current.slice(0, TOWER_COUNT);
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;

    // Apply GSAP animation based on activeSection
    const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'power2.inOut' } });

    // Global rotation and position
    if (activeSection === 1) {
      // Hero: centered, tall, gold, full brightness
      tl.to(groupRef.current.position, { x: 0, y: -2, z: -2 })
        .to(groupRef.current.rotation, { x: 0.2, y: 0, z: 0 });
    } else if (activeSection === 2) {
      // Scale: left side, shrink, low emissive
      tl.to(groupRef.current.position, { x: -3.5, y: -1.5, z: -3 })
        .to(groupRef.current.rotation, { x: 0.1, y: 0.4, z: 0 });
    } else if (activeSection === 3) {
      // Retail: parallel rows (corridor shape), right side, warm gold
      tl.to(groupRef.current.position, { x: 3.5, y: -2, z: -3 })
        .to(groupRef.current.rotation, { x: 0.15, y: -0.5, z: 0 });
    } else if (activeSection === 4) {
      // Luxury: spread far apart, small, low champagne emissive
      tl.to(groupRef.current.position, { x: 0, y: -1.8, z: -4 })
        .to(groupRef.current.rotation, { x: 0.1, y: 0.2, z: 0 });
    } else if (activeSection === 5) {
      // Entertainment: curve outward in a dome-rib, electric blue
      tl.to(groupRef.current.position, { x: 0, y: -2.2, z: -3 })
        .to(groupRef.current.rotation, { x: 0.3, y: 0, z: 0 });
    } else if (activeSection === 6) {
      // Events: flat stage, 4 tall lighting rigs
      tl.to(groupRef.current.position, { x: 0, y: -2.8, z: -3 })
        .to(groupRef.current.rotation, { x: 0.1, y: 0, z: 0 });
    } else if (activeSection === 7) {
      // Venues: split into three clusters
      tl.to(groupRef.current.position, { x: 0, y: -2, z: -3 })
        .to(groupRef.current.rotation, { x: 0.2, y: 0, z: 0 });
    }

    // Individual Tower Mesh Animations
    towersRef.current.forEach((mesh, idx) => {
      if (!mesh) return;

      const basePos = gridLayout[idx];
      let tx = basePos.x;
      let tz = basePos.z;
      let sx = 0.6;
      let sy = 2.5 + Math.sin(idx * 2) * 1.5;
      let sz = 0.6;
      let color = '#c9a96e'; // gold
      let emissive = '#c9a96e';
      let emissiveIntensity = 0.8;
      let opacity = 0.8;

      if (activeSection === 1) {
        // Hero: centered, tall, gold, full brightness
        tx = basePos.x * 1.2;
        tz = basePos.z * 1.2;
      } else if (activeSection === 2) {
        // Scale: left side, shrink, low emissive
        tx = basePos.x * 0.8;
        tz = basePos.z * 0.8;
        sy *= 0.6;
        color = '#b0c4de'; // light steel blue
        emissive = '#4a7fd4';
        emissiveIntensity = 0.3;
        opacity = 0.5;
      } else if (activeSection === 3) {
        // Retail: corridor shape (two rows)
        const row = Math.floor(idx / 8);
        tx = row === 0 ? -1.2 : 1.2;
        tz = (idx % 8) * 1.2 - 4.5;
        sy = 3 + Math.cos(idx) * 1.5;
        color = '#e8d5a3';
        emissive = '#c9a96e';
        emissiveIntensity = 0.6;
      } else if (activeSection === 4) {
        // Luxury: spaced far apart, scale down small, champagne white
        tx = basePos.x * 2.2;
        tz = basePos.z * 2.2;
        sy = 1.0 + Math.sin(idx) * 0.5;
        color = '#ffffff';
        emissive = '#f5f5f0';
        emissiveIntensity = 0.15;
        opacity = 0.4;
      } else if (activeSection === 5) {
        // Entertainment: dome-rib formation, electric blue, curve outward
        const angle = (idx / TOWER_COUNT) * Math.PI * 2;
        const radius = 2.2;
        tx = Math.cos(angle) * radius;
        tz = Math.sin(angle) * radius;
        sy = 2.0 + Math.sin(idx * 3) * 1.2;
        color = '#4a7fd4';
        emissive = '#4a7fd4';
        emissiveIntensity = 1.0;
        opacity = 0.9;
      } else if (activeSection === 6) {
        // Events: collapse to flat stage floor (scale Y -> 0.05). Four towers stay tall in back.
        const isTall = idx === 0 || idx === 2 || idx === 12 || idx === 14;
        tx = basePos.x * 1.8;
        tz = basePos.z * 1.8;
        sy = isTall ? 4.5 : 0.08;
        sx = isTall ? 0.3 : 1.5;
        sz = isTall ? 0.3 : 1.5;
        color = isTall ? '#8b5cf6' : '#221e3f'; // purple-blue
        emissive = isTall ? '#8b5cf6' : '#110d26';
        emissiveIntensity = isTall ? 1.0 : 0.2;
        opacity = isTall ? 0.9 : 0.6;
      } else if (activeSection === 7) {
        // Venues: split into three distinct clusters across width
        const clusterId = idx % 3; // 0, 1, 2
        const clusterOffset = (clusterId - 1) * 3; // -3, 0, 3
        tx = clusterOffset + (Math.floor(idx / 3) % 2 - 0.5) * 0.8;
        tz = (Math.floor(idx / 3) * 0.8) - 2;
        sy = 2.0 + Math.sin(idx) * 1.0;
        if (clusterId === 0) {
          color = '#c9a96e'; // Gold
          emissive = '#c9a96e';
        } else if (clusterId === 1) {
          color = '#4a7fd4'; // Blue
          emissive = '#4a7fd4';
        } else {
          color = '#8b5cf6'; // Purple
          emissive = '#8b5cf6';
        }
        emissiveIntensity = 0.8;
        opacity = 0.7;
      }

      tl.to(mesh.position, { x: tx, y: sy / 2, z: tz }, 0)
        .to(mesh.scale, { x: sx, y: sy, z: sz }, 0)
        .to(mesh.material, { opacity: opacity }, 0)
        .to(mesh.material.color, {
          r: new THREE.Color(color).r,
          g: new THREE.Color(color).g,
          b: new THREE.Color(color).b
        }, 0)
        .to(mesh.material.emissive, {
          r: new THREE.Color(emissive).r,
          g: new THREE.Color(emissive).g,
          b: new THREE.Color(emissive).b
        }, 0)
        .to(mesh.material, { emissiveIntensity: emissiveIntensity }, 0);
    });

  }, [activeSection]);

  // Slow drift rotation in standard frames
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    if (activeSection === 1) {
      groupRef.current.rotation.y = elapsed * 0.05;
    } else if (activeSection === 2) {
      groupRef.current.rotation.y = 0.4 + Math.sin(elapsed * 0.2) * 0.05;
    } else if (activeSection === 3) {
      groupRef.current.rotation.y = -0.5 + Math.sin(elapsed * 0.1) * 0.03;
    } else if (activeSection === 4) {
      groupRef.current.rotation.y = elapsed * 0.02;
    } else if (activeSection === 5) {
      groupRef.current.rotation.y = elapsed * 0.18; // fast
    } else if (activeSection === 6) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.25) * 0.04;
    } else if (activeSection === 7) {
      groupRef.current.rotation.y = elapsed * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -2]}>
      {gridLayout.map((pos, idx) => (
        <mesh
          key={idx}
          ref={(el) => (towersRef.current[idx] = el)}
          position={[pos.x, 1, pos.z]}
          scale={[0.6, 2, 0.6]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#c9a96e"
            emissive="#c9a96e"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Particle data — generated once at module load, stable across remounts
const _TC_COUNT = 2000;
const _tcPos = new Float32Array(_TC_COUNT * 3);
const _tcSp  = new Float32Array(_TC_COUNT);
const _tcPh  = new Float32Array(_TC_COUNT);
for (let _i = 0; _i < _TC_COUNT; _i++) {
  _tcPos[_i * 3]     = (Math.random() - 0.5) * 15;
  _tcPos[_i * 3 + 1] = (Math.random() - 0.5) * 10;
  _tcPos[_i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
  _tcSp[_i]          = 0.2 + Math.random() * 0.8;
  _tcPh[_i]          = Math.random() * Math.PI * 2;
}

// 2. Particle Field Component
function ParticleField({ activeSection }) {
  const pointsRef = useRef();
  const particlesCount = _TC_COUNT;
  const positions = _tcPos;
  const speeds    = _tcSp;
  const phases    = _tcPh;

  const geomRef = useRef();

  useEffect(() => {
    if (!pointsRef.current) return;

    const mat = pointsRef.current.material;
    const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'power2.inOut' } });

    let color = '#c9a96e'; // gold
    let size = 0.04;
    let opacity = 0.6;

    if (activeSection === 1) {
      color = '#c9a96e'; // gold
      size = 0.05;
      opacity = 0.6;
    } else if (activeSection === 2) {
      color = '#4a7fd4'; // blue
      size = 0.04;
      opacity = 0.7;
    } else if (activeSection === 3) {
      color = '#e8d5a3'; // light gold
      size = 0.045;
      opacity = 0.55;
    } else if (activeSection === 4) {
      // Luxury: disappear completely
      opacity = 0.0;
    } else if (activeSection === 5) {
      // Entertainment: kinetic multi-color bursts
      color = '#f5f5f0'; // bright white base (we'll tint dynamically)
      size = 0.06;
      opacity = 0.8;
    } else if (activeSection === 6) {
      // Events: gold and white pyrotechniccolumn
      color = '#e8d5a3';
      size = 0.05;
      opacity = 0.85;
    } else if (activeSection === 7) {
      color = '#8b5cf6'; // venue purple
      size = 0.04;
      opacity = 0.65;
    }

    tl.to(mat, { opacity: opacity, size: size }, 0)
      .to(mat.color, {
        r: new THREE.Color(color).r,
        g: new THREE.Color(color).g,
        b: new THREE.Color(color).b
      }, 0);

  }, [activeSection]);

  // Frame Loop driving dynamic drift behaviors per section
  useFrame((state) => {
    if (!geomRef.current || !pointsRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    const posArr = geomRef.current.attributes.position.array;

    for (let i = 0; i < particlesCount; i++) {
      const idx = i * 3;
      const speed = speeds[i];
      const phase = phases[i];

      if (activeSection === 1) {
        // Hero: drift upward slowly, medium density
        posArr[idx + 1] += speed * 0.008; // Y movement
        posArr[idx] += Math.sin(elapsed * 0.2 + phase) * 0.002; // soft X wobble
        if (posArr[idx + 1] > 5) posArr[idx + 1] = -5;
      } else if (activeSection === 2) {
        // Scale: spread outward in expanding radial waves from center
        const x = posArr[idx];
        const z = posArr[idx + 2];
        const dist = Math.sqrt(x*x + z*z) || 1;
        posArr[idx] += (x / dist) * speed * 0.012;
        posArr[idx + 2] += (z / dist) * speed * 0.012;
        
        // boundary reset
        if (Math.abs(posArr[idx]) > 9 || Math.abs(posArr[idx+2]) > 9) {
          posArr[idx] = (Math.random() - 0.5) * 2;
          posArr[idx + 2] = (Math.random() - 0.5) * 2 - 2;
        }
        posArr[idx + 1] += Math.sin(elapsed * 0.4 + phase) * 0.002;
      } else if (activeSection === 3) {
        // Retail: two parallel streams flowing left to right
        posArr[idx] += speed * 0.025; // Flow X
        // Force Y close to corridor center rows
        const streamRow = i % 2 === 0 ? -1.0 : 1.0;
        posArr[idx + 1] += (streamRow - posArr[idx + 1]) * 0.03;
        
        if (posArr[idx] > 8) {
          posArr[idx] = -8;
          posArr[idx + 1] = (Math.random() - 0.5) * 3;
        }
      } else if (activeSection === 5) {
        // Entertainment: burst outward in all directions, fast, multi-color particle feel
        posArr[idx] += Math.sin(phase) * speed * 0.04;
        posArr[idx + 1] += Math.cos(phase) * speed * 0.04;
        posArr[idx + 2] += Math.sin(phase * 1.5) * speed * 0.04;
        
        const distSq = posArr[idx]*posArr[idx] + posArr[idx + 1]*posArr[idx + 1] + posArr[idx + 2]*posArr[idx + 2];
        if (distSq > 50) {
          posArr[idx] = (Math.random() - 0.5) * 0.5;
          posArr[idx + 1] = (Math.random() - 0.5) * 0.5;
          posArr[idx + 2] = (Math.random() - 0.5) * 0.5 - 2;
        }
      } else if (activeSection === 6) {
        // Events: shoot upward from bottom center in a tight column (pyro)
        if (Math.abs(posArr[idx]) < 1.0) posArr[idx + 1] += speed * 0.06;
        posArr[idx] += (0 - posArr[idx]) * 0.05; // attract to center column
        posArr[idx + 2] += (-3 - posArr[idx + 2]) * 0.05; // attract to back
        
        if (posArr[idx + 1] > 6) {
          posArr[idx + 1] = -4;
          posArr[idx] = (Math.random() - 0.5) * 0.4;
          posArr[idx + 2] = -3 + (Math.random() - 0.5) * 0.4;
        }
      } else if (activeSection === 7) {
        // Venues: Orbit slowly around three cluster centers (-3, 0, 3)
        const clusterId = i % 3;
        const centerX = (clusterId - 1) * 3;
        const centerY = 0;
        
        const dx = posArr[idx] - centerX;
        const dy = posArr[idx + 1] - centerY;
        
        // Rotational drift around center
        const angle = 0.015 * speed;
        const rx = dx * Math.cos(angle) - dy * Math.sin(angle);
        const ry = dx * Math.sin(angle) + dy * Math.cos(angle);
        
        posArr[idx] = centerX + rx;
        posArr[idx + 1] = centerY + ry;
        posArr[idx + 2] += Math.sin(elapsed * 0.2 + phase) * 0.002;
      }
    }

    geomRef.current.attributes.position.needsUpdate = true;
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
        color="#c9a96e"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3. The Ring Component
function TheRing({ activeSection }) {
  const ringRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    if (!ringRef.current || !materialRef.current) return;

    const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'power2.inOut' } });

    let rx = 0;
    let ry = 0;
    let rz = 0;
    let tx = 0;
    let ty = 0;
    let tz = -3;
    let sx = 1;
    let sy = 1;
    let sz = 1;
    
    let color = '#c9a96e'; // gold
    let opacity = 0.8;
    let emissive = '#c9a96e';
    let emissiveIntensity = 0.5;

    if (activeSection === 1) {
      // Hero: large, centered, facing camera, gold, slow rotation
      rx = 0.2;
      ry = 0;
      rz = 0;
      tx = 0;
      ty = 0.8;
      tz = -2;
      sx = sy = sz = 1.3;
      color = '#c9a96e';
      emissive = '#c9a96e';
      emissiveIntensity = 0.8;
      opacity = 0.8;
    } else if (activeSection === 2) {
      // Scale: tilts 70° on X, nearly horizontal radar ring, scales up, blue, slow pulse
      rx = Math.PI / 2.5; // ~70 deg
      ry = 0.2;
      rz = 0;
      tx = 0;
      ty = -0.5;
      tz = -4;
      sx = sy = sz = 2.2;
      color = '#4a7fd4';
      emissive = '#4a7fd4';
      emissiveIntensity = 0.5;
      opacity = 0.7;
    } else if (activeSection === 3) {
      // Retail: exits (scale -> 0, opacity -> 0)
      sx = sy = sz = 0.001;
      opacity = 0.0;
    } else if (activeSection === 4) {
      // Luxury: small (radius 8, scaled down), centered, champagne white, barely glowing
      rx = 0.4;
      ry = 0.1;
      rz = 0.2;
      tx = 0;
      ty = 0.3;
      tz = -2.5;
      sx = sy = sz = 0.6; // represent radius 8 by scaling down
      color = '#f5f5f0';
      emissive = '#ffffff';
      emissiveIntensity = 0.2;
      opacity = 0.9;
    } else if (activeSection === 5) {
      // Entertainment: tilted 40°, electric blue, large, fast rotation (suggests dome)
      rx = Math.PI / 4.5; // ~40 deg
      ry = 0.5;
      rz = 0;
      tx = 0;
      ty = 0.5;
      tz = -3.5;
      sx = sy = sz = 1.8; // larger radius
      color = '#4a7fd4';
      emissive = '#4a7fd4';
      emissiveIntensity = 1.0;
      opacity = 0.85;
    } else if (activeSection === 6) {
      // Events: disappears
      sx = sy = sz = 0.001;
      opacity = 0.0;
    } else if (activeSection === 7) {
      // Venues: disappears
      sx = sy = sz = 0.001;
      opacity = 0.0;
    }

    tl.to(ringRef.current.position, { x: tx, y: ty, z: tz }, 0)
      .to(ringRef.current.rotation, { x: rx, y: ry, z: rz }, 0)
      .to(ringRef.current.scale, { x: sx, y: sy, z: sz }, 0)
      .to(materialRef.current, { opacity: opacity }, 0)
      .to(materialRef.current.color, {
        r: new THREE.Color(color).r,
        g: new THREE.Color(color).g,
        b: new THREE.Color(color).b
      }, 0)
      .to(materialRef.current.emissive, {
        r: new THREE.Color(emissive).r,
        g: new THREE.Color(emissive).g,
        b: new THREE.Color(emissive).b
      }, 0)
      .to(materialRef.current, { emissiveIntensity: emissiveIntensity }, 0);

  }, [activeSection]);

  // Smooth local rotations and pulses per frame
  useFrame((state) => {
    if (!ringRef.current) return;
    const elapsed = state.clock.getElapsedTime();

    if (activeSection === 1) {
      ringRef.current.rotation.y = elapsed * 0.12;
    } else if (activeSection === 2) {
      ringRef.current.rotation.y = elapsed * 0.04;
      // Pulse scale softly
      const pulse = 2.2 + Math.sin(elapsed * 1.5) * 0.1;
      ringRef.current.scale.set(pulse, pulse, pulse);
    } else if (activeSection === 4) {
      ringRef.current.rotation.y = elapsed * 0.02; // extremely slow
    } else if (activeSection === 5) {
      ringRef.current.rotation.y = elapsed * 0.35; // fast kinetic spin
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -3]}>
      <torusGeometry args={[1.5, 0.03, 16, 100]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#c9a96e"
        emissive="#c9a96e"
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// 4. Main Exported Canvas Wrapper
export function ThreeCanvas({ activeSection }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: '#07070f',
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <color attach="background" args={['#07070f']} />
        
        {/* Lights */}
        <ambientLight intensity={0.1} />
        
        <pointLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#c9a96e" // warm gold light
        />
        
        <pointLight
          position={[-5, -5, 2]}
          intensity={1.0}
          color="#4a7fd4" // cool blue light
        />

        <Towers activeSection={activeSection} />
        
        <ParticleField activeSection={activeSection} />
        
        <TheRing activeSection={activeSection} />

        {/* Prevent orbit interaction if pointerEvents:none, but keep for fallback debug */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}

export default ThreeCanvas;

"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function Portal() {
  const portalRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#00f0ff") },
        uColor2: { value: new THREE.Color("#a855f7") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        void main() {
          vUv = uv;
          vPosition = position;
          vec3 pos = position;
          float wave = sin(pos.x * 4.0 + uTime * 2.0) * cos(pos.y * 4.0 + uTime * 1.5) * 0.15;
          pos.z += wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float glow = 1.0 - smoothstep(0.0, 1.0, dist);
          float pulse = sin(uTime * 2.0) * 0.15 + 0.85;
          vec3 color = mix(uColor1, uColor2, sin(uTime * 0.5 + vUv.y * 4.0) * 0.5 + 0.5);
          float swirl = sin(atan(vUv.y - 0.5, vUv.x - 0.5) * 3.0 + uTime * 1.5) * 0.5 + 0.5;
          color = mix(color, color * 1.3, swirl * 0.3);
          float alpha = glow * pulse * (0.5 + swirl * 0.3);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
    if (portalRef.current) {
      portalRef.current.rotation.z = t * 0.15;
    }
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = t * (0.3 + i * 0.15) * (i % 2 === 0 ? 1 : -1);
      }
    });
  });

  return (
    <group ref={portalRef} position={[0, 1.5, -2]}>
      {/* Rings */}
      {[2.2, 1.8, 1.4].map((r, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringRefs.current[i] = el; }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[r, 0.06 + i * 0.02, 32, 100]} />
          <meshStandardMaterial
            color={["#a855f7", "#00f0ff", "#ff006e"][i]}
            emissive={["#a855f7", "#00f0ff", "#ff006e"][i]}
            emissiveIntensity={2 + i}
          />
        </mesh>
      ))}

      {/* Portal surface */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.3, 64]} />
        <shaderMaterial ref={materialRef} {...shaderData} transparent side={THREE.DoubleSide} />
      </mesh>

      <Sparkles count={100} scale={6} size={4} speed={2} color="#00f0ff" opacity={0.6} />
    </group>
  );
}

function FloatingIsland() {
  const islandRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.position.y = -3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const trees = useMemo(() => [
    { pos: [-2.5, 3.6, -1] as [number, number, number], scale: 1 },
    { pos: [2, 3.3, 0.5] as [number, number, number], scale: 0.8 },
    { pos: [0, 3.9, -2] as [number, number, number], scale: 1.1 },
    { pos: [-1.2, 3.4, 2] as [number, number, number], scale: 0.7 },
    { pos: [1.8, 3.6, -1.5] as [number, number, number], scale: 0.9 },
    { pos: [-3, 3.2, 0] as [number, number, number], scale: 0.6 },
    { pos: [3, 3.5, -0.5] as [number, number, number], scale: 0.85 },
  ], []);

  return (
    <group ref={islandRef} position={[0, -3, 0]}>
      {/* Main body */}
      <mesh>
        <dodecahedronGeometry args={[4, 2]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Grass layer */}
      <mesh position={[0, 2.5, 0]} scale={[1.3, 0.35, 1.3]}>
        <cylinderGeometry args={[3.5, 4, 1, 32]} />
        <meshStandardMaterial color="#1a3a1a" roughness={0.9} />
      </mesh>

      {/* Mossy rocks */}
      {[[-3, 2.8, 2], [3.5, 2.7, -1], [-1, 3, 3]].map((pos, i) => (
        <mesh key={`rock-${i}`} position={pos as [number, number, number]}>
          <dodecahedronGeometry args={[0.4 + i * 0.1, 0]} />
          <meshStandardMaterial color="#2a2a3a" roughness={0.8} />
        </mesh>
      ))}

      {/* Trees */}
      {trees.map((tree, i) => (
        <group key={i} position={tree.pos} scale={tree.scale}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.06, 0.1, 1.8, 8]} />
            <meshStandardMaterial color="#3d2b1f" />
          </mesh>
          <mesh position={[0, 2, 0]}>
            <coneGeometry args={[0.9, 1.8, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#2d5a27" : "#1a4a1a"} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <coneGeometry args={[0.6, 1.2, 8]} />
            <meshStandardMaterial color="#3a7a2a" />
          </mesh>
        </group>
      ))}

      {/* Waterfall particles */}
      <WaterfallParticles />

      <Sparkles count={150} scale={[10, 5, 10]} size={1.5} speed={0.3} color="#4ade80" opacity={0.4} />
    </group>
  );
}

function WaterfallParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 3.5 + (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = Math.random() * 5 + 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      vel[i] = 0.015 + Math.random() * 0.025;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] -= velocities[i];
      if (posArr[i * 3 + 1] < -2) {
        posArr[i * 3 + 1] = 7;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#88ccff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 1.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2 + mouse.current.y * 0.8, 0.02);
    camera.lookAt(0, 1, 0);
  });

  return null;
}

function FloatingDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 15 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.002;
      posArr[i * 3] += Math.cos(t * 0.3 + i * 0.5) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a855f7" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 55 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.12} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffe4c4" />
        <pointLight position={[-4, 5, 3]} intensity={1} color="#00f0ff" distance={20} />
        <pointLight position={[4, 5, -3]} intensity={0.8} color="#a855f7" distance={20} />
        <pointLight position={[0, -2, 0]} intensity={0.4} color="#ff006e" distance={15} />
        <color attach="background" args={["#050510"]} />
        <fog attach="fog" args={["#050510", 12, 35]} />

        <Stars radius={60} depth={60} count={4000} factor={4} saturation={0} fade speed={0.8} />

        <Float speed={0.4} rotationIntensity={0.08} floatIntensity={0.25}>
          <FloatingIsland />
        </Float>

        <Portal />
        <FloatingDust />

        <Sparkles count={300} scale={25} size={2.5} speed={0.4} color="#a855f7" opacity={0.25} />
        <Sparkles count={100} scale={15} size={1.5} speed={0.6} color="#00f0ff" opacity={0.2} />

        <CameraRig />

        <EffectComposer multisampling={4}>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette darkness={0.6} offset={0.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, TorusKnot } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.8}>
      <Icosahedron ref={ref} args={[1.4, 5]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7e22ce"
          emissiveIntensity={0.4}
          distort={0.45}
          speed={2}
          roughness={0.15}
          metalness={0.8}
        />
      </Icosahedron>
    </Float>
  );
}

function Knot() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.2}>
      <TorusKnot args={[0.6, 0.2, 128, 32]} position={[2.2, -0.5, -1]}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </TorusKnot>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      dpr={[1, 2]}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#c084fc" />
        <pointLight position={[-5, -3, 2]} intensity={0.8} color="#22d3ee" />
        <Blob />
        <Knot />
      </Suspense>
    </Canvas>
  );
}

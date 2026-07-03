import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import type { Group, Points as ThreePoints } from "three";
import * as THREE from "three";

/**
 * Neural network hero scene — a rotating 3D graph of "neurons" (nodes)
 * connected by animated synapse lines arranged in layered planes.
 * Fits an AI/ML explorer theme.
 */

const LAYERS = [5, 8, 8, 6, 3];
const LAYER_GAP = 1.15;
const LAYER_RADIUS = 1.1;

function useNetwork() {
  return useMemo(() => {
    const nodes: THREE.Vector3[][] = [];
    LAYERS.forEach((count, li) => {
      const layer: THREE.Vector3[] = [];
      const x = (li - (LAYERS.length - 1) / 2) * LAYER_GAP;
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : (i / (count - 1)) * Math.PI * 2;
        const y = Math.sin(t) * LAYER_RADIUS;
        const z = Math.cos(t) * LAYER_RADIUS;
        layer.push(new THREE.Vector3(x, y, z));
      }
      nodes.push(layer);
    });

    const edges: [THREE.Vector3, THREE.Vector3][] = [];
    for (let l = 0; l < nodes.length - 1; l++) {
      for (const a of nodes[l]) {
        for (const b of nodes[l + 1]) {
          edges.push([a, b]);
        }
      }
    }
    return { nodes, edges };
  }, []);
}

function Edges({ edges }: { edges: [THREE.Vector3, THREE.Vector3][] }) {
  const ref = useRef<THREE.LineSegments>(null);
  const geom = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [edges]);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.15 + Math.abs(Math.sin(state.clock.elapsedTime * 0.7)) * 0.25;
  });

  return (
    <lineSegments ref={ref} geometry={geom}>
      <lineBasicMaterial color="#a855f7" transparent opacity={0.3} />
    </lineSegments>
  );
}

function Nodes({ nodes }: { nodes: THREE.Vector3[][] }) {
  return (
    <>
      {nodes.flat().map((p, i) => (
        <Float key={i} speed={2} floatIntensity={0.3} rotationIntensity={0.2}>
          <mesh position={p}>
            <sphereGeometry args={[0.09, 24, 24]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#a855f7"
              emissiveIntensity={1.4}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Pulses({ edges }: { edges: [THREE.Vector3, THREE.Vector3][] }) {
  const count = 40;
  const ref = useRef<ThreePoints>(null);
  const data = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.2 + Math.random() * 0.6,
      })),
    [edges],
  );
  const positions = useMemo(() => new Float32Array(count * 3), []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    data.forEach((p, i) => {
      p.t += dt * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.edge = edges[Math.floor(Math.random() * edges.length)];
      }
      const [a, b] = p.edge;
      positions[i * 3] = a.x + (b.x - a.x) * p.t;
      positions[i * 3 + 1] = a.y + (b.y - a.y) * p.t;
      positions[i * 3 + 2] = a.z + (b.z - a.z) * p.t;
    });
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    attr.array = positions;
    attr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#f0abfc"
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Network() {
  const group = useRef<Group>(null);
  const { nodes, edges } = useNetwork();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.25;
    group.current.rotation.x = Math.sin(t * 0.4) * 0.2;
  });

  return (
    <group ref={group}>
      <Edges edges={edges} />
      <Nodes nodes={nodes} />
      <Pulses edges={edges} />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 2]}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#c084fc" />
        <pointLight position={[-5, -3, 2]} intensity={0.9} color="#22d3ee" />
        <Network />
      </Suspense>
    </Canvas>
  );
}

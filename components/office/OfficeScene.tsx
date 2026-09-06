"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ACESFilmicToneMapping, Color, Group, MathUtils, Mesh, PCFSoftShadowMap, Vector3 } from "three";

export type OfficeSceneProps = {
  theme: "light" | "dark";
  activeRoom?: string;
  reducedMotion?: boolean;
  onSelectRoom?: (room: string) => void;
  onReady?: () => void;
  onUnavailable?: () => void;
};

type Vec3 = [number, number, number];
type Palette = { stone: string; edge: string; wall: string; desk: string; metal: string; blue: string; glass: string };

const PALETTES: Record<OfficeSceneProps["theme"], Palette> = {
  light: { stone: "#e8e7e0", edge: "#b9c4c4", wall: "#f2f0e7", desk: "#243137", metal: "#7e9198", blue: "#087bf5", glass: "#8abecb" },
  dark: { stone: "#243341", edge: "#17242f", wall: "#344653", desk: "#101c28", metal: "#7e9bac", blue: "#42aaff", glass: "#568aab" },
};

function Box({ position = [0, 0, 0], size, color, rotation, emissive, opacity = 1, metalness = 0, roughness = 0.65, castShadow = true }: {
  position?: Vec3; size: Vec3; color: string; rotation?: Vec3; emissive?: string;
  opacity?: number; metalness?: number; roughness?: number; castShadow?: boolean;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} transparent={opacity < 1} opacity={opacity} emissive={emissive ?? "#000000"} emissiveIntensity={emissive ? 1.4 : 0} />
    </mesh>
  );
}

function Cylinder({ position, radius, height, color, topRadius, rotation, metalness = 0 }: {
  position: Vec3; radius: number; height: number; color: string; topRadius?: number; rotation?: Vec3; metalness?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <cylinderGeometry args={[topRadius ?? radius, radius, height, 32]} />
      <meshStandardMaterial color={color} roughness={0.65} metalness={metalness} />
    </mesh>
  );
}

function Interactive({ room, activeRoom, onSelectRoom, children }: {
  room: string; activeRoom?: string; onSelectRoom?: (room: string) => void; children: (highlighted: boolean) => ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();
  const select = (event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelectRoom?.(room); };
  return (
    <group
      onClick={select}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); gl.domElement.style.setProperty("cursor", "pointer"); }}
      onPointerOut={() => { setHovered(false); gl.domElement.style.setProperty("cursor", "grab"); }}
    >
      {children(hovered || room === activeRoom)}
    </group>
  );
}

function Architecture({ palette: p, dark }: { palette: Palette; dark: boolean }) {
  return (
    <group>
      {/* The three stepped layers make the room read as a small architectural model. */}
      <Box position={[0, -0.3, 0]} size={[10.4, 0.32, 8.4]} color={p.edge} />
      <Box position={[0, -0.1, 0]} size={[10.2, 0.14, 8.2]} color={p.stone} />
      <Box position={[0, 0.015, 0]} size={[10, 0.1, 8]} color={p.wall} />
      <Box position={[0, -0.175, 4.205]} size={[9.95, 0.027, 0.023]} color="#65b8ed" emissive="#3b99d8" />
      <Box position={[5.205, -0.175, 0]} size={[0.023, 0.027, 7.85]} color="#65b8ed" emissive="#3b99d8" />

      {/* Fine tile joints, inset in the stone. */}
      {[-2.5, 0, 2.5].map((x) => <Box key={`floor-x-${x}`} position={[x, 0.067, 0]} size={[0.015, 0.003, 7.9]} color={p.edge} castShadow={false} />)}
      {[-2, 0, 2].map((z) => <Box key={`floor-z-${z}`} position={[0, 0.067, z]} size={[9.9, 0.003, 0.015]} color={p.edge} castShadow={false} />)}

      <Box position={[-0.1, 1.68, -3.92]} size={[10, 3.3, 0.18]} color={p.wall} />
      <Box position={[-4.92, 1.68, -0.35]} size={[0.18, 3.3, 7.25]} color={p.stone} />
      <Box position={[-0.1, 0.13, -3.8]} size={[9.7, 0.14, 0.045]} color={p.edge} />
      <Box position={[-4.8, 0.13, -0.35]} size={[0.045, 0.14, 7.1]} color={p.edge} />

      {/* A deep blue material panel and warm architectural slats on the rear wall. */}
      <Box position={[-1.3, 1.88, -3.79]} size={[4.35, 2.16, 0.06]} color={dark ? "#173d57" : "#bed1db"} />
      {Array.from({ length: 15 }, (_, i) => <Box key={`slat-${i}`} position={[-4.57 + i * 0.065, 1.71, -3.68]} size={[0.025, 3.18, 0.2]} color={dark ? "#506570" : "#c9c5b8"} />)}
      <Box position={[-1.31, 3.03, -3.7]} size={[4.55, 0.035, 0.055]} color="#caeaff" emissive="#8abdda" />
      <Box position={[3.98, 1.9, -3.72]} size={[0.78, 2.16, 0.14]} color={dark ? "#1c2c36" : "#dee2dd"} />
      {Array.from({ length: 13 }, (_, i) => <Box key={`vent-${i}`} position={[3.98, 1.22 + i * 0.112, -3.62]} size={[0.57, 0.025, 0.016]} color={p.metal} />)}

      {/* Open roof frame, deliberately asymmetrical to keep the room visible. */}
      <Box position={[-4.77, 3.5, -0.44]} size={[0.13, 0.15, 7.45]} color={p.wall} />
      <Box position={[0.03, 3.5, -3.94]} size={[9.73, 0.15, 0.2]} color={p.wall} />
      <Box position={[-0.15, 3.5, -1.53]} size={[9.5, 0.105, 0.11]} color={p.wall} />
      <Box position={[-0.15, 3.44, -1.53]} size={[8.5, 0.025, 0.045]} color="#f7f3dd" emissive="#d6dfdf" />
      <Box position={[4.58, 1.79, -1.53]} size={[0.1, 3.5, 0.1]} color={p.metal} metalness={0.5} />
      <Box position={[4.58, 3.5, -2.73]} size={[0.11, 0.105, 2.52]} color={p.wall} />

      {/* Glass with slender frames provides depth without closing off the cutaway. */}
      <Box position={[-4.68, 1.53, 0.15]} size={[0.028, 2.65, 3.8]} color={p.glass} opacity={0.23} roughness={0.08} castShadow={false} />
      {[-1.77, 0.12, 2.07].map((z) => <Box key={`glass-post-${z}`} position={[-4.66, 1.51, z]} size={[0.055, 2.85, 0.055]} color={p.metal} metalness={0.6} />)}
      <Box position={[-4.65, 2.96, 0.15]} size={[0.06, 0.05, 3.9]} color={p.metal} />

      <Box position={[0.7, -0.35, 4.67]} size={[3.25, 0.22, 0.82]} color={p.stone} />
      <Box position={[0.7, -0.43, 5.18]} size={[3.5, 0.08, 0.38]} color={p.wall} />
      <Box position={[0.7, -0.225, 4.53]} size={[3.03, 0.018, 0.03]} color="#a3d5f4" emissive="#548fab" />
    </group>
  );
}

function Desk({ palette: p, highlighted }: { palette: Palette; highlighted: boolean }) {
  return (
    <group position={[-1.23, 0.08, -1.27]}>
      <Box position={[0, 1.13, 0]} size={[4.2, 0.13, 1.75]} color={highlighted ? "#30556c" : p.desk} roughness={0.32} />
      <Box position={[-1.69, 0.53, 0]} size={[0.17, 1.05, 1.44]} color={p.desk} />
      <Box position={[1.69, 0.53, 0]} size={[0.17, 1.05, 1.44]} color={p.desk} />
      <Box position={[0, 0.6, -0.67]} size={[3.4, 0.16, 0.1]} color={p.desk} />
      <Box position={[0, 1.075, 0.881]} size={[4.06, 0.022, 0.018]} color="#62aeea" emissive={highlighted ? "#399aff" : undefined} />
      <Box position={[-0.36, 1.24, -0.3]} size={[0.81, 0.07, 0.45]} color="#1a242b" metalness={0.5} />
      <Box position={[-0.36, 1.47, -0.47]} size={[0.095, 0.47, 0.09]} color="#2d3a42" metalness={0.5} />
      <Box position={[-0.36, 1.98, -0.44]} size={[2.42, 1.37, 0.1]} color="#101b25" roughness={0.32} />
      <Box position={[-0.36, 2, -0.381]} size={[2.27, 1.22, 0.008]} color="#0b2e4e" emissive="#06213c" />
      {/* The display is made of geometry; it stays crisp without downloading a texture. */}
      <Box position={[-0.36, 2.56, -0.37]} size={[2.27, 0.08, 0.009]} color="#234761" />
      {[-1.38, -1.28, -1.18].map((x, i) => <mesh key={`window-dot-${x}`} position={[x, 2.561, -0.36]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.021, 0.021, 0.01, 12]} /><meshBasicMaterial color={["#648da2", "#80b0c3", "#99c4d0"][i]} /></mesh>)}
      <Box position={[-1.19, 1.98, -0.365]} size={[0.41, 1.02, 0.011]} color="#10293d" />
      {Array.from({ length: 7 }, (_, i) => <Box key={`sidebar-${i}`} position={[-1.2, 2.35 - i * 0.11, -0.35]} size={[0.2 + (i % 3) * 0.05, 0.022, 0.012]} color={i === 2 ? "#4eb3f7" : "#52748a"} />)}
      {Array.from({ length: 9 }, (_, i) => <group key={`code-${i}`}>
        <Box position={[-0.84, 2.36 - i * 0.09, -0.35]} size={[0.035, 0.016, 0.012]} color="#506f8e" />
        <Box position={[-0.6 + (i % 3) * 0.08, 2.36 - i * 0.09, -0.35]} size={[0.24 + (i % 4) * 0.09, 0.023, 0.012]} color={i % 3 === 0 ? "#6caff8" : i % 3 === 1 ? "#7bdbc9" : "#aec9dd"} />
        <Box position={[0.04 + (i % 2) * 0.09, 2.36 - i * 0.09, -0.35]} size={[0.21 + (i % 3) * 0.09, 0.023, 0.012]} color={i % 2 ? "#bb9bde" : "#7b9cad"} />
      </group>)}
      <Box position={[0.54, 1.93, -0.35]} size={[0.29, 0.73, 0.012]} color="#183c55" />
      <Box position={[0.54, 2.07, -0.337]} size={[0.2, 0.23, 0.012]} color="#1975ab" emissive="#105487" />
      <Box position={[-0.45, 1.214, 0.47]} size={[1.38, 0.055, 0.48]} color="#727f83" roughness={0.45} />
      {Array.from({ length: 4 }, (_, row) => Array.from({ length: 13 }, (_, col) => <Box key={`key-${row}-${col}`} position={[-1.04 + col * 0.097, 1.247, 0.3 + row * 0.098]} size={[0.071, 0.009, 0.065]} color={row === 3 && col > 3 && col < 9 ? "#a4acad" : "#b9c4c6"} castShadow={false} />))}
      <Box position={[0.76, 1.208, 0.45]} size={[0.54, 0.012, 0.58]} color="#465860" />
      <mesh position={[0.78, 1.25, 0.45]} scale={[0.085, 0.06, 0.15]}><sphereGeometry args={[1, 20, 16]} /><meshStandardMaterial color="#c9d3d4" roughness={0.5} /></mesh>
      <Cylinder position={[1.65, 1.33, 0.35]} radius={0.13} topRadius={0.15} height={0.27} color="#d9dfdf" />
      <Cylinder position={[1.65, 1.468, 0.35]} radius={0.115} height={0.006} color="#3f342c" />
      <Box position={[1.46, 1.29, -0.4]} size={[0.56, 0.12, 0.65]} color="#7b9096" />
      <Box position={[1.43, 1.38, -0.43]} size={[0.56, 0.07, 0.65]} color="#c7cec8" rotation={[0, 0.11, 0]} />
    </group>
  );
}

function Chair({ palette: p, highlighted }: { palette: Palette; highlighted: boolean }) {
  return (
    <group position={[-1.15, 0.09, 0.5]} rotation={[0, -0.17, 0]}>
      <Cylinder position={[0, 0.33, 0]} radius={0.057} height={0.6} color={p.metal} metalness={0.7} />
      {[0, 1, 2, 3, 4].map((i) => <group key={`chair-leg-${i}`} rotation={[0, i * Math.PI * 0.4, 0]}><Box position={[0, 0.08, 0.26]} size={[0.07, 0.075, 0.54]} color={p.desk} /><Cylinder position={[0, 0.05, 0.49]} radius={0.063} height={0.08} color="#202c35" rotation={[0, 0, Math.PI / 2]} /></group>)}
      <Box position={[0, 0.67, 0]} size={[0.87, 0.15, 0.8]} color={highlighted ? "#4d849b" : "#536970"} roughness={0.86} />
      <Box position={[0, 1.14, 0.39]} size={[0.85, 0.91, 0.13]} color={highlighted ? "#4d849b" : "#536970"} rotation={[-0.09, 0, 0]} roughness={0.88} />
      <Box position={[0, 1.27, 0.473]} size={[0.54, 0.035, 0.017]} color="#70868b" />
      {[-0.52, 0.52].map((x) => <group key={`arm-${x}`}><Box position={[x, 0.81, 0.06]} size={[0.055, 0.41, 0.055]} color={p.metal} /><Box position={[x, 1.01, 0.01]} size={[0.11, 0.065, 0.54]} color={p.desk} /></group>)}
    </group>
  );
}

function Plant({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <Cylinder position={[0, 0.23, 0]} radius={0.3} topRadius={0.39} height={0.46} color="#aab7ac" />
      <Cylinder position={[0, 0.46, 0]} radius={0.33} height={0.015} color="#404a38" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const angle = i * 2.4;
        return <group key={`leaf-${i}`} rotation={[0, angle, 0]}>
          <Cylinder position={[0.09, 0.84 + (i % 3) * 0.09, 0]} radius={0.018} height={0.78 + (i % 3) * 0.14} color="#526646" rotation={[0, 0, -0.2]} />
          <mesh position={[0.25 + (i % 2) * 0.08, 1.12 + (i % 3) * 0.18, 0]} rotation={[0, 0, -0.64]} scale={[0.13, 0.47, 0.25]} castShadow><sphereGeometry args={[1, 14, 12]} /><meshStandardMaterial color={i % 2 ? "#3a6956" : "#5e8261"} roughness={0.9} /></mesh>
        </group>;
      })}
    </group>
  );
}

function ProjectBoard({ palette: p, highlighted }: { palette: Palette; highlighted: boolean }) {
  return (
    <group position={[1.6, 2, -3.65]}>
      <Box size={[1.73, 1.63, 0.12]} color={highlighted ? "#357cad" : p.desk} />
      <Box position={[0, 0, 0.072]} size={[1.56, 1.46, 0.02]} color="#e1e5de" />
      <Box position={[0, 0.54, 0.091]} size={[1.23, 0.09, 0.02]} color="#89a8b8" />
      {[-0.47, 0, 0.47].map((x, i) => <group key={`board-col-${x}`}>
        <Box position={[x, 0.31, 0.094]} size={[0.34, 0.065, 0.023]} color={["#1c7ad0", "#829b9e", "#67856d"][i]} />
        {[0.05, -0.3].map((y, j) => <group key={`card-${j}`}><Box position={[x, y, 0.099]} size={[0.35, 0.24, 0.025]} color={["#b2cde0", "#cad2ce", "#b2c4b5"][i]} /><Box position={[x - 0.028, y + 0.03, 0.118]} size={[0.22, 0.018, 0.008]} color="#66818c" /><Box position={[x - 0.062, y - 0.03, 0.118]} size={[0.15, 0.018, 0.008]} color="#8398a0" /></group>)}
      </group>)}
    </group>
  );
}

function Server({ palette: p, highlighted }: { palette: Palette; highlighted: boolean }) {
  return (
    <group position={[3.6, 0.075, -2.45]}>
      <Box position={[0, 0.89, 0]} size={[0.9, 1.78, 1.06]} color={p.desk} metalness={0.35} roughness={0.4} />
      <Box position={[0, 0.9, 0.541]} size={[0.73, 1.59, 0.02]} color="#10222e" />
      {[0, 1, 2, 3].map((i) => <group key={`server-${i}`}><Box position={[0, 0.36 + i * 0.35, 0.56]} size={[0.65, 0.27, 0.024]} color="#304451" /><Box position={[-0.2, 0.36 + i * 0.35, 0.58]} size={[0.018, 0.13, 0.015]} color="#68c9fe" emissive="#239ddd" />{[0, 1, 2, 3, 4].map((j) => <Box key={`slot-${j}`} position={[-0.08 + j * 0.058, 0.36 + i * 0.35, 0.58]} size={[0.024, 0.11, 0.012]} color="#152c3b" />)}</group>)}
      <Box position={[0, 1.79, 0]} size={[0.84, 0.035, 0.97]} color={highlighted ? "#3597ed" : "#536d7b"} />
      <Box position={[0.465, 0.9, 0]} size={[0.01, 1.52, 0.82]} color="#3b6882" opacity={0.4} />
    </group>
  );
}

function AISculpture({ palette: p, highlighted, reducedMotion }: { palette: Palette; highlighted: boolean; reducedMotion: boolean }) {
  const sculpture = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  useFrame(({ clock }, delta) => {
    if (reducedMotion || document.hidden) return;
    if (sculpture.current) { sculpture.current.rotation.y += delta * 0.22; sculpture.current.position.y = 1.75 + Math.sin(clock.elapsedTime * 1.3) * 0.07; }
    if (core.current) core.current.rotation.z += delta * 0.12;
  });
  return (
    <group position={[2.25, 0.07, 1.15]}>
      <Cylinder position={[0, 0.11, 0]} radius={1.07} height={0.2} color={p.edge} />
      <Cylinder position={[0, 0.28, 0]} radius={0.94} height={0.15} color={p.wall} />
      <Cylinder position={[0, 0.5, 0]} radius={0.73} topRadius={0.55} height={0.34} color={p.stone} />
      <Cylinder position={[0, 0.69, 0]} radius={0.57} height={0.055} color="#468eb7" metalness={0.45} />
      <mesh position={[0, 0.724, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.43, 0.49, 48]} /><meshBasicMaterial color="#68caff" /></mesh>
      <Cylinder position={[0, 0.74, 0]} radius={0.36} height={0.025} color="#112f49" />
      <mesh position={[0, 1.13, 0]}><cylinderGeometry args={[0.47, 0.16, 0.73, 48, 1, true]} /><meshBasicMaterial color="#57b6ff" transparent opacity={highlighted ? 0.12 : 0.055} depthWrite={false} side={2} /></mesh>
      <group ref={sculpture} position={[0, 1.75, 0]} rotation={[0.14, 0.35, 0.1]}>
        <mesh ref={core} rotation={[0.35, 0.2, 0.4]} castShadow><icosahedronGeometry args={[0.56, 1]} /><meshStandardMaterial color={highlighted ? "#52bdff" : "#187dcc"} metalness={0.5} roughness={0.21} emissive="#065fb7" emissiveIntensity={highlighted ? 0.8 : 0.36} flatShading /></mesh>
        <mesh rotation={[0.35, 0.2, 0.4]}><icosahedronGeometry args={[0.571, 1]} /><meshBasicMaterial color="#91d4ff" wireframe transparent opacity={0.48} /></mesh>
        {[0, 1, 2].map((i) => <mesh key={`orbit-${i}`} rotation={[Math.PI / 2 + i * 0.54, i * 0.83, i * 0.5]}><torusGeometry args={[0.77 + i * 0.075, 0.012, 8, 80]} /><meshStandardMaterial color="#8dc6e6" metalness={0.6} roughness={0.2} emissive="#279bea" emissiveIntensity={0.4} /></mesh>)}
        <mesh position={[0.89, 0, 0]}><sphereGeometry args={[0.044, 16, 12]} /><meshBasicMaterial color="#bce5ff" /></mesh>
      </group>
      <pointLight position={[0, 1.5, 0]} color="#279bff" intensity={highlighted ? 4 : 2} distance={4} decay={2} />
    </group>
  );
}

function ContactTablet({ palette: p, highlighted }: { palette: Palette; highlighted: boolean }) {
  return (
    <group position={[-3.44, 0.08, 2.01]}>
      <Box position={[0, 0.35, 0]} size={[1.45, 0.69, 0.95]} color={p.stone} />
      <Box position={[0, 0.73, 0]} size={[1.5, 0.1, 1]} color={p.wall} />
      <Box position={[0, 0.96, -0.06]} size={[0.88, 0.51, 0.055]} color={p.desk} rotation={[-0.4, 0, 0]} />
      <group position={[0, 0.96, -0.017]} rotation={[-0.4, 0, 0]}>
        <Box size={[0.79, 0.42, 0.01]} color={highlighted ? "#247fc3" : "#174b70"} emissive="#063b68" />
        <Box position={[0, 0.025, 0.01]} size={[0.29, 0.19, 0.006]} color="#b9d6e5" />
        <Box position={[-0.058, 0.05, 0.017]} size={[0.14, 0.014, 0.005]} color="#41749a" rotation={[0, 0, -0.48]} />
        <Box position={[0.058, 0.05, 0.017]} size={[0.14, 0.014, 0.005]} color="#41749a" rotation={[0, 0, 0.48]} />
      </group>
    </group>
  );
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const size = useThree((state) => state.size);
  const get = useThree((state) => state.get);
  const lookAt = useRef(new Vector3(0, 1.2, 0.15));
  useEffect(() => {
    const { camera } = get();
    if ("zoom" in camera) {
      camera.zoom = Math.min(size.width / 15.9, size.height / 11.8);
      camera.updateProjectionMatrix();
    }
    camera.position.set(11, 10, 12);
    camera.lookAt(lookAt.current);
  }, [get, size.width, size.height]);
  useFrame(({ camera, pointer }, delta) => {
    if (reducedMotion || document.hidden) return;
    const t = 1 - Math.exp(-delta * 3);
    camera.position.set(
      MathUtils.lerp(camera.position.x, 11 + pointer.x * 0.7, t),
      MathUtils.lerp(camera.position.y, 10 + pointer.y * 0.4, t),
      12,
    );
    camera.lookAt(lookAt.current);
  });
  return null;
}

function Room(props: OfficeSceneProps & { visible: boolean }) {
  const p = PALETTES[props.theme];
  const dark = props.theme === "dark";
  const [hidden, setHidden] = useState(false);
  const { setFrameloop, invalidate } = useThree();
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    setFrameloop(hidden || !props.visible || props.reducedMotion ? "demand" : "always");
    invalidate();
  }, [hidden, props.visible, props.reducedMotion, setFrameloop, invalidate]);
  return (
    <>
      <CameraRig reducedMotion={props.reducedMotion ?? false} />
      <ambientLight intensity={dark ? 0.6 : 1.1} color={dark ? "#b7d0ec" : "#f6f4ee"} />
      <hemisphereLight args={[dark ? "#aecfea" : "#d9ecff", dark ? "#172535" : "#c5ba9f", dark ? 1.8 : 2.1]} />
      <directionalLight position={[2, 11, 6]} intensity={dark ? 2.6 : 3.4} color={dark ? "#d2e4ff" : "#fff4de"} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} shadow-normalBias={0.035} shadow-bias={-0.0001} shadow-radius={4} />
      <directionalLight position={[-6, 5, -3]} intensity={dark ? 1.8 : 1.1} color="#74b5fb" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.481, 0]} receiveShadow><planeGeometry args={[70, 70]} /><shadowMaterial transparent opacity={dark ? 0.22 : 0.14} /></mesh>
      <group rotation={[0, -0.065, 0]}>
        <Architecture palette={p} dark={dark} />
        <Interactive room="about" activeRoom={props.activeRoom} onSelectRoom={props.onSelectRoom}>{(h) => <><Desk palette={p} highlighted={h} /><Chair palette={p} highlighted={h} /></>}</Interactive>
        <Interactive room="projects" activeRoom={props.activeRoom} onSelectRoom={props.onSelectRoom}>{(h) => <ProjectBoard palette={p} highlighted={h} />}</Interactive>
        <Interactive room="skills" activeRoom={props.activeRoom} onSelectRoom={props.onSelectRoom}>{(h) => <Server palette={p} highlighted={h} />}</Interactive>
        <Interactive room="experience" activeRoom={props.activeRoom} onSelectRoom={props.onSelectRoom}>{(h) => <AISculpture palette={p} highlighted={h} reducedMotion={props.reducedMotion ?? false} />}</Interactive>
        <Interactive room="contact" activeRoom={props.activeRoom} onSelectRoom={props.onSelectRoom}>{(h) => <ContactTablet palette={p} highlighted={h} />}</Interactive>
        <Plant position={[-3.92, 0.07, -2.43]} scale={0.77} />
        <Plant position={[3.96, 0.07, 2.87]} scale={0.72} />
        <Box position={[-3.77, 0.095, 0.3]} size={[0.68, 0.05, 1.55]} color={dark ? "#526674" : "#a7b8b9"} />
        <Box position={[-3.77, 0.21, 0.3]} size={[0.57, 0.21, 1.42]} color={dark ? "#354856" : "#cdd6d0"} />
      </group>
    </>
  );
}

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable?: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable?.(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function OfficeScene(props: OfficeSceneProps) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const element = container.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} style={{ width: "100%", height: "100%" }}>
      <SceneBoundary onUnavailable={props.onUnavailable}>
      <Canvas
        orthographic
        camera={{ position: [11, 10, 12], zoom: 42, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        shadows
        frameloop={props.reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ width: "100%", height: "100%", background: "transparent", cursor: "grab", touchAction: "pan-y" }}
        onCreated={({ gl, scene }) => {
          gl.shadowMap.type = PCFSoftShadowMap;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.13;
          gl.setClearColor(new Color("#000000"), 0);
          scene.background = null;
          props.onReady?.();
        }}
      >
        <Room {...props} visible={visible} />
      </Canvas>
      </SceneBoundary>
    </div>
  );
}

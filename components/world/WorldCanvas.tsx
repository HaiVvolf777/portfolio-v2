"use client";

import { Component, memo, useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, Color, Group, LinearFilter, MathUtils, SRGBColorSpace, Vector3 } from "three";
import { places, type Controls, type LocationState, type Place, type PlaceId, type Teleport, type VerseCopy } from "@/lib/verse";

export type WorldProps = {
  entered: boolean; theme: "light" | "dark"; reducedMotion: boolean; paused: boolean; firstPerson: boolean;
  controls: MutableRefObject<Controls>; teleport: Teleport | null; copy: VerseCopy;
  onLocation: (location: LocationState) => void; onReady: () => void; onError: () => void;
};
type V3 = [number, number, number];

function Block({ at = [0, 0, 0], size, color, rotation, emissive, transparent = false, opacity = 1, shadow = true }: { at?: V3; size: V3; color: string; rotation?: V3; emissive?: string; transparent?: boolean; opacity?: number; shadow?: boolean }) {
  return <mesh position={at} rotation={rotation} castShadow={shadow} receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={.72} metalness={emissive ? .2 : 0} emissive={emissive || "#000"} emissiveIntensity={emissive ? .8 : 0} transparent={transparent} opacity={opacity} /></mesh>;
}
function Cylinder({ at, radius, height, color, segments = 32, top, emissive }: { at: V3; radius: number; height: number; color: string; segments?: number; top?: number; emissive?: string }) {
  return <mesh position={at} castShadow receiveShadow><cylinderGeometry args={[top ?? radius, radius, height, segments]} /><meshStandardMaterial color={color} roughness={.75} emissive={emissive || "#000"} emissiveIntensity={.6} /></mesh>;
}

function Sign({ text, at, width = 7, height = 1, color = "#253f44", size = 70 }: { text: string; at: V3; width?: number; height?: number; color?: string; size?: number }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas"); canvas.width = 1024; canvas.height = Math.round(1024 * height / width);
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = color; context.textAlign = "center"; context.textBaseline = "middle";
      context.font = `600 ${size}px "Manrope Variable", "Noto Sans Arabic Variable", sans-serif`;
      context.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width - 30);
    }
    const map = new CanvasTexture(canvas); map.colorSpace = SRGBColorSpace; map.minFilter = LinearFilter; return map;
  }, [text, color, height, width, size]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh position={at}><planeGeometry args={[width, height]} /><meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} /></mesh>;
}

const trees: [number, number, number][] = [
  [-26,-23,1.2],[-21,-28,1],[-13,-29,1.35],[-6,-31,1.1],[4,-30,1.5],[12,-29,1.1],[22,-26,1.3],[29,-21,1.1],
  [-30,-13,1.2],[-31,-4,1.6],[-29,6,1.3],[-31,16,1.2],[-26,24,1.4],[-21,31,1],[-12,35,1.3],[-5,38,1.3],[8,37,1.2],[17,34,1.6],[25,29,1.3],[30,22,1],
  [30,12,1.3],[30,3,1.4],[30,-7,1.5],[-7,-9,.75],[7,-9,.75],[-7,6,.85],[7,6,.85],[-7,20,.9],[7,20,.9],[-24,4,.9],[24,4,.9],
];
function Tree({ x, z, scale = 1, dark = false }: { x: number; z: number; scale?: number; dark?: boolean }) {
  return <group position={[x, 0, z]} scale={scale}>
    <Cylinder at={[0,1.7,0]} radius={.19} top={.12} height={3.4} color="#7b6751" segments={6} />
    <Block at={[-.3,2.5,0]} size={[.13,1.8,.13]} rotation={[0,0,.55]} color="#7b6751" />
    <Block at={[.4,2.7,.15]} size={[.13,1.5,.13]} rotation={[0,0,-.7]} color="#7b6751" />
    {[[0,4.1,0,1.75],[-.9,3.4,.1,1.35],[1,3.7,.1,1.45]].map(([a,b,c,s],i) => <mesh key={i} position={[a,b,c]} scale={[s,s*.9,s]} castShadow><icosahedronGeometry args={[1,0]} /><meshStandardMaterial color={dark ? ["#3d6b61","#345f54","#547b63"][i] : ["#7eab69","#69965e","#92b775"][i]} roughness={1} flatShading /></mesh>)}
  </group>;
}
function Lamp({ x, z, dark }: { x:number;z:number;dark:boolean }) {
  return <group position={[x,0,z]}><Cylinder at={[0,.05,0]} radius={.3} height={.1} color="#5d7370" segments={12} /><Block at={[0,.8,0]} size={[.12,1.5,.12]} color="#405b5b" /><Block at={[0,1.6,0]} size={[.28,.34,.28]} color="#e6d9ab" emissive={dark ? "#ffdb95" : undefined} /><Block at={[0,1.8,0]} size={[.4,.07,.4]} color="#405b5b" /></group>;
}
function Bench({ x,z,rotation=0 }: {x:number;z:number;rotation?:number}) {
  return <group position={[x,0,z]} rotation={[0,rotation,0]}>
    <Block at={[0,.48,0]} size={[2.5,.17,.65]} color="#bbaa8a" /><Block at={[0,.97,-.26]} size={[2.5,.65,.12]} color="#bbaa8a" />
    {[-.9,.9].map(v=><Block key={v} at={[v,.2,0]} size={[.13,.5,.6]} color="#466060" />)}
  </group>;
}

function Landscape({ dark }: {dark:boolean}) {
  return <group>
    <mesh rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[350,350]} /><meshStandardMaterial color={dark ? "#243f39" : "#89a879"} roughness={1} /></mesh>
    <Cylinder at={[0,-.07,4]} radius={25.5} height={.15} color={dark ? "#506467" : "#d7d5c7"} segments={64} />
    <Cylinder at={[0,.014,4]} radius={24.7} height={.025} color={dark ? "#617575" : "#e7e4d7"} segments={64} />
    <Block at={[0,.04,5]} size={[6,.04,43]} color={dark ? "#748b89" : "#f1eee3"} />
    <Block at={[0,.045,-4]} size={[41,.04,5]} color={dark ? "#748b89" : "#f1eee3"} />
    <Block at={[0,.045,13]} size={[41,.04,5]} color={dark ? "#748b89" : "#f1eee3"} />
    {Array.from({length:18},(_,i)=><Block key={i} at={[0,.072,-14+i*2.2]} size={[5.95,.003,.035]} color={dark ? "#5a7272" : "#d1d0c4"} shadow={false} />)}
    <Cylinder at={[0,.1,2]} radius={4.1} height={.15} color={dark ? "#83968e" : "#c5ccbb"} segments={48} />
    <Cylinder at={[0,.23,2]} radius={3.8} height={.22} color={dark ? "#3a5851" : "#b7c8a0"} segments={48} />
    <Cylinder at={[0,.36,2]} radius={2.95} height={.08} color={dark ? "#426650" : "#759b60"} segments={48} />
    <Tree x={0} z={2} scale={1.35} dark={dark} />
    {[-5.5,5.5].map(x => [-6,10,18].map(z=><Lamp key={`${x}-${z}`} x={x} z={z} dark={dark} />))}
    <Bench x={-4.7} z={2} rotation={Math.PI/2}/><Bench x={4.7} z={2} rotation={-Math.PI/2}/>
    <Bench x={-7} z={-11} rotation={.3}/><Bench x={7} z={-11} rotation={-.3}/>
    {trees.map(([x,z,s],i)=><Tree key={i} x={x} z={z} scale={s} dark={dark} />)}
    {Array.from({length:22},(_,i)=> {
      const a = i * Math.PI * 2 / 22; const r = 65 + (i%4)*12;
      return <mesh key={i} position={[Math.sin(a)*r,-1,Math.cos(a)*r]} scale={[14+(i%3)*6,10+(i%4)*4,15]}><icosahedronGeometry args={[1,1]} /><meshStandardMaterial color={dark ? ["#244944","#254f48","#31574d"][i%3] : ["#83a992","#89b09a","#9bbb9f"][i%3]} flatShading roughness={1}/></mesh>;
    })}
    {!dark && [[-35,21,-55],[28,27,-70],[50,20,20],[-55,25,35]].map((p,i)=><group key={i} position={p as V3}>{[0,1,2].map(j=><mesh key={j} position={[j*3,j===1?1:0,0]} scale={[4,1.4,2]}><sphereGeometry args={[1,12,8]}/><meshBasicMaterial color="#e4ece8"/></mesh>)}</group>)}
  </group>;
}

function Exhibit({ id, dark, accent, greeting, reducedMotion }: { id: PlaceId; dark: boolean; accent: string; greeting: string; reducedMotion: boolean }) {
  const spin = useRef<Group>(null);
  useFrame((_,dt)=> { if(spin.current && !reducedMotion) spin.current.rotation.y += Math.min(dt,.05)*.18; });
  if(id==="ai") return <group>
    <Cylinder at={[0,.35,-.7]} radius={1.45} height={.5} color={dark?"#2a465c":"#d7e1e0"}/><Cylinder at={[0,.63,-.7]} radius={1.13} height={.06} color="#81d2dc" emissive="#5cbacb"/>
    <group ref={spin} position={[0,2.15,-.7]}><mesh><icosahedronGeometry args={[.92,0]}/><meshStandardMaterial color="#76b9d0" metalness={.5} roughness={.2} emissive="#285c76" emissiveIntensity={.4}/></mesh><mesh><icosahedronGeometry args={[1.08,1]}/><meshBasicMaterial color="#b6e8e8" wireframe transparent opacity={.45}/></mesh></group>
    <Sign text="AI" at={[0,3.9,-3.85]} width={3} height={1.1} color={accent} size={125}/>
  </group>;
  if(id==="projects") return <group>
    {[-2.9,0,2.9].map((x,i)=><group key={x}><Block at={[x,1.3,-1.1]} size={[2.3,1.55,.15]} color="#2b444b"/><Block at={[x,1.32,-1]} size={[2.08,1.3,.02]} color={["#93aaa3","#b5b694","#8daac1"][i]}/><Block at={[x,.4,-1.1]} size={[.13,.85,.13]} color="#536666"/>{[0,1,2].map(j=><Block key={j} at={[x-.3,1.6-j*.28,-.975]} size={[1.2-j*.18,.06,.015]} color="#e9ece0"/>)}</group>)}
    <Sign text="01  /  02  /  03" at={[0,3.8,-3.85]} width={6} height={.7} color={accent} size={65}/>
  </group>;
  if(id==="skills") return <group>
    <Block at={[0,.9,-1]} size={[5,.15,1.7]} color="#9b8d73"/>{[-2,2].map(x=><Block key={x} at={[x,.45,-1]} size={[.16,.9,1.3]} color="#344c4e"/>)}
    <Block at={[0,1.8,-1.35]} size={[2.5,1.4,.13]} color="#243f49"/><Block at={[0,1.8,-1.265]} size={[2.3,1.2,.025]} color="#35566b"/>
    {[0,1,2,3,4,5].map(i=><Block key={i} at={[-.25+(i%2)*.2,2.2-i*.16,-1.24]} size={[1.1+(i%3)*.2,.03,.02]} color={i%2?"#bddba6":"#87bcce"}/>)}
    <Sign text="{ / }" at={[0,3.8,-3.85]} width={3} height={1} color={accent} size={125}/>
  </group>;
  if(id==="experience") return <group>
    {[-3,-1,1,3].map((x,i)=><group key={x}><Block at={[x,.5+i*.23,-1]} size={[1.2,1+i*.46,1.2]} color={i%2?"#a7a7b4":"#c7c7c0"}/><Cylinder at={[x,1.05+i*.46,-1]} radius={.32} height={.12} color={accent}/></group>)}
    <Sign text="2022  →  2026" at={[0,3.8,-3.85]} width={6} height={.8} color={accent} size={75}/>
  </group>;
  if(id==="contact") return <group>
    <Cylinder at={[0,.85,-.3]} radius={1.35} height={.12} color="#b9ad95"/><Cylinder at={[0,.4,-.3]} radius={.12} height={.8} color="#455b5a"/>
    {[-2,2].map(x=><group key={x}><Block at={[x,.55,-.3]} size={[.9,.18,.85]} color={accent}/><Block at={[x,.99,-.67]} size={[.9,.8,.13]} color={accent}/>{[-.3,.3].map(v=><Block key={v} at={[x+v,.25,-.3]} size={[.08,.5,.6]} color="#465b59"/>)}</group>)}
    <Sign text={greeting} at={[0,3.8,-3.85]} width={6} height={.8} color={accent} size={75}/>
  </group>;
  return <group>
    <Block at={[0,1.1,-1.2]} size={[3.7,2.1,.5]} color={dark?"#385958":"#b1c2b4"}/><Sign text="HA" at={[0,1.35,-.94]} width={2.8} height={1.7} color="#edf0e2" size={340}/>
    <Sign text="HAIDER ALI" at={[0,3.8,-3.85]} width={6} height={.8} color={accent} size={90}/>
    <Block at={[-3.7,1.05,-2]} size={[.75,2.1,.8]} color="#a29b80"/><Block at={[3.7,1.05,-2]} size={[.75,2.1,.8]} color="#a29b80"/>
  </group>;
}

function Pavilion({ place, copy, dark, reducedMotion }: {place:Place;copy:VerseCopy;dark:boolean;reducedMotion:boolean}) {
  const stone = dark ? "#60757b" : "#eeebe0"; const wall = dark ? "#324f59" : "#dfdfd1";
  return <group position={[place.x,0,place.z]} rotation={[0,place.rotation,0]}>
    <Block at={[0,.08,0]} size={[10.8,.16,8.9]} color={dark?"#496163":"#c7cbbb"}/><Block at={[0,.19,0]} size={[10.25,.08,8.4]} color={stone}/>
    <Block at={[0,2.5,-4.05]} size={[10.2,4.7,.22]} color={wall}/>
    {[-5,5].map(x=><group key={x}><Block at={[x,2.5,0]} size={[.2,4.7,8]} color={wall}/><Block at={[x-.13*Math.sign(x),2.4,1.9]} size={[.05,3.6,3.5]} color="#81aebb" transparent opacity={.27}/></group>)}
    <Block at={[0,5,0]} size={[10.8,.28,9.05]} color={stone}/><Block at={[0,4.77,4.18]} size={[10.6,.4,.45]} color={place.color}/>
    <Block at={[0,4.57,4.27]} size={[9.7,.028,.035]} color="#e5deb8" emissive={dark?"#fbe1a6":undefined}/>
    {[-4.8,4.8].map(x=><Block key={x} at={[x,2.45,4]} size={[.16,4.6,.16]} color="#668181"/>)}
    <Block at={[0,4.13,4.19]} size={[7.4,.88,.08]} color={stone}/><Sign text={copy[place.id]} at={[0,4.13,4.245]} color={dark?"#edf2e6":"#29494b"} width={7} height={.7} size={65}/>
    <Sign text={`0${places.indexOf(place)+1}`} at={[-4.26,3.9,4.11]} width={.7} height={.7} color={dark?"#edf2e6":"#29494b"} size={700}/>
    <Exhibit greeting={copy.greeting} reducedMotion={reducedMotion} id={place.id} dark={dark} accent={place.color}/>
    <mesh position={[0,.081,5.55]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.68,.77,48]}/><meshBasicMaterial color={dark?"#a9d7c9":"#5e8c7e"} transparent opacity={.8}/></mesh>
    <mesh position={[0,.082,5.55]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.64,32]}/><meshBasicMaterial color={place.color} transparent opacity={.24}/></mesh>
  </group>;
}

type Rect = {x:number;z:number;w:number;d:number};
const barriers:Rect[] = places.flatMap(place=> {
  const local = [{x:0,z:-4.1,w:10.6,d:.6},{x:-5,z:0,w:.6,d:8.3},{x:5,z:0,w:.6,d:8.3},{x:0,z:-1,w:3.8,d:2.2}];
  return local.map(b=>({x:place.x+Math.cos(place.rotation)*b.x+Math.sin(place.rotation)*b.z,z:place.z-Math.sin(place.rotation)*b.x+Math.cos(place.rotation)*b.z,w:Math.abs(Math.cos(place.rotation))*b.w+Math.abs(Math.sin(place.rotation))*b.d,d:Math.abs(Math.sin(place.rotation))*b.w+Math.abs(Math.cos(place.rotation))*b.d}));
});
function canWalk(x:number,z:number) {
  if(x < -26 || x > 26 || z < -24 || z > 34) return false;
  if(Math.hypot(x,z-2)<4.25) return false;
  if(barriers.some(b=>Math.abs(x-b.x)<b.w/2+.35&&Math.abs(z-b.z)<b.d/2+.35)) return false;
  if(trees.some(([tx,tz])=>Math.hypot(tx-x,tz-z)<.58)) return false;
  return true;
}

function Avatar({ avatarRef, moving, firstPerson }: {avatarRef:MutableRefObject<Group|null>;moving:MutableRefObject<number>;firstPerson:boolean}) {
  const leftLeg=useRef<Group>(null),rightLeg=useRef<Group>(null),leftArm=useRef<Group>(null),rightArm=useRef<Group>(null);
  useFrame(({clock})=> {
    const swing=Math.sin(clock.elapsedTime*9)*moving.current*.65;
    if(leftLeg.current) leftLeg.current.rotation.x=swing;
    if(rightLeg.current) rightLeg.current.rotation.x=-swing;
    if(leftArm.current) leftArm.current.rotation.x=-swing*.7;
    if(rightArm.current) rightArm.current.rotation.x=swing*.7;
  });
  return <group ref={avatarRef} visible={!firstPerson}>
    <group ref={leftLeg} position={[-.14,.66,0]}><Block at={[0,-.27,0]} size={[.22,.57,.25]} color="#30494b"/><Block at={[0,-.55,-.06]} size={[.23,.12,.37]} color="#e4e2cf"/></group>
    <group ref={rightLeg} position={[.14,.66,0]}><Block at={[0,-.27,0]} size={[.22,.57,.25]} color="#30494b"/><Block at={[0,-.55,-.06]} size={[.23,.12,.37]} color="#e4e2cf"/></group>
    <mesh position={[0,1.01,0]} castShadow><capsuleGeometry args={[.26,.42,4,8]}/><meshStandardMaterial color="#e4d9bb" roughness={.9}/></mesh>
    <Block at={[0,1.05,.24]} size={[.36,.46,.19]} color="#688e88"/>
    <group ref={leftArm} position={[-.37,1.26,0]}><Block at={[0,-.23,0]} size={[.18,.49,.2]} color="#e4d9bb"/><Block at={[0,-.51,0]} size={[.15,.16,.17]} color="#b79277"/></group>
    <group ref={rightArm} position={[.37,1.26,0]}><Block at={[0,-.23,0]} size={[.18,.49,.2]} color="#e4d9bb"/><Block at={[0,-.51,0]} size={[.15,.16,.17]} color="#b79277"/></group>
    <mesh position={[0,1.65,0]} castShadow><sphereGeometry args={[.23,12,10]}/><meshStandardMaterial color="#b79277" roughness={1}/></mesh>
    <mesh position={[0,1.75,.035]} castShadow><sphereGeometry args={[.24,12,8,0,Math.PI*2,0,Math.PI*.65]}/><meshStandardMaterial color="#35413c" roughness={1}/></mesh>
    <Block at={[0,1.63,-.207]} size={[.35,.065,.04]} color="#263c3e"/>
  </group>;
}

function Player(props:WorldProps) {
  const {entered,paused,firstPerson,controls,teleport,onLocation,reducedMotion}=props;
  const {camera,gl,invalidate}=useThree();
  const avatar=useRef<Group>(null),moving=useRef(0);
  const position=useRef(new Vector3(0,.1,11.5));
  const yaw=useRef(0),pitch=useRef(.08),lastReport=useRef(0),sequence=useRef(-1);
  const desiredCamera=useRef(new Vector3()),desiredTarget=useRef(new Vector3()),smoothTarget=useRef(new Vector3(0,0,0));
  const consumedStep=useRef<[number,number,number?]|null>(null);
  const dragging=useRef<{id:number;x:number;y:number}|null>(null);
  useEffect(()=> {
    if(!entered || paused) return;
    const canvas=gl.domElement;
    const down=(e:PointerEvent)=> { if(e.button!==0) return; dragging.current={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);canvas.style.cursor="grabbing"; };
    const move=(e:PointerEvent)=> { const d=dragging.current;if(!d||d.id!==e.pointerId)return;yaw.current-=(e.clientX-d.x)*.004;pitch.current=MathUtils.clamp(pitch.current+(e.clientY-d.y)*.003,-.15,.7);d.x=e.clientX;d.y=e.clientY;invalidate(); };
    const up=()=> { dragging.current=null;canvas.style.cursor="grab"; };
    canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",up);canvas.addEventListener("pointercancel",up);window.addEventListener("blur",up);
    return()=> {canvas.removeEventListener("pointerdown",down);canvas.removeEventListener("pointermove",move);canvas.removeEventListener("pointerup",up);canvas.removeEventListener("pointercancel",up);window.removeEventListener("blur",up);dragging.current=null;};
  },[entered,paused,gl,invalidate]);
  useFrame((state,delta)=> {
    const dt=Math.min(delta,.05);
    if(!entered) {
      const a=reducedMotion ? .55 : .55+Math.sin(state.clock.elapsedTime*.035)*.08;
      desiredCamera.current.set(Math.sin(a)*59,25,Math.cos(a)*59+5);
      desiredTarget.current.set(0,1.6,1.5);
      if(avatar.current) avatar.current.visible=false;
    } else {
      if(teleport && teleport.sequence!==sequence.current) {
        sequence.current=teleport.sequence;position.current.set(teleport.x,.1,teleport.z);yaw.current=teleport.yaw;pitch.current=.08;if(avatar.current)avatar.current.rotation.y=teleport.yaw;
      }
      const input=controls.current;
      if(!paused) {yaw.current+=(input.turn*1.4-input.lookX*1.8)*dt;pitch.current=MathUtils.clamp(pitch.current+input.lookY*dt*.7,-.15,.7);}
      let lateral=Number(input.right)-Number(input.left)+input.moveX,forward=Number(input.forward)-Number(input.backward)+input.moveZ;
      let distance=(input.sprint?7.2:4.3)*dt;
      if(input.step && input.step!==consumedStep.current && !paused) { [lateral,forward]=input.step;distance=input.step[2]??.7;consumedStep.current=input.step; }
      const length=Math.hypot(lateral,forward);
      moving.current= !paused ? Math.min(1,length) : 0;
      if(length && !paused) {
        const dx=(Math.cos(yaw.current)*lateral-Math.sin(yaw.current)*forward)/length*distance*Math.min(1,length);
        const dz=(-Math.sin(yaw.current)*lateral-Math.cos(yaw.current)*forward)/length*distance*Math.min(1,length);
        const p=position.current;
        if(canWalk(p.x+dx,p.z))p.x+=dx;
        if(canWalk(p.x,p.z+dz))p.z+=dz;
        if(avatar.current) { const target=Math.atan2(-dx,-dz);const current=avatar.current.rotation.y;avatar.current.rotation.y+=Math.atan2(Math.sin(target-current),Math.cos(target-current))*Math.min(1,dt*12); }
      }
      if(avatar.current) {avatar.current.position.copy(position.current);avatar.current.visible=!firstPerson;}
      const p=position.current;
      if(firstPerson) { desiredCamera.current.set(p.x,1.73,p.z);desiredTarget.current.set(p.x-Math.sin(yaw.current)*6,1.73-pitch.current*6,p.z-Math.cos(yaw.current)*6); }
      else { desiredCamera.current.set(p.x+Math.sin(yaw.current)*6.3,3.1+pitch.current*3,p.z+Math.cos(yaw.current)*6.3);desiredTarget.current.set(p.x-Math.sin(yaw.current)*4,1.65-pitch.current*2,p.z-Math.cos(yaw.current)*4); }
      lastReport.current+=dt;
      if(lastReport.current>.12) {
        lastReport.current=0;
        const nearest=places.find(place=>Math.hypot(p.x-(place.x+Math.sin(place.rotation)*5.55),p.z-(place.z+Math.cos(place.rotation)*5.55))<4)?.id??null;
        onLocation({x:Math.round(p.x*10)/10,z:Math.round(p.z*10)/10,yaw:yaw.current,nearest});
      }
    }
    const blend=reducedMotion?1:1-Math.exp(-dt*5);
    camera.position.lerp(desiredCamera.current,blend);smoothTarget.current.lerp(desiredTarget.current,blend);camera.lookAt(smoothTarget.current);
  });
  return <Avatar avatarRef={avatar} moving={moving} firstPerson={firstPerson}/>;
}

function WorldScene(props:WorldProps & { lightweight: boolean }) {
  const {theme,onReady,onError,entered,paused,reducedMotion}=props;const dark=theme==="dark";
  const {setFrameloop,invalidate,gl}=useThree();
  useEffect(()=> { const ready=requestAnimationFrame(onReady);return()=>cancelAnimationFrame(ready); },[onReady]);
  useEffect(()=> {
    const visibility=()=> {setFrameloop(document.hidden || paused || (!entered&&reducedMotion)?"demand":"always");invalidate();};
    visibility();document.addEventListener("visibilitychange",visibility);return()=>document.removeEventListener("visibilitychange",visibility);
  },[entered,paused,reducedMotion,setFrameloop,invalidate]);
  useEffect(()=>{const lost=(e:Event)=>{e.preventDefault();onError();};gl.domElement.addEventListener("webglcontextlost",lost);return()=>gl.domElement.removeEventListener("webglcontextlost",lost);},[gl,onError]);
  return <>
    <color attach="background" args={[dark?"#172f41":"#bed8de"]}/><fog attach="fog" args={[dark?"#172f41":"#bed8de",45,135]}/>
    <hemisphereLight args={[dark?"#a5c7e3":"#e9f1ed",dark?"#324c52":"#91a983",dark?1.2:1.8]}/>
    <directionalLight position={[-22,35,18]} intensity={dark?1.35:2.5} color={dark?"#b8d9ec":"#fff0ce"} castShadow shadow-mapSize={props.lightweight ? [1024,1024] : [2048,2048]} shadow-camera-left={-38} shadow-camera-right={38} shadow-camera-top={40} shadow-camera-bottom={-40} shadow-camera-near={1} shadow-camera-far={100} shadow-bias={-.0005} shadow-normalBias={.04}/>
    <directionalLight position={[20,10,-15]} intensity={dark?.5:.4} color="#b1d8e4"/>
    <Landscape dark={dark}/>
    {places.map(place=><Pavilion key={place.id} place={place} copy={props.copy} dark={dark} reducedMotion={reducedMotion}/>)}
    <Player {...props}/>
    <mesh position={[-50,55,-80]}><sphereGeometry args={[dark?2.4:4,20,16]}/><meshBasicMaterial color={dark?"#e6eee0":"#f9edd2"} fog={false}/></mesh>
  </>;
}
class WorldBoundary extends Component<{children:ReactNode;onError:()=>void},{failed:boolean}> {
  state={failed:false};static getDerivedStateFromError(){return{failed:true};}componentDidCatch(){this.props.onError();}render(){return this.state.failed?null:this.props.children;}
}
function WorldCanvas(props:WorldProps) {
  const {onError}=props;
  const [lightweight] = useState(() => {
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    return matchMedia("(max-width: 900px), (pointer: coarse)").matches || (device.deviceMemory !== undefined && device.deviceMemory < 4) || device.connection?.saveData === true;
  });
  const [supported] = useState(()=> {
    try {const canvas=document.createElement("canvas");const gl=canvas.getContext("webgl2");if(!gl)return false;gl.getExtension("WEBGL_lose_context")?.loseContext();return true;}catch{return false;}
  });
  useEffect(()=>{if(!supported)onError();},[supported,onError]);
  if(!supported)return null;
  return <WorldBoundary onError={props.onError}><Canvas shadows="percentage" dpr={lightweight ? 1 : [1,1.5]} camera={{position:[31,25,55],fov:52,near:.1,far:200}} gl={{antialias:!lightweight,alpha:false,powerPreference:"high-performance"}} style={{position:"absolute",inset:0,touchAction:"none",cursor:props.entered?"grab":"default"}} fallback={null} onCreated={({gl})=>{gl.setClearColor(new Color("#bed8de"));}}><WorldScene {...props} lightweight={lightweight}/></Canvas></WorldBoundary>;
}

export default memo(WorldCanvas);

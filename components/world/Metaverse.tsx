"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Compass, CornerDownLeft, Expand, Eye, Footprints, Globe2, Home, LoaderCircle, Map, Moon, MousePointer2, Move, Navigation, RotateCcw, Sparkles, Sun, X } from "lucide-react";
import { getDictionary } from "@/lib/content";
import { languageNames, locales, type Locale } from "@/lib/i18n";
import { usePreferences } from "@/lib/preferences";
import { emptyControls, places, verseCopy, type LocationState, type PlaceId, type Teleport } from "@/lib/verse";
import TouchJoystick from "./TouchJoystick";
import StoryPanel, { WorldDialog } from "./StoryPanel";
import type { WorldProps } from "./WorldCanvas";

const WorldCanvas=dynamic<WorldProps>(()=>import("./WorldCanvas"),{ssr:false});
const movementKeys:Partial<Record<string,"forward"|"backward"|"left"|"right"|"sprint">>={w:"forward",arrowup:"forward",s:"backward",arrowdown:"backward",a:"left",arrowleft:"left",d:"right",arrowright:"right",shift:"sprint"};
const mapPoint=(x:number,z:number)=>({left:`${((x+27)/54)*100}%`,top:`${((z+25)/62)*100}%`});

export default function Metaverse({locale}:{locale:Locale}) {
  const d=getDictionary(locale),c=verseCopy[locale];
  const {theme,themePreference,reducedMotion,setThemePreference}=usePreferences();
  const [entered,setEntered]=useState(false),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[retry,setRetry]=useState(0);
  const [panel,setPanel]=useState<PlaceId|"map"|"help"|null>(null),[firstPerson,setFirstPerson]=useState(false),[showArrival,setShowArrival]=useState(true);
  const [location,setLocation]=useState<LocationState>({x:0,z:11.5,yaw:0,nearest:null}),[teleport,setTeleport]=useState<Teleport|null>(null),[visited,setVisited]=useState<PlaceId[]>([]),[toast,setToast]=useState("");
  const controls=useRef(emptyControls()),worldRef=useRef<HTMLDivElement>(null),sequence=useRef(0),timer=useRef<ReturnType<typeof setTimeout>|null>(null),nearest=useRef<PlaceId|null>(null);
  const paused=panel!==null;
  const [isFullscreen,setIsFullscreen]=useState(false);
  useEffect(()=>{const change=()=>setIsFullscreen(Boolean(document.fullscreenElement));document.addEventListener("fullscreenchange",change);return()=>document.removeEventListener("fullscreenchange",change);},[]);
  const onReady=useCallback(()=>setReady(true),[]),onError=useCallback(()=>setFailed(true),[]),onLocation=useCallback((value:LocationState)=>{nearest.current=value.nearest;setLocation(prev=>Math.abs(prev.x-value.x)>.04||Math.abs(prev.z-value.z)>.04||Math.abs(prev.yaw-value.yaw)>.01||prev.nearest!==value.nearest?value:prev);},[]);
  const notify=useCallback((message:string)=> {setToast(message);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setToast(""),4000);},[]);
  const openPlace=useCallback((id:PlaceId)=>{setToast("");setPanel(id);setVisited(current=>current.includes(id)?current:[...current,id]);controls.current=emptyControls();},[]);
  const resume=()=>{setPanel(null);requestAnimationFrame(()=>worldRef.current?.focus({preventScroll:true}));};
  const enter=()=> {setEntered(true);requestAnimationFrame(()=>worldRef.current?.focus({preventScroll:true}));setShowArrival(true);controls.current=emptyControls();};
  const travel=(id:PlaceId)=> {const place=places.find(p=>p.id===id)!;setTeleport({x:place.arrival[0],z:place.arrival[1],yaw:place.facing,sequence:++sequence.current});controls.current=emptyControls();setPanel(null);requestAnimationFrame(()=>worldRef.current?.focus({preventScroll:true}));setShowArrival(false);notify(`${c.teleportAnnouncement} ${c[id]}`);};
  const reset=()=>{setTeleport({x:0,z:11.5,yaw:0,sequence:++sequence.current});controls.current=emptyControls();setPanel(null);requestAnimationFrame(()=>worldRef.current?.focus({preventScroll:true}));};
  useEffect(()=> {
    if(!entered||failed)return;
    const clear=()=>{controls.current=emptyControls();};
    const down=(event:KeyboardEvent)=> {
      if(event.metaKey||event.ctrlKey||event.altKey)return;
      if(event.target instanceof HTMLElement&&event.target.closest("input,select,textarea,dialog,[contenteditable=true]"))return;
      if(paused)return;
      const key=event.key.toLowerCase();
      const field=movementKeys[key];
      if(field){event.preventDefault();controls.current[field]=true;if(!event.repeat && field!=="sprint")controls.current.step=[field==="right"?1:field==="left"?-1:0,field==="forward"?1:field==="backward"?-1:0,.22];setShowArrival(false);}
      if(event.repeat)return;
      if(key==="enter"||key==="e"){if(key==="enter" && event.target instanceof HTMLElement && event.target.closest("button,a"))return;event.preventDefault();if(nearest.current)openPlace(nearest.current);}
      if(key==="v"){event.preventDefault();setFirstPerson(value=>!value);}
      if(key==="m"){event.preventDefault();clear();setPanel("map");}
    };
    const up=(event:KeyboardEvent)=> {
      const field=movementKeys[event.key.toLowerCase()];
      if(field)controls.current[field]=false;
    };
    document.addEventListener("keydown",down);document.addEventListener("keyup",up);window.addEventListener("blur",clear);document.addEventListener("visibilitychange",clear);
    return()=>{document.removeEventListener("keydown",down);document.removeEventListener("keyup",up);window.removeEventListener("blur",clear);document.removeEventListener("visibilitychange",clear);clear();};
  },[entered,failed,paused,openPlace]);
  useEffect(()=>{if(!entered)return;const timeout=setTimeout(()=>setShowArrival(false),14000);return()=>clearTimeout(timeout);},[entered]);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  useEffect(()=>{const previous=document.body.style.overflow;document.body.style.setProperty("overflow","hidden");return()=>{document.body.style.setProperty("overflow",previous);};},[]);
  const copyEmail=async()=> {try{await navigator.clipboard.writeText(d.contact.email);notify(c.copied);}catch{notify(c.copyError);}};
  const fullscreen=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await worldRef.current?.requestFullscreen();}catch{notify(c.fullscreenError);}};
  const moveJoystick=useCallback((x:number,y:number)=>{controls.current.moveX=x;controls.current.moveZ=-y;if(x||y)setShowArrival(false);},[]);
  const lookJoystick=useCallback((x:number,y:number)=>{controls.current.lookX=x;controls.current.lookY=y;},[]);

  return <div className={`verse ${entered?"v-entered":"v-entrance"} ${theme==="dark"?"v-night":"v-day"}`} ref={worldRef} tabIndex={-1} data-motion={reducedMotion?"reduced":"full"}>
    <div className="v-canvas" aria-label={c.webgl}>{!failed&&<WorldCanvas key={`${locale}-${retry}`} entered={entered} theme={theme} reducedMotion={reducedMotion} paused={paused} firstPerson={firstPerson} controls={controls} teleport={teleport} copy={c} onLocation={onLocation} onReady={onReady} onError={onError}/>}</div>
    {!entered&&<div className="v-entrance-shade"/>}
    <header className="v-header"><button className="v-brand" onClick={()=>{setEntered(false);setPanel(null);reset();}} aria-label={c.back}><span className="v-brand-icon">h<span>/</span></span><span>{c.brand}<small>{entered?c.world:c.subtitle}</small></span></button><div className="v-header-tools">
      {entered&&<button className="v-icon v-header-map" aria-label={c.map} title={c.map} onClick={()=>setPanel("map")}><Map size={18}/></button>}
      <button className="v-icon" aria-label={`${c.theme}: ${theme==="dark"?c.night:c.day}`} title={c.theme} onClick={()=>setThemePreference(theme==="dark"?"light":"dark")}>{theme==="dark"?<Moon size={17}/>:<Sun size={17}/>}</button>
      <div className="v-language"><Globe2 size={15}/><select value={locale} aria-label={c.language} onChange={event=>{document.cookie=`haider-locale=${event.target.value};path=/;max-age=31536000;SameSite=Lax`;
        // A full document navigation refreshes server-rendered html lang and dir.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign(`/${event.target.value}`);
      }}>{locales.map(lang=><option value={lang} key={lang}>{lang===locale?lang.toUpperCase():languageNames[lang]}</option>)}</select><ChevronDown size={11}/></div>
      {entered&&<button className="v-icon v-exit" aria-label={c.exit} title={c.exit} onClick={()=>{setEntered(false);reset();}}><Home size={17}/></button>}
    </div></header>

    {!entered&&!failed&&<main className="v-welcome"><span className="v-kicker"><span/>{c.world}</span><h1>{c.title[0]}<br/><em>{c.title[1]}</em></h1><p>{c.introduction}</p><div className="v-entry-actions"><button className="v-button v-button-enter" onClick={enter} disabled={!ready}>{ready?<><span>{c.enter}</span><ArrowUpRight size={21}/></>:<><LoaderCircle className="v-spinner" size={18}/>{c.preparing}</>}</button><a className="v-read-link" href={`/${locale}/profile`}>{c.read}<ArrowUpRight size={14}/></a></div><div className="v-welcome-notes"><span><Footprints size={14}/>{c.six}</span><span className="v-note-divider"/><span>{c.homeHint}</span></div></main>}
    {!entered&&!failed&&<footer className="v-entrance-footer"><div><span className="v-keyboard-mini"><kbd>W</kbd><span><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span></span><span>{c.move}<small>{c.movementHint}</small></span></div><div><MousePointer2 size={23} strokeWidth={1.2}/><span>{c.look}<small>{c.mouse}</small></span></div><div><span className="v-enter-key"><CornerDownLeft size={21}/></span><span>{c.explore}<small>{c.prompt}</small></span></div><span className="v-edition">HA — 2026<span>{c.footer}</span></span></footer>}

    {failed&&<div className="v-error-card"><Compass size={35} strokeWidth={1}/><h1>{c.errorTitle}</h1><p>{c.errorDescription}</p><div><a className="v-button v-button-enter" href={`/${locale}/profile`}>{c.read}<ArrowUpRight size={18}/></a><button className="v-read-link" onClick={()=>{setReady(false);setFailed(false);setRetry(value=>value+1);}}>{c.retry}</button></div></div>}
    {entered&&!failed&&<>
      <div className="v-location-pill"><span className="v-status-dot"/><span>{location.nearest?c[location.nearest]:c.courtyard}</span><span className="v-location-separator"/><Navigation size={12} style={{transform:`rotate(${-location.yaw*180/Math.PI}deg)`}}/></div>
      <button className="v-mini-map" aria-label={c.map} title={c.map} onClick={()=>setPanel("map")}><div className="v-mini-map-grid"><div className="v-map-path v-map-path-v"/><div className="v-map-path v-map-path-h"/><div className="v-map-tree"/>{places.map(p=><span key={p.id} className={`v-map-building ${visited.includes(p.id)?"visited":""}`} style={mapPoint(p.x,p.z)}/>)}<span className="v-map-player" style={{...mapPoint(location.x,location.z),transform:`translate(-50%,-50%) rotate(${-location.yaw*180/Math.PI}deg)`}}><Navigation size={12} fill="currentColor"/></span></div><span>{c.map}<Expand size={11}/></span></button>
      {showArrival&&!location.nearest&&<div className="v-arrival"><span><Sparkles size={15}/>{c.controlsTitle}</span><p>{c.hint}</p><button aria-label={c.close} onClick={()=>setShowArrival(false)}><X size={14}/></button></div>}
      {location.nearest&&!panel&&<button className="v-interaction" onClick={()=>openPlace(location.nearest!)}><span className="v-interaction-key"><CornerDownLeft size={22}/></span><span><small>{c.nearby}</small><strong>{c[location.nearest]}</strong><span className="v-desktop-prompt">{c.prompt}</span><span className="v-touch-prompt">{c.interact}</span></span><ArrowUpRight size={18}/></button>}
      <div className="v-world-toolbar"><div className="v-controls-reminder"><span className="v-key-cap">W A S D</span><span>{c.move}</span><i/><MousePointer2 size={13}/><span>{c.look}</span></div><div className="v-toolbar-buttons"><button aria-label={c.map} title={`${c.map} (M)`} onClick={()=>setPanel("map")}><Map size={18}/></button><button aria-label={firstPerson?c.thirdPerson:c.firstPerson} title={`${c.view} (V)`} aria-pressed={firstPerson} onClick={()=>setFirstPerson(value=>!value)}><Eye size={18}/></button><button aria-label={c.reset} title={c.reset} onClick={reset}><RotateCcw size={17}/></button><button aria-label={isFullscreen?c.exitFullscreen:c.fullscreen} title={isFullscreen?c.exitFullscreen:c.fullscreen} onClick={fullscreen} className="v-fullscreen"><Expand size={17}/></button><span/><button aria-label={c.help} title={c.help} onClick={()=>setPanel("help")}><CircleHelp size={18}/></button></div><span className="v-visited">{String(visited.length).padStart(2,"0")}<span>/ 06</span></span></div>
      {!paused && <><TouchJoystick kind="movement" label={c.moveJoystick} hint={c.joystickHint} onChange={moveJoystick}/><TouchJoystick kind="look" label={c.lookJoystick} hint={c.joystickHint} onChange={lookJoystick}/></>}
      <div className="v-world-caption"><span className="v-status-dot"/>{c.soundNote}</div>
    </>}

    {panel==="map"&&<WorldDialog title={c.map} eyebrow={c.navigation} onClose={resume} closeLabel={c.close} className="v-map-dialog"><p className="v-place-description">{c.mapHint}</p><div className="v-directory-list">{places.map((p,i)=><button key={p.id} onClick={()=>travel(p.id)}><span className="v-directory-no">0{i+1}</span><span className="v-directory-place"><strong>{c[p.id]}{visited.includes(p.id)&&<Check size={13}/>}</strong><small>{c.placeDescriptions[p.id]}</small></span><span className="v-travel-label">{c.travel}</span><ArrowUpRight size={19}/></button>)}</div><footer className="v-dialog-footer"><span>{c.progress}: {visited.length} / 6</span><button className="v-link" onClick={reset}>{c.reset}<RotateCcw size={14}/></button></footer></WorldDialog>}
    {panel==="help"&&<WorldDialog title={c.controlsTitle} eyebrow={c.help} onClose={resume} closeLabel={c.close} className="v-help-dialog"><p className="v-place-description">{c.controlsDescription}</p><div className="v-help-grid"><article><Move size={25}/><h3>{c.move}</h3><p>{c.movementHint}</p><div><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div></article><article><MousePointer2 size={25}/><h3>{c.look}</h3><p>{c.lookHint}</p></article><article><CornerDownLeft size={25}/><h3>{c.explore}</h3><p>{c.interactHint}</p><kbd>Enter</kbd></article><article><Eye size={25}/><h3>{c.view}</h3><p>{c.perspectiveHint}</p><kbd>V</kbd></article></div><p className="v-touch-hint">{c.touchHint}</p><div className="v-help-preferences"><button className="v-link" onClick={()=>setThemePreference("system")} aria-pressed={themePreference==="system"}>{c.system}{themePreference==="system"&&<Check size={14}/>}</button><a className="v-link" href={`/${locale}/profile`}>{c.read}<ArrowUpRight size={14}/></a></div><footer className="v-dialog-footer"><span>{c.soundNote}</span><button className="v-button v-button-dark" onClick={resume}>{c.ready}<ArrowRight size={17}/></button></footer></WorldDialog>}
    {panel&&panel!=="map"&&panel!=="help"&&<StoryPanel key={panel} place={panel} d={d} c={c} onClose={resume} onCopy={copyEmail} feedback={toast}/>}
    <div className={`v-toast ${toast?"v-toast-visible":""}`} role="status" aria-live="polite">{toast&&<><Check size={15}/>{toast}</>}</div>
    <span className="sr-only" role="status" aria-live="polite">{entered&&location.nearest?`${c.nearby}: ${c[location.nearest]}. ${c.prompt}`:""}</span>
  </div>;
}

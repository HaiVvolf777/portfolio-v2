"use client";

import { memo, useCallback, useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { Eye, Move } from "lucide-react";

type JoystickProps = {
  kind: "movement" | "look";
  label: string;
  hint: string;
  onChange: (x: number, y: number) => void;
};

/** A captured pointer drives normalized axes; the spring animation is visual only. */
function TouchJoystick({ kind, label, hint, onChange }: JoystickProps) {
  const base = useRef<HTMLButtonElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const pointer = useRef<{ id: number; x: number; y: number; travel: number } | null>(null);
  const keys = useRef(new Set<string>());

  const paint = useCallback((x: number, y: number, travel: number, active: boolean) => {
    base.current?.setAttribute("data-active", String(active));
    thumb.current?.style.setProperty("--stick-x", `${x * travel}px`);
    thumb.current?.style.setProperty("--stick-y", `${y * travel}px`);
    const magnitude = Math.hypot(x, y);
    // Ignore small movements near the center without losing proportional speed.
    const force = magnitude <= .1 ? 0 : Math.min(1, (magnitude - .1) / .9);
    onChange(magnitude ? x / magnitude * force : 0, magnitude ? y / magnitude * force : 0);
  }, [onChange]);

  const reset = useCallback(() => {
    pointer.current = null;
    keys.current.clear();
    paint(0, 0, 0, false);
  }, [paint]);

  useEffect(() => {
    const visibility = () => { if (document.hidden) reset(); };
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
      reset();
    };
  }, [reset]);

  const update = (event: PointerEvent<HTMLButtonElement>) => {
    const origin = pointer.current;
    if (!origin || origin.id !== event.pointerId) return;
    const dx = event.clientX - origin.x, dy = event.clientY - origin.y;
    const distance = Math.hypot(dx, dy);
    const divisor = Math.max(origin.travel, distance);
    paint(dx / divisor, dy / divisor, origin.travel, true);
  };

  const start = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || pointer.current) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const thumbSize = thumb.current?.offsetWidth ?? rect.width / 2;
    pointer.current = { id: event.pointerId, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, travel: Math.max(10, (rect.width - thumbSize) / 2 - 6) };
    event.currentTarget.setPointerCapture(event.pointerId);
    update(event);
  };

  const release = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointer.current?.id !== event.pointerId) return;
    reset();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, pressed: boolean) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    if (pressed) keys.current.add(event.key); else keys.current.delete(event.key);
    const x = Number(keys.current.has("ArrowRight")) - Number(keys.current.has("ArrowLeft"));
    const y = Number(keys.current.has("ArrowDown")) - Number(keys.current.has("ArrowUp"));
    const length = Math.max(1, Math.hypot(x, y));
    const travel = Math.max(10, ((base.current?.offsetWidth ?? 108) - (thumb.current?.offsetWidth ?? 50)) / 2 - 6);
    paint(x / length, y / length, travel, keys.current.size > 0);
  };

  return <div className={`v-joystick-wrap v-joystick-${kind}`}>
    <button ref={base} type="button" className="v-joystick" aria-label={label} aria-describedby={`joystick-${kind}-hint`} title={label} data-active="false"
      onPointerDown={start} onPointerMove={update} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={reset}
      onKeyDown={event => keyboard(event, true)} onKeyUp={event => keyboard(event, false)} onBlur={reset} onContextMenu={event => event.preventDefault()}>
      <span className="v-joystick-orbit" aria-hidden="true" />
      <span className="v-joystick-ticks" aria-hidden="true"><i /><i /><i /><i /></span>
      <span ref={thumb} className="v-joystick-thumb" aria-hidden="true">{kind === "look" ? <Eye size={22} strokeWidth={1.6} /> : <Move size={23} strokeWidth={1.4} />}</span>
    </button>
    <span id={`joystick-${kind}-hint`} className="sr-only">{hint}</span>
  </div>;
}

export default memo(TouchJoystick);

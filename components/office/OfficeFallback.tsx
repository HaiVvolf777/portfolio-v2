import { useId } from "react";

export type OfficeFallbackProps = { theme: "light" | "dark"; label: string };

/** An asset-free, accessible room illustration while the WebGL scene loads. */
export function OfficeFallback({ theme, label }: OfficeFallbackProps) {
  const id = useId().replaceAll(":", "");
  const dark = theme === "dark";
  const stone = dark ? "#344654" : "#e5e8e2";
  const wall = dark ? "#415769" : "#f1f0e9";
  const edge = dark ? "#1c2d3d" : "#bfcbd0";
  return (
    <svg viewBox="0 0 900 700" role="img" aria-label={label} style={{ display: "block", width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#124d79" /><stop offset="1" stopColor="#082e4d" /></linearGradient>
        <linearGradient id={`${id}-orb`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#75c6ff" /><stop offset=".5" stopColor="#238ae1" /><stop offset="1" stopColor="#155598" /></linearGradient>
        <radialGradient id={`${id}-shadow`}><stop stopColor={dark ? "#081524" : "#8095a2"} stopOpacity=".22" /><stop offset="1" stopColor={dark ? "#081524" : "#8095a2"} stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="448" cy="559" rx="370" ry="106" fill={`url(#${id}-shadow)`} />
      <path d="M85 417 425 223 821 452 480 650Z" fill={edge} />
      <path d="M85 399 425 203 821 432 480 630Z" fill={stone} />
      <path d="M85 399v18l395 233v-20Zm395 231 341-198v20L480 650Z" fill={edge} />
      <path d="M100 399 425 211 805 432 480 620Z" fill={wall} />
      <g fill="none" stroke={edge} strokeWidth="1" opacity=".5"><path d="m209 462 328-188m-219 252 328-188M425 588l326-188M211 335l380 221M318 272l381 222" /></g>
      <path d="M85 399V178L425 0v211Z" fill={stone} transform="translate(0 92) scale(1 .77)" />
      <path d="m85 231 340-196 396 229v221L425 256 85 452Z" fill="none" />
      <path d="m98 392 327-189V73L98 262Z" fill={stone} />
      <path d="M425 73v130l383 222V295Z" fill={wall} />
      <path d="m442 103 195 113v107L442 210Z" fill={dark ? "#163e5a" : "#bdd0d8"} />
      <path d="m438 97 205 119" stroke="#a5d8fa" strokeWidth="3" />
      <path d="m106 265 125-72v166l-125 72Z" fill="#6facc0" opacity=".23" />
      <g stroke={dark ? "#708a9c" : "#94aab3"} strokeWidth="3" fill="none"><path d="m107 265 125-72v166l-125 72Zm63-36v167" /></g>
      <path d="m94 258 331-191 385 222M98 258l383 223 199-115M680 366v196" stroke={stone} strokeWidth="9" fill="none" />
      <path d="m107 261 371 213" stroke="#e5f6ff" strokeWidth="2" />
      <path d="m288 359 169-98 178 103-169 98Z" fill="#263944" />
      <path d="m288 359 178 103v10L288 369Zm178 103 169-98v10L466 472Z" fill="#142a39" />
      <path d="m301 370 11 6v83l-11-6Zm147 85 12 7v80l-12-7Zm167-86 10-6v81l-10 6Z" fill="#253843" />
      <path d="m365 297 89 51v-88l-89-51Z" fill="#1a2933" />
      <path d="m371 291 76 44v-71l-76-44Z" fill={`url(#${id}-screen)`} />
      <path d="m402 324v28l-13 7 26 15 21-12-19-11v-18" fill="#243540" />
      <g strokeLinecap="round" strokeWidth="2"><path d="m380 241 21 12m-21-4 33 19m-33-11 14 8m-14 0 31 18m-31-10 19 11m-19-3 29 17" stroke="#68a9e2" /><path d="m405 255 21 12m-7 4 17 10m-37-13 27 15m-11 2 22 13m-33-10 15 9" stroke="#9acbc2" /></g>
      <path d="m359 372 51-29 53 31-51 30Z" fill="#a8b9c1" /><path d="m365 371 46-25 43 26-43 25Z" fill="#78919f" />
      <g stroke="#b3c7d1" strokeWidth="1.6"><path d="m373 373 40-22m-33 27 40-22m-33 27 40-22m-33 27 39-22m-47-8 41 24m-31-29 40 23m-30-29 41 24" /></g>
      <path d="m334 421 49-28 44 25-49 29Z" fill="#526e7b" /><path d="m335 420 43 25v67l-43-25Z" fill="#4d6673" /><path d="m378 445 49-28v68l-49 27Z" fill="#6d8490" /><path d="M380 509v36m0-7-28 15m28-15 27 16m-27-16 25-15" stroke="#273d4b" strokeWidth="5" />
      <path d="m656 283 56 32v129l-56-33Z" fill="#1c3544" /><path d="m712 315 34-20v129l-34 20Z" fill="#345768" /><path d="m656 283 33-20 57 32-34 20Z" fill="#395969" />
      <g stroke="#558ba8" strokeWidth="13"><path d="m666 311 36 21m-36 5 36 21m-36 6 36 20m-36 6 36 21" /></g><g stroke="#86d8fc" strokeWidth="3"><path d="m667 309 6 3m-6 24 6 3m-6 24 6 3m-6 24 6 3" /></g>
      <path d="m647 232 56 33v56l-56-33Z" fill="#7b9bb1" /><path d="m653 242 43 25v42l-43-25Z" fill="#dfebe8" /><path d="m659 259 9 5v12l-9-5m15-9 9 5v12l-9-5m14-6 5 3v12l-5-3" fill="#8cbed9" />
      <ellipse cx="596" cy="483" rx="63" ry="35" fill={edge} /><path d="M533 474v12c0 44 126 44 126 0v-12" fill={stone} /><ellipse cx="596" cy="474" rx="63" ry="35" fill={wall} /><path d="M557 454v15c0 29 78 29 78 0v-15" fill={stone} /><ellipse cx="596" cy="454" rx="39" ry="22" fill="#448bbc" /><ellipse cx="596" cy="452" rx="31" ry="17" fill="#173b5b" /><path d="m568 387 7 62q21 13 43 0l9-62Z" fill="#39a5f7" opacity=".07" />
      <path d="m596 327 37 25 6 39-43 28-38-30-2-37Z" fill={`url(#${id}-orb)`} stroke="#74c5fb" strokeWidth="1" /><path d="m596 327-11 46-29-21m29 21 54 18-6-39-48 21 11 46m-38-30 27-16 11 46" fill="none" stroke="#a1dbff" strokeWidth="1" opacity=".7" />
      <g fill="none" stroke="#6caed6" strokeWidth="2"><ellipse cx="596" cy="373" rx="59" ry="17" transform="rotate(-26 596 373)" /><ellipse cx="596" cy="373" rx="25" ry="54" transform="rotate(-30 596 373)" /></g>
      <path d="m187 425 45-27 54 32-44 26Z" fill={wall} /><path d="m187 425 55 31v35l-55-31Z" fill={stone} /><path d="m242 456 44-26v35l-44 26Z" fill={edge} /><path d="m220 413 31 18v-29l-31-18Z" fill="#224a64" /><path d="m229 402 13 8v9l-13-8Z" fill="#8fcbf2" />
      <g transform="translate(709 476)"><path d="M-14-5h30l-4 31q-11 9-22 0Z" fill="#a4b4a9" /><ellipse cy="-5" rx="16" ry="8" fill="#788f79" /><path d="M0-5v-68m0 47-20-22m20 30 19-30" stroke="#577453" strokeWidth="4" /><g fill="#557f65"><ellipse cx="-11" cy="-45" rx="9" ry="22" transform="rotate(-34 -11 -45)" /><ellipse cx="11" cy="-49" rx="9" ry="23" transform="rotate(35 11 -49)" /><ellipse cx="0" cy="-68" rx="9" ry="20" /></g></g>
      <g transform="translate(293 294) scale(.8)"><path d="M-14-5h30l-4 31q-11 9-22 0Z" fill="#a4b4a9" /><path d="M0-5v-68" stroke="#577453" strokeWidth="4" /><g fill="#64836c"><ellipse cx="-11" cy="-45" rx="9" ry="22" transform="rotate(-34 -11 -45)" /><ellipse cx="11" cy="-49" rx="9" ry="23" transform="rotate(35 11 -49)" /><ellipse cx="0" cy="-68" rx="9" ry="20" /></g></g>
      <path d="m445 610 61-35 99 58-61 35Z" fill={stone} /><path d="m460 638 49-28 79 45-49 28Z" fill={wall} />
      <path d="m94 416 386 224 333-194" fill="none" stroke="#75bce7" strokeWidth="1.7" opacity=".8" />
    </svg>
  );
}

export default OfficeFallback;

import { ArrowUpRight, Braces, Check, Fingerprint, GitBranch, Layers3, ShieldCheck, Workflow } from "lucide-react";

export function CarOutline({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 440 210" fill="none" aria-hidden="true">
      <path d="M52 134 64 100c4-10 11-14 24-16l66-12 42-35c7-6 16-8 27-8h62c16 0 27 5 36 16l27 34 40 9c13 3 20 11 22 23l3 29-15 13h-37M138 153h151M59 154H39l-5-24 18-8" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m167 74 34-31h23v32l-57-1ZM237 43h43c10 0 19 3 26 12l17 22-87-2 1-32ZM70 106l59-6-18 16-48 2M370 107l21 5M235 83v46M160 84l-10 43M207 88h13M292 89h12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="102" cy="147" r="33" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="102" cy="147" r="19" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="330" cy="147" r="33" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="330" cy="147" r="19" stroke="currentColor" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => <g key={i} transform={`rotate(${i * 72} 102 147)`}><path d="m100 129 2 18 9 12" stroke="currentColor" /></g>)}
      {[0, 1, 2, 3, 4].map((i) => <g key={i} transform={`rotate(${i * 72} 330 147)`}><path d="m328 129 2 18 9 12" stroke="currentColor" /></g>)}
      <path d="M16 191h410" stroke="currentColor" strokeOpacity=".15" />
    </svg>
  );
}

export default function ProjectVisual({ id, featured = false }: { id: string; featured?: boolean }) {
  if (featured || id.includes("dubicars")) {
    return (
      <div className="project-art car-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="scan-frame"><i /><i /><i /><i /><CarOutline /><div className="scan-line" /></div>
        <div className="detection-node node-one"><span /><span /><Check size={10} /></div>
        <div className="detection-node node-two"><span /><span /><Check size={10} /></div>
        <div className="art-badge"><span className="live-dot" />DubiCars <ArrowUpRight size={13} /></div>
      </div>
    );
  }
  if (id.includes("kyc")) {
    return (
      <div className="project-art identity-art" aria-hidden="true">
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <div className="identity-document"><Fingerprint size={38} strokeWidth={1} /><div><i /><i /><i /></div><span><ShieldCheck size={20} /></span></div>
        <div className="floating-chip chip-one"><Braces size={19} /></div><div className="floating-chip chip-two"><Check size={18} /></div>
      </div>
    );
  }
  if (id.includes("n8n") || id.includes("automation")) {
    return (
      <div className="project-art workflow-art" aria-hidden="true">
        <svg viewBox="0 0 350 170"><path d="M45 85H114Q135 85 135 62V40H205M135 85H205M135 85v33q0 18 18 18h52M245 40h20q15 0 15 20v25h28M245 136h20q15 0 15-20V85M245 85h63" /></svg>
        <div className="workflow-node workflow-start"><Workflow size={25} /></div>
        <div className="workflow-node workflow-a"><Braces size={19} /></div>
        <div className="workflow-node workflow-b"><GitBranch size={19} /></div>
        <div className="workflow-node workflow-c"><Layers3 size={19} /></div>
        <div className="workflow-node workflow-end"><Check size={16} /></div>
      </div>
    );
  }
  if (id.includes("vpn") || id.includes("bolt")) {
    return <div className="project-art vpn-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="vpn-shield"><ShieldCheck size={70} strokeWidth={.8} /></div><span className="vpn-dot a" /><span className="vpn-dot b" /><span className="vpn-dot c" /></div>;
  }
  return (
    <div className={`project-art platform-art ${id.includes("parker") || id.includes("empy") ? "web3-art" : ""}`} aria-hidden="true">
      <div className="browser-mini"><div className="browser-bar"><i /><i /><i /><span /></div><div className="browser-inner"><div className="browser-sidebar"><i /><i /><i /></div><div className="browser-content"><span /><i /><div><b /><b /><b /></div><i /></div></div></div>
      <div className="floating-chip chip-two"><ArrowUpRight size={19} /></div>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./App.css";

// Oru cycle-la ovvoru step-um oru phase + oru message.
const STEPS = [
  { phase: "idle", ms: 700, msg: null },
  { phase: "send", ms: 2400, msg: "Sending request to the server…" },
  { phase: "shock", ms: 2000, msg: "Unexpected response received." },
  { phase: "fall", ms: 1100, msg: "The requested page could not be found." },
  { phase: "stand", ms: 1200, msg: null },
];

export default function App() {
  const [step, setStep] = useState(0);
  const { phase } = STEPS[step];

  useEffect(() => {
    const t = setTimeout(
      () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
      STEPS[step].ms
    );
    return () => clearTimeout(t);
  }, [step]);

 const current = STEPS[step].msg;
  return (
    <div className="page" data-phase={phase}>
      <main className="stage">
        <h1 className="code">404</h1>
        <p className="error-label">ERROR</p>

        <svg
          className="scene"
          viewBox="0 0 600 280"
          role="img"
          aria-label="A monkey between a monitor and a computer gets an electric shock and falls down"
        >
          {/* ground */}
          <path
            className="ground"
            d="M20 232 Q300 214 580 232 L580 248 L20 248 Z"
          />

          {/* wires: base */}
          <path className="wire" d="M120 188 C190 215 230 200 292 196" />
          <path className="wire" d="M480 188 C410 215 370 200 308 196" />
          {/* wires: signal pulses (monitor + CPU same time) */}
          <path
            className="pulse"
            pathLength="100"
            d="M120 188 C190 215 230 200 292 196"
          />
          <path
            className="pulse"
            pathLength="100"
            d="M480 188 C410 215 370 200 308 196"
          />

          {/* MONITOR */}
          <g className="monitor">
            <rect className="mon-frame" x="40" y="145" width="82" height="62" rx="5" />
            <rect className="mon-screen" x="47" y="152" width="68" height="46" rx="2" />
            <polyline
              className="mon-line"
              pathLength="100"
              points="52,184 63,170 73,180 85,163 96,176 109,160"
            />
            <circle className="mon-led" cx="108" cy="203" r="2.2" />
            <rect className="mon-stand" x="76" y="207" width="9" height="14" />
            <rect className="mon-base" x="62" y="220" width="38" height="8" rx="3" />
          </g>

          {/* COMPUTER (CPU tower) */}
          <g className="cpu">
            <rect className="cpu-body" x="478" y="135" width="52" height="94" rx="5" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  className="cpu-bay"
                  x="484"
                  y={141 + i * 29}
                  width="40"
                  height="24"
                  rx="3"
                />
                <circle
                  className={`cpu-led led-${i}`}
                  cx="494"
                  cy={153 + i * 29}
                  r="2.4"
                />
                <rect
                  className={`cpu-bar bar-${i}`}
                  x="502"
                  y={151 + i * 29}
                  width="16"
                  height="4"
                  rx="2"
                />
              </g>
            ))}
          </g>

          {/* MONKEY */}
          <g className="pose">
            <g className="body">
              {/* tail */}
              <path className="tail" d="M278 212 C246 214 244 168 268 170" />
              {/* feet */}
              <ellipse className="skin" cx="288" cy="228" rx="9" ry="5" />
              <ellipse className="skin" cx="312" cy="228" rx="9" ry="5" />
              {/* body */}
              <path className="fur" d="M274 226 L282 172 H318 L326 226 Z" />
              <ellipse className="belly" cx="300" cy="196" rx="10" ry="16" />
              {/* arms */}
              <path className="arm" d="M282 178 L262 200" />
              <path className="arm" d="M318 178 L338 200" />
              <circle className="skin" cx="261" cy="202" r="5" />
              <circle className="skin" cx="339" cy="202" r="5" />
              {/* head */}
              <circle className="skin" cx="271" cy="150" r="8" />
              <circle className="skin" cx="329" cy="150" r="8" />
              <circle className="head" cx="300" cy="148" r="28" />
              <path className="hair" d="M274 140 Q300 118 326 140 Q300 130 274 140 Z" />
              <ellipse className="face" cx="300" cy="154" rx="17" ry="15" />
              {/* eyes: normal */}
              <g className="eyes-ok">
                <circle cx="292" cy="150" r="2.4" />
                <circle cx="308" cy="150" r="2.4" />
                <ellipse className="nose" cx="300" cy="158" rx="3" ry="2" />
                <path className="mouth" d="M294 165 Q300 169 306 165" />
              </g>
              {/* eyes: shocked */}
              <g className="eyes-shock">
                <path d="M288 146 l7 7 m0 -7 l-7 7" />
                <path d="M305 146 l7 7 m0 -7 l-7 7" />
                <ellipse className="mouth-o" cx="300" cy="164" rx="4" ry="5" />
              </g>
            </g>

            {/* sparks */}
            <g className="sparks">
              <polyline points="246,150 256,158 249,164 260,174" />
              <polyline points="354,146 344,155 352,161 340,172" />
              <polyline points="282,112 290,122 284,126 294,136" />
              <polyline points="318,112 311,121 318,126 308,136" />
            </g>
          </g>
        </svg>

        <h2 className="title">Look like you&apos;re lost</h2>
        <p className="sub">the page you are looking for is not available!</p>

        <div className="log" aria-live="polite">
          {current && (
            <p key={phase} className="log-item current">
              {current}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
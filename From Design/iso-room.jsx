/* =========================================================
   Isometric room visualisation.
   - Never overflows: auto-scales to fit its container.
   - Subtle haze tinted by current ppm (neutral grey, never blue).
   - Shows the absorber unit inside.
   ========================================================= */

function IsoRoom({
  L = 5, W = 4, H = 2.6,
  ppm = 900,
  c_amb = 420,
  c_target = 600,
  containerW = 560,
  containerH = 280,
  showLabels = true,
  people = 0,
}) {
  // Isometric projection — rotate 30° on axes
  // x' = (x - z) * cos30, y' = (x + z) * sin30 - y
  const iso = (x, y, z) => {
    const cos30 = Math.cos(Math.PI / 6);
    const sin30 = Math.sin(Math.PI / 6);
    return {
      x: (x - z) * cos30,
      y: (x + z) * sin30 - y,
    };
  };

  // All 8 vertices of the room box (interior)
  // Coordinate system: x = length, y = height, z = width
  const V = [
    iso(0, 0, 0),        // 0 back-bottom-left
    iso(L, 0, 0),        // 1 back-bottom-right
    iso(L, 0, W),        // 2 front-bottom-right
    iso(0, 0, W),        // 3 front-bottom-left
    iso(0, H, 0),        // 4 back-top-left
    iso(L, H, 0),        // 5 back-top-right
    iso(L, H, W),        // 6 front-top-right
    iso(0, H, W),        // 7 front-top-left
  ];

  // Compute bbox and fit
  const xs = V.map(p => p.x), ys = V.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const boxW = maxX - minX, boxH = maxY - minY;
  const pad = 28;
  const scale = Math.min((containerW - pad * 2) / boxW, (containerH - pad * 2) / boxH);

  const P = V.map(p => ({
    x: (p.x - minX) * scale + (containerW - boxW * scale) / 2,
    y: (p.y - minY) * scale + (containerH - boxH * scale) / 2,
  }));

  // Haze intensity: 0 at ambient, max at (c_target * 2.5) or so
  const hazeNorm = Math.max(0, Math.min(1, (ppm - c_amb) / Math.max(200, c_target * 2.0)));
  // Warm-grey haze — NEVER blue. Uses warm #C9C2B8 at low alpha.
  const hazeAlpha = 0.05 + hazeNorm * 0.28;
  // Slight red at very high ppm
  const hazeR = hazeNorm > 0.7 ? 0.85 + (hazeNorm - 0.7) * 0.5 : 0;

  // Unit position (centered on floor)
  const unitBase = { x: L * 0.55, z: W * 0.45 };
  const unitSize = { w: 0.35, h: 0.9, d: 0.22 };
  const unitVerts = [
    iso(unitBase.x, 0, unitBase.z),
    iso(unitBase.x + unitSize.w, 0, unitBase.z),
    iso(unitBase.x + unitSize.w, 0, unitBase.z + unitSize.d),
    iso(unitBase.x, 0, unitBase.z + unitSize.d),
    iso(unitBase.x, unitSize.h, unitBase.z),
    iso(unitBase.x + unitSize.w, unitSize.h, unitBase.z),
    iso(unitBase.x + unitSize.w, unitSize.h, unitBase.z + unitSize.d),
    iso(unitBase.x, unitSize.h, unitBase.z + unitSize.d),
  ].map(p => ({
    x: (p.x - minX) * scale + (containerW - boxW * scale) / 2,
    y: (p.y - minY) * scale + (containerH - boxH * scale) / 2,
  }));

  // People — placed around the perimeter, away from the unit
  const peoplePositions = React.useMemo(() => {
    const n = Math.max(0, Math.min(people, 12));
    const pts = [];
    // Deterministic positions on a semi-grid around the room
    const slots = [
      { x: 0.22, z: 0.25 }, { x: 0.22, z: 0.72 },
      { x: 0.78, z: 0.22 }, { x: 0.78, z: 0.78 },
      { x: 0.45, z: 0.20 }, { x: 0.35, z: 0.82 },
      { x: 0.15, z: 0.50 }, { x: 0.82, z: 0.52 },
      { x: 0.60, z: 0.85 }, { x: 0.30, z: 0.40 },
      { x: 0.68, z: 0.35 }, { x: 0.50, z: 0.62 },
    ];
    for (let i = 0; i < n; i++) {
      const s = slots[i];
      pts.push({ x: s.x * L, z: s.z * W });
    }
    return pts;
  }, [people, L, W]);

  // Build a person (simple silhouette: head + body) projected iso
  const personHeight = 1.7; // m
  const personHead = 0.20;  // radius in m
  const personBodyH = 1.05;
  const personBodyW = 0.38;
  const projectPerson = (px, pz) => {
    // Head center
    const head = iso(px, personHeight - personHead, pz);
    // Body top (shoulder)
    const shoulder = iso(px, personHeight - personHead * 2, pz);
    // Body bottom (feet)
    const feet = iso(px, 0, pz);
    const map = (p) => ({
      x: (p.x - minX) * scale + (containerW - boxW * scale) / 2,
      y: (p.y - minY) * scale + (containerH - boxH * scale) / 2,
    });
    return {
      head: map(head),
      shoulder: map(shoulder),
      feet: map(feet),
      sortKey: px + pz, // painter's order back-to-front
    };
  };
  const peopleProjected = peoplePositions
    .map(p => ({ ...projectPerson(p.x, p.z), ...p }))
    .sort((a, b) => a.sortKey - b.sortKey);

  // Tick marks for dimensions
  const ticks = [];
  for (let i = 1; i < L; i++) {
    const a = iso(i, 0, 0), b = iso(i, 0, W);
    ticks.push({
      x1: (a.x - minX) * scale + (containerW - boxW * scale) / 2,
      y1: (a.y - minY) * scale + (containerH - boxH * scale) / 2,
      x2: (b.x - minX) * scale + (containerW - boxW * scale) / 2,
      y2: (b.y - minY) * scale + (containerH - boxH * scale) / 2,
    });
  }

  return (
    <svg
      width="100%" height="100%"
      viewBox={`0 0 ${containerW} ${containerH}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
    >
      {/* FLOOR */}
      <polygon
        points={`${P[0].x},${P[0].y} ${P[1].x},${P[1].y} ${P[2].x},${P[2].y} ${P[3].x},${P[3].y}`}
        fill="#EEEAE4" stroke="rgba(28,27,26,0.45)" strokeWidth="1"
      />

      {/* BACK WALL */}
      <polygon
        points={`${P[0].x},${P[0].y} ${P[1].x},${P[1].y} ${P[5].x},${P[5].y} ${P[4].x},${P[4].y}`}
        fill="#E6E1D8" stroke="rgba(28,27,26,0.45)" strokeWidth="1"
      />

      {/* LEFT WALL */}
      <polygon
        points={`${P[0].x},${P[0].y} ${P[3].x},${P[3].y} ${P[7].x},${P[7].y} ${P[4].x},${P[4].y}`}
        fill="#EBE6DE" stroke="rgba(28,27,26,0.45)" strokeWidth="1"
      />

      {/* Floor tile ticks — subtle */}
      {ticks.map((t, i) => (
        <line key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="rgba(201,194,184,0.6)" strokeWidth="1"
        />
      ))}

      {/* HAZE — tints interior. Warm grey, NEVER blue. */}
      <polygon
        points={`${P[0].x},${P[0].y} ${P[1].x},${P[1].y} ${P[5].x},${P[5].y} ${P[4].x},${P[4].y}`}
        fill={`rgba(${Math.round(201 - hazeR * 100)},${Math.round(194 - hazeR * 100)},${Math.round(184 - hazeR * 100)},${hazeAlpha})`}
        style={{ transition: 'fill 520ms cubic-bezier(.2,.8,.2,1)' }}
      />
      <polygon
        points={`${P[0].x},${P[0].y} ${P[3].x},${P[3].y} ${P[7].x},${P[7].y} ${P[4].x},${P[4].y}`}
        fill={`rgba(${Math.round(201 - hazeR * 100)},${Math.round(194 - hazeR * 100)},${Math.round(184 - hazeR * 100)},${hazeAlpha})`}
        style={{ transition: 'fill 520ms cubic-bezier(.2,.8,.2,1)' }}
      />

      {/* Unit: base */}
      <polygon
        points={`${unitVerts[0].x},${unitVerts[0].y} ${unitVerts[1].x},${unitVerts[1].y} ${unitVerts[2].x},${unitVerts[2].y} ${unitVerts[3].x},${unitVerts[3].y}`}
        fill="#1C1B1A" opacity="0.35"
      />
      {/* Unit: front face */}
      <polygon
        points={`${unitVerts[3].x},${unitVerts[3].y} ${unitVerts[2].x},${unitVerts[2].y} ${unitVerts[6].x},${unitVerts[6].y} ${unitVerts[7].x},${unitVerts[7].y}`}
        fill="#F5F2EE" stroke="#1C1B1A" strokeWidth="1"
      />
      {/* Unit: right face */}
      <polygon
        points={`${unitVerts[1].x},${unitVerts[1].y} ${unitVerts[2].x},${unitVerts[2].y} ${unitVerts[6].x},${unitVerts[6].y} ${unitVerts[5].x},${unitVerts[5].y}`}
        fill="#E6E1D8" stroke="#1C1B1A" strokeWidth="1"
      />
      {/* Unit: top */}
      <polygon
        points={`${unitVerts[4].x},${unitVerts[4].y} ${unitVerts[5].x},${unitVerts[5].y} ${unitVerts[6].x},${unitVerts[6].y} ${unitVerts[7].x},${unitVerts[7].y}`}
        fill="#F5F2EE" stroke="#1C1B1A" strokeWidth="1"
      />
      {/* Unit: vertical slits on front (wires) */}
      {Array.from({ length: 5 }).map((_, i) => {
        const t = (i + 1) / 6;
        const xa = unitVerts[3].x + (unitVerts[2].x - unitVerts[3].x) * t;
        const ya = unitVerts[3].y + (unitVerts[2].y - unitVerts[3].y) * t;
        const xb = unitVerts[7].x + (unitVerts[6].x - unitVerts[7].x) * t;
        const yb = unitVerts[7].y + (unitVerts[6].y - unitVerts[7].y) * t;
        return <line key={i} x1={xa} y1={ya} x2={xb} y2={yb} stroke="#E4002B" strokeWidth="0.8" opacity="0.8" />;
      })}
      {/* Unit: accent dot */}
      <circle
        cx={(unitVerts[3].x + unitVerts[2].x + unitVerts[6].x + unitVerts[7].x) / 4}
        cy={(unitVerts[3].y + unitVerts[2].y + unitVerts[6].y + unitVerts[7].y) / 4 + 18}
        r="1.5" fill="#E4002B"
      />

      {/* People */}
      {peopleProjected.map((p, i) => {
        const headR = Math.max(3, 0.18 * scale);
        return (
          <g key={`person-${i}`}>
            {/* feet shadow */}
            <ellipse cx={p.feet.x} cy={p.feet.y} rx={headR * 1.1} ry={headR * 0.35} fill="rgba(28,27,26,0.22)" />
            {/* body */}
            <line
              x1={p.shoulder.x} y1={p.shoulder.y}
              x2={p.feet.x} y2={p.feet.y}
              stroke="#1C1B1A" strokeWidth={Math.max(2, headR * 0.9)} strokeLinecap="round"
            />
            {/* head */}
            <circle cx={p.head.x} cy={p.head.y} r={headR} fill="#1C1B1A" />
            {/* subtle breath indicator — tiny warm dot */}
            <circle cx={p.head.x + headR * 0.3} cy={p.head.y - headR * 0.2} r={headR * 0.35} fill="#E4002B" opacity="0.55" />
          </g>
        );
      })}

      {/* Dimension labels */}
      {showLabels && (
        <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#6B6862" style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em' }}>
          <text
            x={(P[1].x + P[2].x) / 2 + 10}
            y={(P[1].y + P[2].y) / 2 + 4}
          >
            W {W.toFixed(1)}m
          </text>
          <text
            x={(P[0].x + P[1].x) / 2}
            y={(P[0].y + P[1].y) / 2 + 14}
            textAnchor="middle"
          >
            L {L.toFixed(1)}m
          </text>
          <text
            x={P[0].x - 6}
            y={(P[0].y + P[4].y) / 2 + 3}
            textAnchor="end"
          >
            H {H.toFixed(1)}m
          </text>
        </g>
      )}
    </svg>
  );
}

Object.assign(window, { IsoRoom });

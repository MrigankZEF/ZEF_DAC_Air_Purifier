/* =========================================================
   Chart component — ppm-vs-time line chart.
   SVG, hand-rolled; tight axes, target reference line.
   ========================================================= */

const { useMemo, useState, useRef, useEffect } = React;

function PPMChart({
  series,
  c_target,
  c_amb,
  width = 780,
  height = 340,
  showTooltip = true,
  hoverIndex: controlledHover = null,
  comparisonSeries = null, // optional warm-grey baseline
}) {
  // Axis padding
  const pad = { l: 52, r: 20, t: 18, b: 36 };
  const w = width, h = height;
  const pw = w - pad.l - pad.r;
  const ph = h - pad.t - pad.b;

  const { xMax, yMin, yMax } = useMemo(() => {
    const allC = series.map(d => d.c_ppm);
    if (comparisonSeries) comparisonSeries.forEach(d => allC.push(d.c_ppm));
    allC.push(c_target, c_amb);
    const cMin = Math.min(...allC, 0);
    const cMax = Math.max(...allC);
    // Pad y range so curves never clip
    const yMin_ = Math.max(0, Math.floor(cMin / 100) * 100 - 50);
    const yMax_ = Math.ceil(cMax / 200) * 200 + 100;
    const xMax_ = series[series.length - 1].t_min;
    return { xMax: xMax_, yMin: yMin_, yMax: yMax_ };
  }, [series, comparisonSeries, c_target, c_amb]);

  const xScale = (t) => pad.l + (t / xMax) * pw;
  const yScale = (c) => pad.t + (1 - (c - yMin) / (yMax - yMin)) * ph;

  const pathFor = (data) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(d.t_min).toFixed(2)},${yScale(d.c_ppm).toFixed(2)}`).join(' ');

  const areaFor = (data) => {
    const top = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(d.t_min).toFixed(2)},${yScale(d.c_ppm).toFixed(2)}`).join(' ');
    const bl = `L${xScale(data[data.length - 1].t_min).toFixed(2)},${yScale(yMin).toFixed(2)}`;
    const br = `L${xScale(data[0].t_min).toFixed(2)},${yScale(yMin).toFixed(2)}Z`;
    return top + bl + br;
  };

  // Y ticks
  const yTicks = useMemo(() => {
    const ticks = [];
    const step = niceStep(yMax - yMin, 5);
    const start = Math.ceil(yMin / step) * step;
    for (let v = start; v <= yMax; v += step) ticks.push(v);
    return ticks;
  }, [yMin, yMax]);

  // X ticks — in minutes
  const xTicks = useMemo(() => {
    const step = niceStep(xMax, 6);
    const ticks = [];
    for (let v = 0; v <= xMax + 0.1; v += step) ticks.push(Math.round(v));
    return ticks;
  }, [xMax]);

  // Hover handling
  const [hoverI, setHoverI] = useState(null);
  const svgRef = useRef(null);
  const activeI = controlledHover != null ? controlledHover : hoverI;

  const onMove = (e) => {
    if (controlledHover != null) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = (x - pad.l) / pw;
    if (ratio < 0 || ratio > 1) { setHoverI(null); return; }
    const i = Math.round(ratio * (series.length - 1));
    setHoverI(i);
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      onMouseMove={onMove}
      onMouseLeave={() => setHoverI(null)}
      style={{ display: 'block', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Plot area border — hairline */}
      <rect
        x={pad.l} y={pad.t} width={pw} height={ph}
        fill="none" stroke="rgba(28,27,26,0.12)" strokeWidth="1"
      />

      {/* Horizontal grid */}
      {yTicks.map((v) => (
        <line
          key={`yg-${v}`}
          x1={pad.l} x2={pad.l + pw}
          y1={yScale(v)} y2={yScale(v)}
          stroke="rgba(201,194,184,0.55)" strokeWidth="1"
          strokeDasharray={v === yTicks[0] ? "0" : "2 3"}
        />
      ))}

      {/* Ambient reference (warm grey dashed) */}
      <line
        x1={pad.l} x2={pad.l + pw}
        y1={yScale(c_amb)} y2={yScale(c_amb)}
        stroke="#C9C2B8" strokeWidth="1" strokeDasharray="4 3"
      />
      <text
        x={pad.l + pw - 4} y={yScale(c_amb) - 4}
        textAnchor="end" fontSize="10"
        fill="#6B6862" fontFamily="JetBrains Mono, monospace"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        AMBIENT · {c_amb} ppm
      </text>

      {/* Target reference (accent dashed) */}
      <line
        x1={pad.l} x2={pad.l + pw}
        y1={yScale(c_target)} y2={yScale(c_target)}
        stroke="#E4002B" strokeWidth="1" strokeDasharray="4 3"
      />
      <text
        x={pad.l + 6} y={yScale(c_target) - 4}
        fontSize="10" fill="#E4002B"
        fontFamily="JetBrains Mono, monospace"
        style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em' }}
      >
        TARGET · {c_target} ppm
      </text>

      {/* Comparison (warm grey) — if passed */}
      {comparisonSeries && (
        <path
          d={pathFor(comparisonSeries)}
          fill="none" stroke="#C9C2B8" strokeWidth="1.5"
          strokeDasharray="0"
        />
      )}

      {/* Main curve */}
      <path
        d={pathFor(series)}
        fill="none" stroke="#1C1B1A" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: 'd 320ms cubic-bezier(.2,.8,.2,1)' }}
      />

      {/* Y axis ticks + labels */}
      {yTicks.map((v) => (
        <g key={`yl-${v}`}>
          <line
            x1={pad.l - 4} x2={pad.l}
            y1={yScale(v)} y2={yScale(v)}
            stroke="rgba(28,27,26,0.25)" strokeWidth="1"
          />
          <text
            x={pad.l - 8} y={yScale(v) + 3}
            textAnchor="end" fontSize="10.5"
            fill="#6B6862"
            fontFamily="JetBrains Mono, monospace"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {v}
          </text>
        </g>
      ))}
      <text
        x={pad.l - 40} y={pad.t + ph / 2}
        fontSize="9.5" fill="#6B6862"
        fontFamily="Inter, sans-serif"
        textAnchor="middle"
        transform={`rotate(-90, ${pad.l - 40}, ${pad.t + ph / 2})`}
        style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        CO₂ (ppm)
      </text>

      {/* X axis ticks + labels */}
      {xTicks.map((v) => (
        <g key={`xl-${v}`}>
          <line
            x1={xScale(v)} x2={xScale(v)}
            y1={pad.t + ph} y2={pad.t + ph + 4}
            stroke="rgba(28,27,26,0.25)" strokeWidth="1"
          />
          <text
            x={xScale(v)} y={pad.t + ph + 16}
            textAnchor="middle" fontSize="10.5"
            fill="#6B6862"
            fontFamily="JetBrains Mono, monospace"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {formatMin(v)}
          </text>
        </g>
      ))}
      <text
        x={pad.l + pw / 2} y={h - 6}
        fontSize="9.5" fill="#6B6862"
        fontFamily="Inter, sans-serif"
        textAnchor="middle"
        style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        ELAPSED TIME
      </text>

      {/* Hover indicator */}
      {showTooltip && activeI != null && series[activeI] && (
        <g>
          <line
            x1={xScale(series[activeI].t_min)} x2={xScale(series[activeI].t_min)}
            y1={pad.t} y2={pad.t + ph}
            stroke="#1C1B1A" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"
          />
          <circle
            cx={xScale(series[activeI].t_min)} cy={yScale(series[activeI].c_ppm)}
            r="3.5" fill="#F5F2EE" stroke="#1C1B1A" strokeWidth="1.5"
          />
          <ChartTooltip
            x={xScale(series[activeI].t_min)}
            y={yScale(series[activeI].c_ppm)}
            data={series[activeI]}
            pw={pw} pad={pad}
          />
        </g>
      )}
    </svg>
  );
}

function ChartTooltip({ x, y, data, pw, pad }) {
  const w = 148, h = 64;
  // Keep tooltip on-canvas
  const left = x + 14 + w > pad.l + pw ? x - w - 14 : x + 14;
  const top = Math.max(pad.t, Math.min(y - h / 2, pad.t + 340 - h));
  return (
    <g transform={`translate(${left}, ${top})`} style={{ pointerEvents: 'none' }}>
      <rect x="0" y="0" width={w} height={h} fill="#F5F2EE" stroke="rgba(28,27,26,0.35)" strokeWidth="1" rx="3" />
      <text x="10" y="16" fontSize="9" fill="#6B6862" fontFamily="Inter, sans-serif" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        t = {formatMin(data.t_min)}
      </text>
      <text x="10" y="36" fontSize="16" fill="#1C1B1A" fontFamily="Space Grotesk, sans-serif" style={{ letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
        {Math.round(data.c_ppm)}
        <tspan fontSize="10" fill="#6B6862" fontFamily="JetBrains Mono, monospace" dx="4">ppm</tspan>
      </text>
      <text x="10" y="54" fontSize="10" fill="#6B6862" fontFamily="JetBrains Mono, monospace" style={{ fontVariantNumeric: 'tabular-nums' }}>
        capture  {data.capture_g_h.toFixed(2)} g/h
      </text>
    </g>
  );
}

function niceStep(range, targetCount) {
  const raw = range / targetCount;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / pow;
  let mult;
  if (norm < 1.5) mult = 1;
  else if (norm < 3) mult = 2;
  else if (norm < 7) mult = 5;
  else mult = 10;
  return mult * pow;
}

function formatMin(m) {
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return mm === 0 ? `${h}h` : `${h}h${String(mm).padStart(2, '0')}`;
}

Object.assign(window, { PPMChart, formatMin, niceStep });

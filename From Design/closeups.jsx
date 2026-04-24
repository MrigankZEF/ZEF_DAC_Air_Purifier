/* =========================================================
   Close-up views
   ========================================================= */

function ChartCloseup() {
  const series = React.useMemo(() => {
    return window.DACPhysics.simulate({
      L: 5, W: 4, H: 2.6,
      c0_ppm: 1200, c_target_ppm: 600, c_amb_ppm: 420,
      people: 2, g_per_person_per_h: 35,
      wires: 48, wire_length_m: 0.85,
      fan_m3h: 300, leanness_pct: 62,
      hours: 6, dt_min: 2,
    }).series;
  }, []);
  const baseline = React.useMemo(() => {
    return window.DACPhysics.simulate({
      L: 5, W: 4, H: 2.6,
      c0_ppm: 1200, c_target_ppm: 600, c_amb_ppm: 420,
      people: 2, g_per_person_per_h: 35,
      wires: 48, wire_length_m: 0.85,
      fan_m3h: 100, leanness_pct: 15,
      hours: 6, dt_min: 2,
    }).series;
  }, []);

  // Force a hover marker so the tooltip styling is visible
  const forcedHover = 60;

  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 12, borderBottom: '1px solid var(--hair)' }}>
        <div>
          <div className="label">CLOSE-UP · 003</div>
          <div className="display-m" style={{ marginTop: 4 }}>Chart treatment</div>
        </div>
        <div className="mono micro">axes · ticks · target · tooltip</div>
      </div>
      <div style={{
        background: 'var(--bg)', border: '1px solid var(--hair)', borderRadius: 6,
        padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column',
      }}>
        <div className="chart-card-head" style={{ marginBottom: 14 }}>
          <div className="chart-card-title">PPM · OVER TIME</div>
          <div className="chart-card-legend">
            <span className="legend-item"><span className="legend-swatch" /> This run</span>
            <span className="legend-item"><span className="legend-swatch warm" /> Baseline</span>
            <span className="legend-item"><span style={{ width: 14, borderTop: '1px dashed #E4002B', display: 'inline-block' }} /> Target</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <PPMChart
            series={series}
            comparisonSeries={baseline}
            c_target={600}
            c_amb={420}
            width={820}
            height={460}
            hoverIndex={forcedHover}
          />
        </div>
      </div>
    </div>
  );
}

function SliderCloseup() {
  const [leanness, setLeanness] = React.useState(62);
  const [people, setPeople] = React.useState(2);
  const [flow, setFlow] = React.useState(300);

  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 12, borderBottom: '1px solid var(--hair)' }}>
        <div>
          <div className="label">CLOSE-UP · 004</div>
          <div className="display-m" style={{ marginTop: 4 }}>Controls & tabular readouts</div>
        </div>
        <div className="mono micro">slider · stepper · segmented</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1 }}>
        {/* Left: slider + readout */}
        <div style={{ background: 'var(--bg)', border: '1px solid var(--hair)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="group-head" style={{ paddingBottom: 6, borderBottom: '1px solid var(--hair)' }}>
            <span className="group-title">Stripping Leanness</span>
            <span className="group-index">06</span>
          </div>
          <div className="slider-wrap" style={{ gap: 14 }}>
            <div className="slider-top">
              <span className="label">Driving force</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 44, letterSpacing: 'var(--lsp-tight)', fontVariantNumeric: 'tabular-nums', fontWeight: 500, lineHeight: 1 }}>
                {leanness}<span style={{ fontSize: 16, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginLeft: 4, fontWeight: 400 }}>%</span>
              </span>
            </div>
            <Slider value={leanness} onChange={setLeanness} min={0} max={100} ticks={11} />
            <div className="slider-range">
              <span>LEAN 0</span><span>50</span><span>RICH 100</span>
            </div>
          </div>

          <div style={{ paddingTop: 18, borderTop: '1px solid var(--hair)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <div className="label">STY AT 800 PPM</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
                {(window.DACPhysics.sty(800, leanness / 100) * 1000).toFixed(2)} <span style={{ color: 'var(--ink-3)', fontSize: 11 }}>mmol/m·h</span>
              </div>
            </div>
            <div>
              <div className="label">RELATIVE RATE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
                {(leanness / 62 * 100).toFixed(0)} <span style={{ color: 'var(--ink-3)', fontSize: 11 }}>% of std</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: steppers and readouts */}
        <div style={{ background: 'var(--bg)', border: '1px solid var(--hair)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="group-head" style={{ paddingBottom: 6, borderBottom: '1px solid var(--hair)' }}>
            <span className="group-title">Numeric inputs</span>
            <span className="group-index">—</span>
          </div>

          <div className="row">
            <span className="label">People</span>
            <Stepper value={people} onChange={setPeople} min={0} max={12} unit="pax" />
          </div>
          <div className="row">
            <span className="label">Fan flow (custom)</span>
            <Stepper value={flow} onChange={setFlow} step={25} min={50} max={1500} unit="m³/h" />
          </div>

          <div className="hairline" />

          <div className="label">TABULAR NUMERALS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['8/8 pax',     '8.000'],
              ['111 111',     '0000.0'],
              ['420 ppm',     '1000 m³/h'],
              ['0.027 mol/h', '12.34 g/h'],
              ['00:43:12',    '—0.5'],
              ['3.14159',     '§ α β'],
            ].map(([a, b], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 13, fontVariantNumeric: 'tabular-nums', borderBottom: '1px solid var(--hair)', padding: '6px 0' }}>
                <span>{a}</span><span style={{ color: 'var(--ink-3)' }}>{b}</span>
              </div>
            ))}
          </div>

          <div className="hairline" />

          <div className="label">SEGMENTED · FAN</div>
          <Segmented
            options={FAN_PRESETS}
            value="standard"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

function RoomCloseup() {
  const [ppm, setPpm] = React.useState(1100);
  const [L, setL] = React.useState(5);
  const [W, setW] = React.useState(4);
  const [H, setH] = React.useState(2.6);

  const presets = [
    { label: 'Small',   L: 3.2, W: 2.6, H: 2.4 },
    { label: 'Medium',  L: 5.0, W: 4.0, H: 2.6 },
    { label: 'Large',   L: 7.5, W: 5.2, H: 3.0 },
    { label: 'Long',    L: 9.0, W: 3.0, H: 2.6 },
  ];

  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 12, borderBottom: '1px solid var(--hair)' }}>
        <div>
          <div className="label">CLOSE-UP · 005</div>
          <div className="display-m" style={{ marginTop: 4 }}>Axonometric room · haze response</div>
        </div>
        <div className="mono micro">L×W×H invariant · never overflows</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 14, flex: 1 }}>
        <div style={{ background: 'var(--bg)', border: '1px solid var(--hair)', borderRadius: 6, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <div className="chart-card-head">
            <div className="chart-card-title">ROOM · AXON.</div>
            <span className="mono micro">ppm {ppm}</span>
          </div>
          <div style={{ flex: 1, border: '1px solid var(--hair)', borderRadius: 4, marginTop: 10,
            background:
              'linear-gradient(to right,  rgba(201,194,184,0.2) 1px, transparent 1px) 0 0 / 20px 20px, ' +
              'linear-gradient(to bottom, rgba(201,194,184,0.2) 1px, transparent 1px) 0 0 / 20px 20px, var(--bg)',
          }}>
            <IsoRoom L={L} W={W} H={H} ppm={ppm} c_amb={420} c_target={600} containerW={560} containerH={380} people={2} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--hair)', borderRadius: 6, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="label">ROOM PRESET</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {presets.map(p => {
                const on = (p.L === L && p.W === W && p.H === H);
                return (
                  <button
                    key={p.label}
                    onClick={() => { setL(p.L); setW(p.W); setH(p.H); }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '8px 10px', border: '1px solid ' + (on ? 'var(--ink)' : 'var(--hair-strong)'),
                      background: on ? 'var(--ink)' : 'transparent',
                      color: on ? 'var(--bg)' : 'var(--ink)',
                      borderRadius: 4, cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontSize: 12,
                    }}
                  >
                    <span>{p.label}</span>
                    <span className="mono" style={{ fontSize: 11, opacity: 0.8 }}>
                      {p.L}·{p.W}·{p.H}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ background: 'var(--bg)', border: '1px solid var(--hair)', borderRadius: 6, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="slider-top">
              <span className="label">Column ppm</span>
              <span className="slider-value">{ppm}</span>
            </div>
            <Slider value={ppm} onChange={setPpm} min={420} max={2500} step={10} />
            <div className="slider-range">
              <span>420</span><span>2500</span>
            </div>
            <div className="hairline" style={{ margin: '6px 0' }} />
            <div className="stat"><span className="k">Volume</span><span className="v">{(L * W * H).toFixed(1)} m³</span></div>
            <div className="stat"><span className="k">Haze α</span><span className="v">{(0.05 + Math.min(1, (ppm - 420) / 1200) * 0.28).toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ChartCloseup, SliderCloseup, RoomCloseup });

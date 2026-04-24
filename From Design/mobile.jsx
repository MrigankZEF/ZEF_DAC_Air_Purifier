/* =========================================================
   Mobile view — canvas stacks first, controls in accordion.
   ========================================================= */

function DACMobile() {
  const [L, setL] = React.useState(5.0);
  const [W, setW] = React.useState(4.0);
  const [H, setH] = React.useState(2.6);
  const [c0] = React.useState(1200);
  const [cTarget] = React.useState(600);
  const [cAmb] = React.useState(420);
  const [people, setPeople] = React.useState(2);
  const [perPerson] = React.useState(35);
  const [wires, setWires] = React.useState(48);
  const [wireLen] = React.useState(0.85);
  const [fanPreset, setFanPreset] = React.useState('standard');
  const [leanness, setLeanness] = React.useState(62);
  const [openGroup, setOpenGroup] = React.useState('machine');

  const fan_m3h = FAN_PRESETS.find(p => p.value === fanPreset)?.m3h || 300;

  const result = React.useMemo(() => window.DACPhysics.simulate({
    L, W, H, c0_ppm: c0, c_target_ppm: cTarget, c_amb_ppm: cAmb,
    people, g_per_person_per_h: perPerson,
    wires, wire_length_m: wireLen,
    fan_m3h, leanness_pct: leanness,
    hours: 6, dt_min: 3,
  }), [L, W, H, people, wires, fanPreset, leanness]);

  const current = result.series[0];
  const V = L * W * H;
  const ttT = result.timeToTargetMin == null ? '——' : window.formatMin(result.timeToTargetMin);

  const groups = [
    { id: 'room',      title: 'Room',       index: '01' },
    { id: 'co2',       title: 'CO₂',        index: '02' },
    { id: 'occ',       title: 'Occupancy',  index: '03' },
    { id: 'machine',   title: 'Machine',    index: '04' },
    { id: 'fan',       title: 'Fan',        index: '05' },
    { id: 'stripping', title: 'Stripping',  index: '06' },
  ];

  return (
    <div style={{
      width: '100%', minHeight: '100%', background: 'var(--bg)',
      padding: '18px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--hair)' }}>
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <div className="brand-title" style={{ fontSize: 13 }}>HALON DC-1</div>
            <div className="brand-sub" style={{ fontSize: 9 }}>ROOM SIM</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="status-dot" />
          <span className="mono micro" style={{ textTransform: 'uppercase', letterSpacing: '0.12em' }}>LIVE</span>
        </div>
      </div>

      {/* Readouts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, paddingBottom: 12, borderBottom: '1px solid var(--hair)' }}>
        <div>
          <div className="label" style={{ fontSize: 9 }}>PPM</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 'var(--lsp-tight)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
            {Math.round(current.c_ppm)}
          </div>
        </div>
        <div>
          <div className="label" style={{ fontSize: 9 }}>CAPTURE</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 'var(--lsp-tight)', fontVariantNumeric: 'tabular-nums', fontWeight: 500, color: 'var(--accent)' }}>
            {current.capture_g_h.toFixed(1)}<span style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginLeft: 3, fontWeight: 400 }}>g/h</span>
          </div>
        </div>
        <div>
          <div className="label" style={{ fontSize: 9 }}>TO TARGET</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 'var(--lsp-tight)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
            {ttT}
          </div>
        </div>
      </div>

      {/* Chart (canvas first) */}
      <div className="chart-card" style={{ padding: '14px 14px 8px' }}>
        <div className="chart-card-head">
          <div className="chart-card-title" style={{ fontSize: 10.5 }}>PPM · TIME</div>
          <span className="mono micro">{L.toFixed(1)}·{W.toFixed(1)}·{H.toFixed(1)}m</span>
        </div>
        <PPMChart
          series={result.series}
          c_target={cTarget}
          c_amb={cAmb}
          width={420}
          height={240}
          showTooltip={false}
        />
      </div>

      {/* Room viz */}
      <div className="chart-card" style={{ padding: '14px 14px' }}>
        <div className="chart-card-head">
          <div className="chart-card-title" style={{ fontSize: 10.5 }}>ROOM · AXON.</div>
          <span className="mono micro">{V.toFixed(1)} m³</span>
        </div>
        <div style={{ height: 160, background: 'var(--bg)', border: '1px solid var(--hair)', borderRadius: 4 }}>
          <IsoRoom
            L={L} W={W} H={H}
            ppm={current.c_ppm}
            c_amb={cAmb}
            c_target={cTarget}
            containerW={420}
            containerH={160}
            showLabels={false}
            people={people}
          />
        </div>
      </div>

      {/* Controls accordion */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="label" style={{ marginBottom: 6, fontSize: 10 }}>CONTROLS</div>
        {groups.map((g) => {
          const isOpen = openGroup === g.id;
          return (
            <div key={g.id} style={{ borderTop: '1px solid var(--hair)' }}>
              <button
                onClick={() => setOpenGroup(isOpen ? null : g.id)}
                style={{
                  width: '100%', border: 0, background: 'transparent',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 2px', cursor: 'pointer', color: 'var(--ink)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{g.index}</span>
                  <span className="display" style={{ fontSize: 13, fontWeight: 500 }}>{g.title}</span>
                </span>
                <span className="mono" style={{ fontSize: 14, color: 'var(--ink-2)' }}>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div style={{ padding: '4px 4px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {g.id === 'room' && (
                    <div className="triple">
                      <Field label="L" unit="m" value={L} onChange={setL} />
                      <Field label="W" unit="m" value={W} onChange={setW} />
                      <Field label="H" unit="m" value={H} onChange={setH} />
                    </div>
                  )}
                  {g.id === 'co2' && (
                    <>
                      <div className="row"><span className="label">Initial</span><span className="val">{c0} ppm</span></div>
                      <div className="row"><span className="label">Target</span><span className="val">{cTarget} ppm</span></div>
                      <div className="row"><span className="label">Ambient</span><span className="val">{cAmb} ppm</span></div>
                    </>
                  )}
                  {g.id === 'occ' && (
                    <div className="row">
                      <span className="label">People</span>
                      <Stepper value={people} onChange={setPeople} min={0} max={12} unit="pax" />
                    </div>
                  )}
                  {g.id === 'machine' && (
                    <>
                      <div className="row">
                        <span className="label">Wires</span>
                        <Stepper value={wires} onChange={setWires} min={4} max={256} unit="n" />
                      </div>
                      <div className="derived">
                        <span className="derived-l">Total wire</span>
                        <span className="derived-v">{(wires * wireLen).toFixed(1)} m</span>
                      </div>
                    </>
                  )}
                  {g.id === 'fan' && (
                    <Segmented
                      options={FAN_PRESETS.slice(0, 3)}
                      value={fanPreset}
                      onChange={setFanPreset}
                    />
                  )}
                  {g.id === 'stripping' && (
                    <div className="slider-wrap">
                      <div className="slider-top">
                        <span className="label">Driving force</span>
                        <span className="slider-value">{leanness}%</span>
                      </div>
                      <Slider value={leanness} onChange={setLeanness} min={0} max={100} />
                      <div className="slider-range">
                        <span>LEAN</span><span>RICH</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="btn" style={{ marginTop: 4 }}><span className="dot" /> SIMULATING</button>
    </div>
  );
}

Object.assign(window, { DACMobile });

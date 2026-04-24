/* =========================================================
   DAC Air Purifier — Desktop Simulator View
   ========================================================= */

const { useState: _useState, useEffect: _useEffect, useMemo: _useMemo } = React;

const FAN_PRESETS = [
  { value: 'sleep',    label: 'Sleep',    meta: '100', m3h: 100 },
  { value: 'standard', label: 'Standard', meta: '300', m3h: 300 },
  { value: 'turbo',    label: 'Turbo',    meta: '800', m3h: 800 },
  { value: 'custom',   label: 'Custom',   meta: '——',  m3h: null },
];

function DACSimulator({ forcedHover = null, compact = false }) {
  // --- Inputs ---
  const [L, setL] = _useState(5.0);
  const [W, setW] = _useState(4.0);
  const [H, setH] = _useState(2.6);
  const [c0, setC0] = _useState(1200);
  const [cTarget, setCTarget] = _useState(600);
  const [cAmb, setCAmb] = _useState(420);
  const [people, setPeople] = _useState(2);
  const [perPerson, setPerPerson] = _useState(35); // g/h per person
  const [wires, setWires] = _useState(48);
  const [wireLen, setWireLen] = _useState(0.85);
  const [fanPreset, setFanPreset] = _useState('standard');
  const [fanCustom, setFanCustom] = _useState(300);
  const [leanness, setLeanness] = _useState(62);

  const fan_m3h = fanPreset === 'custom'
    ? fanCustom
    : FAN_PRESETS.find(p => p.value === fanPreset).m3h;

  const V = _useMemo(() => L * W * H, [L, W, H]);
  const totalWire = _useMemo(() => wires * wireLen, [wires, wireLen]);

  // --- Simulation ---
  const result = _useMemo(() => {
    return window.DACPhysics.simulate({
      L, W, H,
      c0_ppm: c0, c_target_ppm: cTarget, c_amb_ppm: cAmb,
      people, g_per_person_per_h: perPerson,
      wires, wire_length_m: wireLen,
      fan_m3h,
      leanness_pct: leanness,
      hours: 6, dt_min: 2,
    });
  }, [L, W, H, c0, cTarget, cAmb, people, perPerson, wires, wireLen, fan_m3h, leanness]);

  // Comparison series: same conditions at leanness=20% (off)
  const baseline = _useMemo(() => {
    return window.DACPhysics.simulate({
      L, W, H,
      c0_ppm: c0, c_target_ppm: cTarget, c_amb_ppm: cAmb,
      people, g_per_person_per_h: perPerson,
      wires, wire_length_m: wireLen,
      fan_m3h: 100,
      leanness_pct: 15,
      hours: 6, dt_min: 2,
    }).series;
  }, [L, W, H, c0, cTarget, cAmb, people, perPerson, wires, wireLen]);

  const current = result.series[0];
  const ttT = result.timeToTargetMin;
  const ttTFmt = ttT == null ? '——' : window.formatMin(ttT);

  return (
    <div className="app">
      {/* ========== LEFT: CONTROL PANEL ========== */}
      <aside className="panel">
        <div className="panel-head">
          <div className="brand">
            <div className="brand-mark" />
            <div>
              <div className="brand-title">HALON DC-1</div>
              <div className="brand-sub">DAC · ROOM SIM</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="status-dot" />
            <span className="micro mono" style={{ textTransform: 'uppercase', letterSpacing: '0.12em' }}>LIVE</span>
          </div>
        </div>

        {/* ROOM */}
        <Group title="Room" index="01">
          <div className="triple">
            <Field label="L" unit="m" value={L} onChange={setL} />
            <Field label="W" unit="m" value={W} onChange={setW} />
            <Field label="H" unit="m" value={H} onChange={setH} />
          </div>
          <div className="derived">
            <span className="derived-l">Volume</span>
            <span className="derived-v">{V.toFixed(1)} <span style={{ color: 'var(--ink-3)' }}>m³</span></span>
          </div>
        </Group>

        {/* CO2 */}
        <Group title="CO₂" index="02">
          <div className="row">
            <span className="label">Initial</span>
            <Stepper value={c0} onChange={setC0} step={50} min={0} max={5000} unit="ppm" />
          </div>
          <div className="row">
            <span className="label">Target</span>
            <Stepper value={cTarget} onChange={setCTarget} step={25} min={0} max={5000} unit="ppm" />
          </div>
          <div className="row">
            <span className="label">Ambient</span>
            <Stepper value={cAmb} onChange={setCAmb} step={5} min={0} max={600} unit="ppm" />
          </div>
        </Group>

        {/* OCCUPANCY */}
        <Group title="Occupancy" index="03">
          <div className="row">
            <span className="label">People</span>
            <Stepper value={people} onChange={setPeople} step={1} min={0} max={20} unit="pax" />
          </div>
          <div className="row">
            <span className="label">CO₂ per person</span>
            <Stepper value={perPerson} onChange={setPerPerson} step={1} min={10} max={80} unit="g/h" />
          </div>
        </Group>

        {/* MACHINE */}
        <Group title="Machine" index="04">
          <div className="row">
            <span className="label">Absorber wires</span>
            <Stepper value={wires} onChange={setWires} step={1} min={4} max={256} unit="n" />
          </div>
          <div className="row">
            <span className="label">Wire length</span>
            <Stepper value={wireLen} onChange={setWireLen} step={0.05} min={0.1} max={2.5} unit="m" />
          </div>
          <div className="derived">
            <span className="derived-l">Total wire</span>
            <span className="derived-v">{totalWire.toFixed(1)} <span style={{ color: 'var(--ink-3)' }}>m</span></span>
          </div>
        </Group>

        {/* FAN */}
        <Group title="Fan" index="05">
          <Segmented
            options={FAN_PRESETS}
            value={fanPreset}
            onChange={setFanPreset}
          />
          {fanPreset === 'custom' && (
            <div className="row">
              <span className="label">Custom flow</span>
              <Stepper value={fanCustom} onChange={setFanCustom} step={25} min={50} max={1500} unit="m³/h" />
            </div>
          )}
          <div className="derived">
            <span className="derived-l">Flow</span>
            <span className="derived-v">{fan_m3h} <span style={{ color: 'var(--ink-3)' }}>m³/h</span></span>
          </div>
        </Group>

        {/* STRIPPING */}
        <Group title="Stripping Leanness" index="06">
          <div className="slider-wrap">
            <div className="slider-top">
              <span className="label">Driving force</span>
              <span className="slider-value">{leanness}<span style={{ color: 'var(--ink-3)', fontSize: 11, marginLeft: 3 }}>%</span></span>
            </div>
            <Slider value={leanness} onChange={setLeanness} min={0} max={100} step={1} ticks={11} />
            <div className="slider-range">
              <span>LEAN 0</span>
              <span>50</span>
              <span>RICH 100</span>
            </div>
          </div>
        </Group>

        <div className="run-bar">
          <button className="btn"><span className="dot" /> SIMULATING</button>
          <button className="btn ghost" title="Reset to defaults">↻</button>
          <button className="btn ghost" title="Export">↗</button>
        </div>
      </aside>

      {/* ========== RIGHT: CANVAS ========== */}
      <main className="canvas">
        <div className="canvas-head">
          <div className="canvas-title">
            <div className="eyebrow">SIMULATION · MODE 001</div>
            <h1>Indoor CO₂ Drawdown</h1>
            <div className="sub">Room volume {V.toFixed(1)} m³ · {wires}× absorber wires · fan {fan_m3h} m³/h · leanness {leanness}%</div>
          </div>
          <Readout k="CURRENT ppm" v={Math.round(current.c_ppm)} unit="ppm" sub={`Δ ${Math.round(current.c_ppm - cTarget)} to target`} delay={0} />
          <Readout k="CAPTURE" v={current.capture_g_h.toFixed(2)} unit="g/h" sub={`${current.capture_mol_h.toFixed(3)} mol/h`} accent delay={60} />
          <Readout k="TIME TO TARGET" v={ttTFmt} sub={`from ${c0} → ${cTarget} ppm`} delay={120} />
        </div>

        {/* CHART */}
        <section className="chart-card">
          <div className="chart-card-head">
            <div className="chart-card-title">PPM · OVER TIME</div>
            <div className="chart-card-legend">
              <span className="legend-item">
                <span className="legend-swatch" /> This run
              </span>
              <span className="legend-item">
                <span className="legend-swatch warm" /> Baseline (off)
              </span>
              <span className="legend-item">
                <span style={{ width: 14, borderTop: '1px dashed #E4002B', display: 'inline-block' }} /> Target
              </span>
            </div>
          </div>
          <PPMChart
            series={result.series}
            comparisonSeries={baseline}
            c_target={cTarget}
            c_amb={cAmb}
            width={960}
            height={320}
            hoverIndex={forcedHover}
          />
        </section>

        {/* ROOM VIZ */}
        <section className="room-card">
          <div>
            <div className="room-card-head">
              <div className="chart-card-title">ROOM · AXONOMETRIC</div>
              <span className="micro mono" style={{ letterSpacing: '0.04em' }}>
                haze α {(0.05 + Math.min(1, Math.max(0, (current.c_ppm - cAmb) / (cTarget * 2))) * 0.28).toFixed(2)}
              </span>
            </div>
            <div className="room-viz">
              <IsoRoom
                L={L} W={W} H={H}
                ppm={current.c_ppm}
                c_amb={cAmb}
                c_target={cTarget}
                containerW={560}
                containerH={240}
                people={people}
              />
            </div>
          </div>
          <div className="room-stats">
            <div className="stat"><span className="k">Volume</span><span className="v">{V.toFixed(1)} m³</span></div>
            <div className="stat"><span className="k">Footprint</span><span className="v">{(L * W).toFixed(1)} m²</span></div>
            <div className="stat"><span className="k">Wire density</span><span className="v">{(totalWire / V).toFixed(2)} m⁻²</span></div>
            <div className="stat"><span className="k">Air changes</span><span className="v">{(fan_m3h / V).toFixed(1)} /h</span></div>
            <div className="stat"><span className="k">Gen. rate</span><span className="v">{(people * perPerson).toFixed(0)} g/h</span></div>
            <div className="stat"><span className="k">Net Δ</span><span className="v">{(current.capture_g_h - people * perPerson).toFixed(1)} g/h</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}

Object.assign(window, { DACSimulator });

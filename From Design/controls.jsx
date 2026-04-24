/* =========================================================
   Control panel — shared building blocks.
   ========================================================= */

const { useRef: _useRef, useCallback } = React;

function Group({ title, index, children }) {
  return (
    <div className="group">
      <div className="group-head">
        <span className="group-title">{title}</span>
        <span className="group-index">{index}</span>
      </div>
      {children}
    </div>
  );
}

function Field({ label, unit, value, onChange, step = 0.1, min = 0, max = 999 }) {
  return (
    <div className="field">
      <span className="field-label">{label}{unit ? ` (${unit})` : ''}</span>
      <input
        className="field-input"
        type="text"
        value={value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
          else onChange(e.target.value);
        }}
      />
    </div>
  );
}

function Stepper({ value, onChange, step = 1, min = 0, max = 9999, unit = '' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <div className="stepper">
        <button onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))}>−</button>
        <input
          className="val-input"
          type="text"
          value={value}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
          }}
        />
        <button onClick={() => onChange(Math.min(max, +(value + step).toFixed(2)))}>+</button>
      </div>
      {unit && <span className="unit">{unit}</span>}
    </div>
  );
}

function Slider({ value, onChange, min = 0, max = 100, step = 1, ticks = 11 }) {
  const [dragging, setDragging] = React.useState(false);
  const trackRef = _useRef(null);
  const pct = ((value - min) / (max - min)) * 100;

  const onMouseDown = (e) => {
    setDragging(true);
    update(e);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e) => update(e);
  const onMouseUp = () => {
    setDragging(false);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
  const update = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    const snapped = Math.round(raw / step) * step;
    onChange(Math.max(min, Math.min(max, snapped)));
  };

  return (
    <div className="slider" ref={trackRef} onMouseDown={onMouseDown}>
      <div className="slider-track" />
      <div className="slider-ticks">
        {Array.from({ length: ticks }).map((_, i) => <span key={i} />)}
      </div>
      <div className="slider-fill" style={{ width: `${pct}%` }} />
      <div
        className={`slider-thumb ${dragging ? 'active' : ''}`}
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="segmented" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((o) => (
        <button
          key={o.value}
          className={value === o.value ? 'on' : ''}
          onClick={() => onChange(o.value)}
          title={o.title || ''}
        >
          <span>{o.label}</span>
          {o.meta && <span className="m">{o.meta}</span>}
        </button>
      ))}
    </div>
  );
}

function Readout({ k, v, unit, sub, accent, delay = 0 }) {
  return (
    <div className={`readout ${accent ? 'accent' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="k">{k}</div>
      <div className="v">
        {v}
        {unit && <span className="u">{unit}</span>}
      </div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}

Object.assign(window, { Group, Field, Stepper, Slider, Segmented, Readout });

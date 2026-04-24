/* =========================================================
   Physics / simulation model for the DAC purifier.
   Shared globals — attached to window.
   =========================================================

   Model:
   - Room is a well-mixed CV (continuous stirred tank).
   - CO2 generation from occupants:    G = people * g_per_person_per_h [g/h]
   - Outside infiltration -> ambient:  I = ACH * V * (C_ambient - C) in ppm·m³/h terms
     (we keep this small; ACH ≈ 0.3 for a sealed room)
   - Capture rate = STY(c_avg_column, leanness) * totalWireLength * fan_factor
     (mol/h per meter of wire -> multiplied by total wire length)
   - STY (space-time yield) — simplified empirical fit:
       STY(c, L) = STY_max * (c / (c + K)) * L
       where:
         c  = instantaneous column-averaged ppm
         L  = leanness fraction (0..1) — higher leanness = more driving force
         K  = Michaelis-like half-saturation ppm (~600 ppm)
         STY_max = peak mol CO2 per meter of wire per hour (per wire per m) * factor
     This gives the characteristic "flattens at higher ppm, proportional to leanness"
     shape that DAC contactor screens exhibit.

   We integrate with forward Euler at dt = 1 minute.
*/

(function () {
  const MOL_MASS_CO2 = 44.01;          // g/mol
  const PPM_PER_GRAM_PER_M3 = 1e6 / (MOL_MASS_CO2 * 1000 / 22.414);
  // Approximate conversion: 1 g CO2 in 1 m³ ≈ 556 ppm (at STP-ish).
  // We'll use a simpler, physically consistent pair:
  //    1 ppm·m³ of CO2 ≈ 1.8e-3 g   (close to standard conditions)
  const GRAMS_PER_PPM_M3 = 1.8e-3;

  // STY constants (tuned so the curves look realistic for a small residential DAC)
  const STY_MAX_MOL_PER_M_PER_H = 0.18;  // mol CO2 / (m wire · h) at saturation & full leanness
  const STY_K_PPM = 700;                  // half-saturation ppm

  function sty(c_ppm, leannessFrac) {
    const c = Math.max(0, c_ppm);
    return STY_MAX_MOL_PER_M_PER_H * (c / (c + STY_K_PPM)) * leannessFrac;
  }

  // Fan factor: normalizes against "standard" 300 m³/h. Higher fan = better contact
  // but with diminishing returns (square-root).
  function fanFactor(fan_m3h) {
    return Math.sqrt(Math.max(1, fan_m3h) / 300);
  }

  // ACH assumption (air changes per hour to ambient). Small — sealed room.
  const ACH = 0.3;

  function simulate(params) {
    const {
      L, W, H,
      c0_ppm, c_target_ppm, c_amb_ppm,
      people, g_per_person_per_h,
      wires, wire_length_m,
      fan_m3h,
      leanness_pct,
      hours = 6,
      dt_min = 1,
    } = params;

    const V = Math.max(1, L * W * H);
    const totalWire = Math.max(0.01, wires * wire_length_m);
    const L_frac = Math.max(0, Math.min(1, leanness_pct / 100));
    const fan_k = fanFactor(fan_m3h);

    const dt_h = dt_min / 60;
    const steps = Math.ceil((hours * 60) / dt_min);

    const series = new Array(steps + 1);
    let c = c0_ppm;
    let timeToTarget = null;

    // Generation rate in ppm/h given people:  (g/h) / V / GRAMS_PER_PPM_M3
    const gen_ppm_per_h = (people * g_per_person_per_h) / (V * GRAMS_PER_PPM_M3);

    for (let i = 0; i <= steps; i++) {
      const t_min = i * dt_min;

      // column-averaged ppm ~ c (well-mixed assumption)
      const styNow = sty(c, L_frac);              // mol/(m·h)
      const captureMolPerH = styNow * totalWire * fan_k;     // mol/h
      const captureGPerH   = captureMolPerH * MOL_MASS_CO2;  // g/h
      const capture_ppm_per_h = captureGPerH / (V * GRAMS_PER_PPM_M3);

      const infil_ppm_per_h = ACH * (c_amb_ppm - c);

      const dcdt = gen_ppm_per_h + infil_ppm_per_h - capture_ppm_per_h; // ppm/h

      series[i] = {
        t_min,
        c_ppm: c,
        capture_g_h: captureGPerH,
        capture_mol_h: captureMolPerH,
        sty: styNow,
      };

      if (timeToTarget === null && c <= c_target_ppm && c0_ppm > c_target_ppm) {
        timeToTarget = t_min;
      }

      c = Math.max(0, c + dcdt * dt_h);
    }

    const last = series[series.length - 1];

    return {
      series,
      V,
      totalWire,
      timeToTargetMin: timeToTarget,
      steadyStatePpm: series[series.length - 1].c_ppm,
      current: {
        ppm: series[0].c_ppm,
        capture_g_h: series[0].capture_g_h,
        capture_mol_h: series[0].capture_mol_h,
      },
      last,
    };
  }

  window.DACPhysics = {
    simulate,
    sty,
    fanFactor,
    GRAMS_PER_PPM_M3,
    MOL_MASS_CO2,
  };
})();

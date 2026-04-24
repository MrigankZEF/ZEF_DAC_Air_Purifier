# DAC Air Purifier Model — Vision

A single-file, downloadable HTML app that simulates CO₂ evolution in a room while a DAC (direct air capture) purifier runs. If a future feature hard-blocks single-file delivery, fall back to a hosted React build — but HTML-download is priority #1.

## Goal

Given a room, occupancy, machine geometry (wires), airflow, and stripping leanness, show the user how CO₂ ppm drops over time, and what capture rate the machine is delivering at each ppm along the way.

## Core math

### Outer loop — room mass balance, time-stepped

- `volume = L × W × H`
- `generation [g/h] = people × g_per_person_per_h`
- Per time step `dt`:
  - `ppm_room(t+dt) = ppm_room(t) + (generation − capture(ppm_room)) × dt / (volume × ρ_CO₂)`
- `capture(ppm_room)` is **not** a preset slider — it is the converged output of the inner loop run at `ppm_in = ppm_room`.

### Inner loop — absorber column convergence

Run every outer time step with `ppm_in = ppm_room(t)`:

1. Initialise `ppm_out = ppm_ambient` (default 420).
2. Log-mean average: `ppm_avg = (ppm_in − ppm_out) / (ln ppm_in − ln ppm_out)`.
3. **STY** = `f(ppm_avg, lean%)` — closed-form fit, Mrigank supplies equation.
   Shape: linear in ppm at fixed lean%; distinct curve per lean%.
   Units: mol CO₂ / (m of wire · s).
4. `capture_rate [mol/h] = N_wires × L_wire × STY × 3600`.
5. `air_mol_flow [mol/h] = airflow_m³_per_h × ρ_air / M_air` (≈ `× 1300/29`).
6. `CO₂_mol_in = (ppm_in / 1e6) × air_mol_flow`.
7. `CO₂_mol_out = CO₂_mol_in − capture_rate`.
8. `ppm_out_new = (CO₂_mol_out / air_mol_flow) × 1e6`.
9. Loop 2–8 until `|ppm_out_new − ppm_out| < tol`.
   Tolerance can be coarse (e.g. 1 ppm or 0.5%). Max-iter cap ~50.

The converged `capture_rate` is handed back to the outer loop.

## Inputs (UI)

- **Room**: length, width, height → derived volume.
- **CO₂**: initial ppm, target ppm, ambient ppm (default 420, editable).
- **Occupancy**: people count, g/h per person.
- **Absorber geometry** *(new)*: # wires, wire length → derived total wire length.
- **Fan speed** *(new)*: presets (Sleep ~100, Standard ~300, Turbo ~800 m³/h) + editable custom.
- **Stripping leanness %** *(new)*: slider, feeds into STY.

## Outputs

- **CO₂-ppm-over-time chart** (outer loop result). Clean axes, bounded range, does not "run away".
- **Current capture rate** at current ppm (mol/h and g/h).
- **Isometric room visualisation** — must stay cleanly laid out at extreme L/W/H.
- Time to reach target ppm.

## Remove from current prototypes

- The fixed "capture (g/h)" slider — replaced by STY-driven calculation.
- The "steady-state CO₂" card.
- The buggy runaway chart behaviour.
- The room SVG overflow at extreme dimensions.

## Deferred (v2)

- Room ventilation / air-changes-per-hour as an extra sink.
- Humidity dependence in STY.
- Multi-stage stripping model (separate work stream, not in this app).

## Open / pending

- [ ] STY fit equation from Mrigank (functional form + coefficients per lean%).
- [ ] Confirm ambient ppm after outdoor laptop measurement (default 420 until then).

## Design aesthetic

- **Type**: Space Grotesk (display, letter-spacing -0.03em) + Inter (body). Tabular numerals on every figure.
- **Palette**: accent `#E4002B` on background `#F5F2EE`, charcoal text, warm grey for secondary / comparison bars.
- **Texture**: single faint 1px warm-grey grid (no grain — stays crisp on mobile).
- **Motion**: CSS-only crossfades between states. `cubic-bezier(.2,.8,.2,1)` for bar widths. Stagger via `transition-delay`.
- Must look materially better than the two prototypes in `Resources/`. Room visualisation must look nice — not runaway.

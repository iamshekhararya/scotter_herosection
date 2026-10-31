export interface PanelGeo {
  /** card size */
  w: number;
  h: number;
  /** inset of the panel from the card edge */
  m: number;
  /** y of the panel's top edge on the left / right of the step */
  leftTop: number;
  rightTop: number;
  /** x where the top edge steps up */
  notchX: number;
  /** bottom-left cut-out (model info) */
  cutW: number;
  cutH: number;
  /** corner radius */
  r: number;
}

/**
 * The grey rounded panel with the stepped top edge and the info cut-out.
 * It is drawn from real pixel sizes, so the corners stay perfectly round at any width
 * (a scaled SVG would squash them).
 */
export function panelPath(g: PanelGeo) {
  const { w, h, m, leftTop, rightTop, notchX, cutW, cutH, r } = g;
  const r2 = Math.min(14, (leftTop - rightTop) / 2);
  const cx = m + cutW; // x of the cut-out's right edge
  const cy = h - m - cutH; // y of the cut-out's top edge
  return [
    `M${m} ${leftTop + r}`,
    `Q${m} ${leftTop} ${m + r} ${leftTop}`,
    `L${notchX - r2} ${leftTop}`,
    `Q${notchX} ${leftTop} ${notchX} ${leftTop - r2}`,
    `L${notchX} ${rightTop + r2}`,
    `Q${notchX} ${rightTop} ${notchX + r2} ${rightTop}`,
    `L${w - m - r} ${rightTop}`,
    `Q${w - m} ${rightTop} ${w - m} ${rightTop + r}`,
    `L${w - m} ${h - m - r}`,
    `Q${w - m} ${h - m} ${w - m - r} ${h - m}`,
    `L${cx + r} ${h - m}`,
    `Q${cx} ${h - m} ${cx} ${h - m - r}`,
    `L${cx} ${cy + r}`,
    `Q${cx} ${cy} ${cx - r} ${cy}`,
    `L${m + r} ${cy}`,
    `Q${m} ${cy} ${m} ${cy - r}`,
    "Z",
  ].join(" ");
}

export default function PanelShape({ geo, className = "" }: { geo: PanelGeo; className?: string }) {
  if (!geo.w || !geo.h) return null;
  return (
    <svg
      className={className}
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      aria-hidden
    >
      <path d={panelPath(geo)} fill="currentColor" />
    </svg>
  );
}

// ── Utilities ──

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
}

interface Point { x: number; y: number }

function interpolatePath(path: Point[], t: number): Point {
  if (t <= 0) return path[0];
  if (t >= 1) return path[path.length - 1];
  const total = path.length - 1;
  const segment = t * total;
  const i = Math.floor(segment);
  const frac = segment - i;
  return {
    x: lerp(path[i].x, path[i + 1].x, frac),
    y: lerp(path[i].y, path[i + 1].y, frac),
  };
}

// ── Constants ──

const W = 320;
const H = 400;

const PACKET_COLORS = ['#ff004d', '#29adff', '#00e436', '#ffec27', '#ff77a8'];
const NUM_PACKETS = 5;
const PACKET_SPREAD = 0.07;

const PACKET_PATH: Point[] = [
  { x: 68, y: 88 },   // Your phone
  { x: 68, y: 55 },   // float up
  { x: 120, y: 38 },  // toward ceiling
  { x: 200, y: 38 },  // across ceiling
  { x: 248, y: 55 },  // descend
  { x: 248, y: 130 }, // through MRT area
  { x: 248, y: 180 }, // through floor
  { x: 248, y: 218 }, // Friend's phone
];

// ── Scene Class ──

export class TaipeiStationScene {
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    canvas.width = W;
    canvas.height = H;
    this.ctx.imageSmoothingEnabled = false;
  }

  resize() {
    // Internal resolution stays fixed; CSS handles display size
    this.ctx.imageSmoothingEnabled = false;
  }

  render(progress: number, timestamp?: number) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);

    this.drawBuilding(ctx);
    this.drawTrains(ctx, timestamp ?? Date.now());
    this.drawCharacter(ctx, 60, 82, 'You', { body: '#29adff', dark: '#1d6fa5' });
    this.drawCharacter(ctx, 240, 212, 'Friend', { body: '#00e436', dark: '#00913a' });
    this.drawPhoneGlow(ctx, progress);
    this.drawPackets(ctx, progress);

    if (progress > 0.85) {
      this.drawDimOverlay(ctx, mapRange(progress, 0.85, 1, 0, 0.45));
    }
  }

  // ── Building ──

  private drawBuilding(ctx: CanvasRenderingContext2D) {
    // Sky
    ctx.fillStyle = '#3b3b5c';
    ctx.fillRect(0, 0, W, 30);

    // Roof line
    ctx.fillStyle = '#5a5a7a';
    ctx.fillRect(0, 28, W, 4);

    // Station sign background
    ctx.fillStyle = '#4a4a6a';
    ctx.fillRect(80, 6, 160, 18);
    ctx.fillStyle = '#ffffff';
    this.drawText(ctx, '台北車站', 108, 12);

    // 1F area
    ctx.fillStyle = '#2a2a3e';
    ctx.fillRect(0, 32, W, 88);

    // 1F label
    ctx.fillStyle = '#6a6a8a';
    ctx.fillRect(8, 42, 24, 12);
    ctx.fillStyle = '#ffffff';
    this.drawText(ctx, '1F', 12, 44);

    // Ceiling lights on 1F
    for (let lx = 40; lx < W; lx += 60) {
      ctx.fillStyle = '#ffec27';
      ctx.fillRect(lx, 34, 8, 2);
      ctx.fillStyle = '#fff8b0';
      ctx.fillRect(lx + 1, 36, 6, 1);
    }

    // Pillars on 1F
    for (let px = 150; px < W; px += 80) {
      ctx.fillStyle = '#3d3d55';
      ctx.fillRect(px, 32, 6, 88);
    }

    // Floor divider 1F → MRT tracks
    ctx.fillStyle = '#6a6a8a';
    ctx.fillRect(0, 120, W, 3);

    // MRT track area
    ctx.fillStyle = '#1e1e30';
    ctx.fillRect(0, 123, W, 47);

    // Rails
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(0, 145, W, 2);
    ctx.fillRect(0, 152, W, 2);

    // MRT label
    ctx.fillStyle = '#4a7a9a';
    ctx.fillRect(8, 128, 30, 10);
    ctx.fillStyle = '#ffffff';
    this.drawText(ctx, 'MRT', 11, 130);

    // Floor divider MRT → B1
    ctx.fillStyle = '#6a6a8a';
    ctx.fillRect(0, 170, W, 3);

    // B1 area
    ctx.fillStyle = '#252540';
    ctx.fillRect(0, 173, W, 97);

    // B1 label
    ctx.fillStyle = '#6a6a8a';
    ctx.fillRect(8, 183, 24, 12);
    ctx.fillStyle = '#ffffff';
    this.drawText(ctx, 'B1', 12, 185);

    // Ceiling lights on B1
    for (let lx = 50; lx < W; lx += 60) {
      ctx.fillStyle = '#ffec27';
      ctx.fillRect(lx, 175, 8, 2);
      ctx.fillStyle = '#fff8b0';
      ctx.fillRect(lx + 1, 177, 6, 1);
    }

    // Pillars on B1
    for (let px = 120; px < W; px += 80) {
      ctx.fillStyle = '#353550';
      ctx.fillRect(px, 173, 6, 97);
    }

    // Floor divider B1 → THSR
    ctx.fillStyle = '#6a6a8a';
    ctx.fillRect(0, 270, W, 3);

    // THSR track area
    ctx.fillStyle = '#181828';
    ctx.fillRect(0, 273, W, 57);

    // Rails
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(0, 293, W, 2);
    ctx.fillRect(0, 300, W, 2);

    // THSR label
    ctx.fillStyle = '#9a6a2a';
    ctx.fillRect(8, 278, 34, 10);
    ctx.fillStyle = '#ffffff';
    this.drawText(ctx, 'THSR', 10, 280);

    // Ground
    ctx.fillStyle = '#6a6a8a';
    ctx.fillRect(0, 330, W, 3);
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 333, W, H - 333);
  }

  // ── Trains ──

  private drawTrains(ctx: CanvasRenderingContext2D, timestamp: number) {
    // MRT train: right to left, loops every 4 seconds
    const mrtCycle = (timestamp % 4000) / 4000;
    const mrtX = lerp(W + 20, -100, mrtCycle);
    this.drawMRTTrain(ctx, mrtX, 135);

    // THSR train: left to right, loops every 3 seconds (faster!)
    const thsrCycle = (timestamp % 3000) / 3000;
    const thsrX = lerp(-120, W + 20, thsrCycle);
    this.drawTHSRTrain(ctx, thsrX, 283);
  }

  private drawMRTTrain(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Boxy MRT train ~80px wide, 16px tall
    // Body
    ctx.fillStyle = '#2979b9';
    ctx.fillRect(x, y, 80, 16);
    // Stripe
    ctx.fillStyle = '#3aa5d9';
    ctx.fillRect(x, y + 3, 80, 3);
    // Windows
    ctx.fillStyle = '#a0e0ff';
    for (let wx = x + 6; wx < x + 76; wx += 12) {
      ctx.fillRect(wx, y + 2, 8, 5);
    }
    // Wheels
    ctx.fillStyle = '#333333';
    ctx.fillRect(x + 8, y + 16, 6, 3);
    ctx.fillRect(x + 30, y + 16, 6, 3);
    ctx.fillRect(x + 52, y + 16, 6, 3);
    ctx.fillRect(x + 68, y + 16, 6, 3);
  }

  private drawTHSRTrain(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Pointed-nose bullet train ~100px wide, 14px tall
    // Body
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(x + 12, y, 88, 14);
    // Pointed nose (left)
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(x + 6, y + 2, 6, 10);
    ctx.fillRect(x + 2, y + 4, 4, 6);
    ctx.fillRect(x, y + 5, 2, 4);
    // Tail (right)
    ctx.fillRect(x + 100, y + 2, 4, 10);
    ctx.fillRect(x + 104, y + 4, 2, 6);
    // Stripe
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 12, y + 6, 88, 2);
    // Windows
    ctx.fillStyle = '#ffe0a0';
    for (let wx = x + 18; wx < x + 96; wx += 10) {
      ctx.fillRect(wx, y + 2, 6, 4);
    }
    // Wheels
    ctx.fillStyle = '#333333';
    ctx.fillRect(x + 20, y + 14, 6, 3);
    ctx.fillRect(x + 50, y + 14, 6, 3);
    ctx.fillRect(x + 80, y + 14, 6, 3);
  }

  // ── Characters ──

  private drawCharacter(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    label: string,
    palette: { body: string; dark: string }
  ) {
    // Head (skin)
    ctx.fillStyle = '#ffccaa';
    ctx.fillRect(x, y, 8, 8);
    // Hair
    ctx.fillStyle = '#3a2a1a';
    ctx.fillRect(x, y, 8, 3);
    // Eyes
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x + 2, y + 4, 2, 2);
    ctx.fillRect(x + 5, y + 4, 2, 2);

    // Body
    ctx.fillStyle = palette.body;
    ctx.fillRect(x - 1, y + 8, 10, 10);
    ctx.fillStyle = palette.dark;
    ctx.fillRect(x - 1, y + 8, 10, 2);

    // Arm holding phone (right side)
    ctx.fillStyle = palette.body;
    ctx.fillRect(x + 9, y + 9, 4, 3);
    // Phone
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x + 10, y + 5, 3, 6);
    ctx.fillStyle = '#4488cc';
    ctx.fillRect(x + 10, y + 6, 3, 4);

    // Legs
    ctx.fillStyle = '#2a2a4a';
    ctx.fillRect(x, y + 18, 4, 6);
    ctx.fillRect(x + 5, y + 18, 4, 6);

    // Shoes
    ctx.fillStyle = '#5a3a1a';
    ctx.fillRect(x - 1, y + 24, 5, 2);
    ctx.fillRect(x + 5, y + 24, 5, 2);

    // Label
    ctx.fillStyle = '#ffffff';
    this.drawText(ctx, label, x - 2, y + 30);
  }

  // ── Phone glow ──

  private drawPhoneGlow(ctx: CanvasRenderingContext2D, progress: number) {
    if (progress < 0.1) return;
    const glow = mapRange(progress, 0.1, 0.2, 0, 1);
    const alpha = clamp(glow, 0, 1) * 0.6;
    ctx.fillStyle = `rgba(68, 136, 204, ${alpha})`;
    // Your phone glow
    ctx.fillRect(68, 87, 7, 8);
    // Friend phone glow
    if (progress > 0.65) {
      const fAlpha = mapRange(progress, 0.65, 0.75, 0, 0.6);
      ctx.fillStyle = `rgba(68, 136, 204, ${fAlpha})`;
      ctx.fillRect(248, 217, 7, 8);
    }
  }

  // ── Packets ──

  private drawPackets(ctx: CanvasRenderingContext2D, progress: number) {
    if (progress < 0.15) return;

    for (let i = 0; i < NUM_PACKETS; i++) {
      const packetT = mapRange(progress, 0.15, 0.75, 0, 1) - i * PACKET_SPREAD;
      if (packetT < 0 || packetT > 1) continue;
      const pos = interpolatePath(PACKET_PATH, packetT);
      const color = PACKET_COLORS[i % PACKET_COLORS.length];

      // Packet body
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(pos.x), Math.round(pos.y), 4, 4);
      // Highlight pixel
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(pos.x), Math.round(pos.y), 1, 1);
    }
  }

  // ── Dim overlay ──

  private drawDimOverlay(ctx: CanvasRenderingContext2D, alpha: number) {
    ctx.fillStyle = `rgba(10, 10, 20, ${clamp(alpha, 0, 0.45)})`;
    ctx.fillRect(0, 0, W, H);

    if (alpha > 0.2) {
      ctx.fillStyle = `rgba(255, 0, 77, ${mapRange(alpha, 0.2, 0.45, 0, 1)})`;
      this.drawText(ctx, '...or is it?', 120, 190);
    }
  }

  // ── Pixel text (using canvas built-in at low res = pixelated) ──

  private drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
    ctx.save();
    ctx.font = '8px monospace';
    ctx.textBaseline = 'top';
    ctx.fillText(text, x, y);
    ctx.restore();
  }
}

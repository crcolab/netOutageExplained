import './style.css';
import { TaipeiStationScene } from './animations/taipeiStation';

const canvas = document.getElementById('station-canvas') as HTMLCanvasElement;
const section = document.getElementById('naive-model')!;
const steps = document.querySelectorAll<HTMLElement>('.step');

const scene = new TaipeiStationScene(canvas);

// ── Scroll progress ──

let currentProgress = 0;

function updateProgress() {
  const rect = section.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  if (scrollable <= 0) return;
  currentProgress = Math.max(0, Math.min(1, -rect.top / scrollable));
}

// ── Render loop ──

function tick(timestamp: number) {
  updateProgress();
  scene.render(currentProgress, timestamp);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// ── Intersection Observer for step highlights ──

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      e.target.classList.toggle('is-active', e.isIntersecting);
    });
  },
  { threshold: 0.5 }
);

steps.forEach((step) => observer.observe(step));

// ── Resize ──

window.addEventListener('resize', () => scene.resize());
scene.resize();

/* ==================================================================
   VASE · section 6, The follow-up
   Red-figure amphora with Chiron shaping a hero, in four
   scenes (assets/vase/scene-1..4.webp, made in Gemini). The body is
   turned on a lathe (LatheGeometry) and the painting is put together on a
   canvas in the real proportion of the belly. The scroll turns the vase and
   it settles on each scene. Reduced motion: it stays still on scene I.
   Use: <div data-vase></div>, then initVase() from the page entry
   ================================================================== */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ASSETS } from '../lib/site';

let ScrollTrigger = null; // set by initVase

const CLAY = '#d2723e', CLAY_LIGHT = '#d98a55', GLAZE = '#16110e';

const SHAPE = {
  profile: [[0,0],[.15,0],[.16,.015],[.15,.03],[.10,.06],[.09,.09],[.13,.13],[.22,.22],[.29,.32],[.33,.42],[.345,.50],[.335,.58],[.30,.66],[.23,.72],[.15,.765],[.115,.80],[.105,.86],[.11,.92],[.135,.965],[.15,.985],[.145,1.0],[.12,1.0],[.10,.98],[.095,.93]],
  band: [.12, .745], shoulder: [.75, .785], neck: [.795, .95],
  handles: [[[.108,.90],[.20,.93],[.25,.86],[.24,.76],[.20,.715]]]
};
let IMAGES = [];

/* Meander: the same drawing as the landing band (assets/meander.svg),
   in clay on the glaze. The tile repeats a whole number of times
   around, so it closes with no break at the seam. */
let MEANDER = null;
const MEANDER_RATIO = 19535/8470;
async function loadMeander(){
  const svg = (await (await fetch(ASSETS + "meander.svg")).text()).replace(/fill:#000;stroke:#000/, "fill:" + CLAY + ";stroke:" + CLAY);
  MEANDER = await new Promise((ok, fail) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); });
}
function drawMeander(ctx, x0, y0, w, h){
  const tileW = h * MEANDER_RATIO * K, n = Math.round(w / tileW), stride = w / n;
  for (let k = 0; k < n; k++) ctx.drawImage(MEANDER, x0 + k*stride, y0, stride, h);
}
let K = 1; /* horizontal px per vertical px in the world: keeps ornaments from stretching */
/* Attic palmette: a fan of drop-shaped petals over two volutes curling
   outward. Also drawn one turn before and one after, so it is not cut
   at the seam. */
function palmette(ctx, cx, topY, h, tint, W){
  [cx - W, cx, cx + W].forEach(x => {
    if (x < -h*K || x > W + h*K) return;
    ctx.save(); ctx.translate(x, topY); ctx.scale(K, 1); ctx.fillStyle = tint; ctx.strokeStyle = tint;
    const base = h*.62;
    for (let i = -3; i <= 3; i++){
      const a = i*.24, len = h*(.5 - Math.abs(i)*.035);
      ctx.save(); ctx.translate(0, base); ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-len*.2, -len*.35, -len*.16, -len*.85, 0, -len);
      ctx.bezierCurveTo(len*.16, -len*.85, len*.2, -len*.35, 0, 0);
      ctx.fill(); ctx.restore();
    }
    ctx.beginPath(); ctx.arc(0, base, h*.055, 0, Math.PI*2); ctx.fill();
    ctx.lineWidth = h*.028; ctx.lineCap = 'round';
    [-1, 1].forEach(l => {
      ctx.beginPath();
      ctx.moveTo(0, base + h*.02);
      ctx.bezierCurveTo(l*h*.05, base + h*.16, l*h*.2, base + h*.2, l*h*.24, base + h*.12);
      ctx.bezierCurveTo(l*h*.27, base + h*.05, l*h*.19, base + h*.02, l*h*.17, base + h*.08);
      ctx.bezierCurveTo(l*h*.16, base + h*.11, l*h*.19, base + h*.13, l*h*.205, base + h*.1);
      ctx.stroke();
    });
    ctx.restore();
  });
}
function tongues(ctx, y0, h, W){
  const n = 64, w = W/n;
  for (let i = 0; i < n; i++){
    ctx.fillStyle = i%2 ? CLAY : GLAZE;
    ctx.beginPath(); ctx.moveTo(i*w+w*.08, y0);
    ctx.lineTo(i*w+w*.92, y0); ctx.lineTo(i*w+w*.92, y0+h*.6);
    ctx.quadraticCurveTo(i*w+w/2, y0+h*1.05, i*w+w*.08, y0+h*.6); ctx.fill();
  }
}

function painting(shape, pts, pathLength){
  const W = 4096, H = 2048;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  /* cumulative arc length: the texture follows the arc of the silhouette */
  const heightToV = y => {
    let i = pts.findIndex(p => p.y >= y); if (i < 1) i = 1;
    return (i) / (pts.length-1);
  };
  const bandY = (y0, y1) => { const a = H*(1-heightToV(y1)), b = H*(1-heightToV(y0)); return [a, b-a]; };

  const bandRadius = Math.max(...pts.filter(p => p.y >= shape.band[0] && p.y <= shape.band[1]).map(p => p.x));
  const pxU = W / (2*Math.PI*bandRadius), pxV = H / pathLength;
  K = pxU / pxV;
  ctx.fillStyle = GLAZE; ctx.fillRect(0, 0, W, H);

  /* figured band */
  const [fy, fh] = bandY(...shape.band);
  const bm = fh*.085;
  drawMeander(ctx, 0, fy, W, bm); drawMeander(ctx, 0, fy+fh-bm, W, bm);
  /* the four Gemini scenes, in the real proportion of the vase:
     width in px per unit = W / circumference; height in px per unit = H / profile length */
  const alt = fh - bm*2.2, worldHeight = alt / pxV;
  const pw = W/4;
  ctx.globalCompositeOperation = 'lighten';
  /* the scenes follow one after the other, as wide as possible; the black
     background of each image already separates one from the next */
  /* same height for all four: the scale comes from the scene that most needs
     to shrink to fit its quarter turn; all stand on the same line */
  const max = pw * .98;
  const scaleFactor = Math.min(1, ...IMAGES.map(img => max / (worldHeight * (img.width/img.height) * pxU)));
  const a = alt * scaleFactor, topY = fy + bm*1.1 + (alt - a)/2;
  IMAGES.forEach((img, i) => {
    const imgWidth = worldHeight * scaleFactor * (img.width/img.height) * pxU;
    ctx.drawImage(img, i*pw + pw/2 - imgWidth/2, topY, imgWidth, a);
  });
  ctx.globalCompositeOperation = 'source-over';

  if (shape.shoulder){ const [oy, oh] = bandY(...shape.shoulder); tongues(ctx, oy, oh*.8, W); }
  if (shape.neck){ const [ny, nh] = bandY(...shape.neck); for (let i = 0; i < 16; i++) palmette(ctx, (i+.5)*W/16, ny+nh*.1, nh*.8, CLAY, W); }
  if (shape.lower){ const [ly, lh] = bandY(...shape.lower); tongues(ctx, ly, lh, W); }
  /* clay fillet at the base */
  const [ry, rh] = bandY(.03, .06); ctx.fillStyle = CLAY; ctx.fillRect(0, ry, W, rh);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.RepeatWrapping; tex.anisotropy = 8;
  return tex;
}

/* rotation that brings scene i (0 to 3) to face the camera */
const angleAt = i => -(Math.PI/4 + i*Math.PI/2);

async function startRive(host){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  IMAGES = await Promise.all([1,2,3,4].map(n => new Promise((ok, fail) => {
    const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = `${ASSETS}vase/scene-${n}.webp`;
  })));
  await loadMeander();
  await document.fonts.ready;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .95;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  host.__renderer = renderer;
  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture;
  scene.environmentIntensity = .45;
  const camera = new THREE.PerspectiveCamera(30, 1, .01, 50);
  camera.position.set(0, .62, 3.0); camera.lookAt(0, .5, 0);
  const keyLight = new THREE.DirectionalLight('#fff4e6', 1.5); keyLight.position.set(-2, 3, 2.5); scene.add(keyLight);
  scene.add(new THREE.HemisphereLight('#fff8ee', '#8a6a55', .6));

  const curve = new THREE.SplineCurve(SHAPE.profile.map(([r, y]) => new THREE.Vector2(r, y)));
  const pts = curve.getSpacedPoints(240);
  const vase = new THREE.Group();
  vase.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 160),
    new THREE.MeshPhysicalMaterial({ map: painting(SHAPE, pts, curve.getLength()), roughness: .45, clearcoat: .5, clearcoatRoughness: .4, side: THREE.DoubleSide })));
  const handleMat = new THREE.MeshPhysicalMaterial({ color: GLAZE, roughness: .35, clearcoat: .7 });
  SHAPE.handles.forEach(a => [0, Math.PI].forEach(ang => {
    /* the handle ends grow from inside the body: the radius comes from the silhouette */
    const radiusAt = y => { for (let i = 1; i < pts.length; i++) if (pts[i].y >= y){ const p = pts[i-1], q = pts[i]; return p.x + (q.x-p.x)*(y-p.y)/((q.y-p.y) || 1); } return pts[pts.length-1].x; };
    const pan = a.map(p => p.slice());
    const [y0, y1] = [pan[0][1], pan[pan.length-1][1]];
    pan[0][0] = radiusAt(y0) - .012; pan.unshift([radiusAt(y0) - .03, y0]);
    pan[pan.length-1][0] = radiusAt(y1) - .012; pan.push([radiusAt(y1) - .03, y1]);
    const c = new THREE.CatmullRomCurve3(pan.map(([r, y]) => new THREE.Vector3(r, y, 0)));
    const m = new THREE.Mesh(new THREE.TubeGeometry(c, 64, .018, 16, false), handleMat);
    m.rotation.y = ang; vase.add(m);
  }));
  vase.rotation.y = angleAt(0);
  scene.add(vase);

  const resizeView = () => {
    const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w/h;
    camera.fov = w/h < .85 ? 27 : 25; camera.updateProjectionMatrix();
  };
  new ResizeObserver(resizeView).observe(host); resizeView();

  /* the scroll goes from 0 to 3 (scene I to IV); the vase chases the target with
     damping and, when still, settles on the nearest scene */
  let targetPos = 0, currentPos = 0, lastScroll = 0, isVisible = true, prevMs = performance.now();
  const currentScene = () => Math.round(currentPos);
  if (!reduce && ScrollTrigger){
    ScrollTrigger.create({
      trigger: host.closest('[data-vase-track]') || host,
      start: 'top top', end: 'bottom bottom',
      onUpdate: s => { targetPos = s.progress * 3; lastScroll = performance.now(); }
    });
  }
  new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; }).observe(host);
  renderer.setAnimationLoop(() => {
    const nowMs = performance.now(), dt = Math.min(.1, (nowMs - prevMs) / 1000); prevMs = nowMs;
    if (!isVisible) return;
    const still = performance.now() - lastScroll > 180;
    const dest = still ? Math.round(targetPos) : targetPos;
    currentPos += (dest - currentPos) * (1 - Math.exp(-dt * 5));
    vase.rotation.y = -(Math.PI/4 + currentPos*Math.PI/2);
    const c = String(currentScene() + 1); if (host.dataset.scene !== c) host.dataset.scene = c;
    renderer.render(scene, camera);
  });
  window.OlimpoVase = { streakState: () => ({ targetPos: +targetPos.toFixed(2), currentPos: +currentPos.toFixed(2), sceneNum: currentScene() + 1 }) };
}

/* only builds when the section is close to the screen; returns a cleanup for the Next client component */
export function initVase({ ScrollTrigger: st = null } = {}) {
  ScrollTrigger = st;
  const host = document.querySelector('[data-vase]');
  if (!host) return () => {};
  const io = new IntersectionObserver((es) => {
    if (es.some(e => e.isIntersecting)){ io.disconnect(); startRive(host).catch(err => { console.warn('vase did not mount', err); host.classList.add('is-fallback'); }); }
  }, { rootMargin: '400px 0px' });
  io.observe(host);
  return () => { io.disconnect(); if (host.__renderer) { host.__renderer.setAnimationLoop(null); host.__renderer.dispose(); } };
}

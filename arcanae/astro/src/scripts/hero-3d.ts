// The hero statue in three.js (the original hero-3d.js, ported as a module with a cleanup). Studio wall, warm
// spotlight, the statue with its baked wash, a dotted outline while the model downloads, and a colour grade.
// three.js is loaded only after the page load, so the 3D never holds the first paint. On devices without a graphics
// card the head shows a still picture instead (html.no-gpu) and three.js is not loaded at all.
// three ships without type declarations in this repository (it is vendored, see vendor/three/VERSION), so the scene
// objects are typed as any; the module boundary is typed.
import { DRACO_DECODER } from '../lib/site';

export function initHero3d(): () => void {
  let disposed = false;
  let teardown: () => void = () => {};
  const start = async () => {
    const [THREE, { GLTFLoader }, { DRACOLoader }, { EffectComposer }, { RenderPass }, { UnrealBloomPass }, { ShaderPass }, { OutputPass }, { FXAAShader }] = await Promise.all([
      import('three'),
      import('three/addons/loaders/GLTFLoader.js'),
      import('three/addons/loaders/DRACOLoader.js'),
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js'),
      import('three/addons/postprocessing/ShaderPass.js'),
      import('three/addons/postprocessing/OutputPass.js'),
      import('three/addons/shaders/FXAAShader.js'),
    ]);
    if (disposed) return;
    teardown = scene3d(THREE, { GLTFLoader, DRACOLoader, EffectComposer, RenderPass, UnrealBloomPass, ShaderPass, OutputPass, FXAAShader });
  };
  const onLoad = () => void start();
  if (!document.documentElement.classList.contains('no-gpu')) {
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
  }
  return () => {
    disposed = true;
    window.removeEventListener('load', onLoad);
    teardown();
  };
}

function scene3d(THREE: any, addons: Record<string, any>): () => void {
  const { GLTFLoader, DRACOLoader, EffectComposer, RenderPass, UnrealBloomPass, ShaderPass, OutputPass, FXAAShader } = addons;
  const box = document.getElementById('hero-3d');
  const canvas = box?.querySelector('canvas');
  if (!box || !canvas) return () => {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MODEL = box.dataset.model;
  /* data-points names the dotted outline file; without it, the model path with .points.bin */
  const POINTS = box.dataset.points || (MODEL && MODEL.replace('.glb', '.points.bin'));
  const loadingEl = box.querySelector<HTMLElement>('[data-loading]');
  const pctEl = box.querySelector<HTMLElement>('[data-loading-pct]');
  const cleanups: (() => void)[] = [];
  let frame = 0;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  const PR = Math.min(window.devicePixelRatio, 1.25);
  renderer.setPixelRatio(PR);
  /* no ACES: it darkened the wall João approved; the grade rolls off the statue highlights instead */
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  camera.position.set(0, 0.28, 3.4);
  camera.lookAt(0, 0.05, 0);

  /* ---------- studio wall, drawn first, full frame ---------- */
  /* the plaster texture is static: drawn once into a small target, then only sampled (the per frame noise was the second
     biggest cost measured on an Intel UHD) */
  const NOISE = `
      float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 6; i++){ v += a*noise(p); p = p*2.02 + 7.1; a *= 0.5; } return v; }`;
  const plasterRT = new THREE.WebGLRenderTarget(1024, 576, { type: THREE.UnsignedByteType, wrapS: THREE.RepeatWrapping, wrapT: THREE.RepeatWrapping });
  {
    const bake = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
      fragmentShader: `precision highp float; varying vec2 vUv; ${NOISE}
        void main(){ vec2 p = vec2(vUv.x*1.7778, vUv.y); float v = fbm(p*3.0)*0.6 + fbm(p*14.0 + 3.0)*0.4; gl_FragColor = vec4(v, v, v, 1.0); }`,
    }));
    const bakeScene = new THREE.Scene(); bakeScene.add(bake);
    renderer.setRenderTarget(plasterRT); renderer.render(bakeScene, new THREE.Camera()); renderer.setRenderTarget(null);
    bake.geometry.dispose(); bake.material.dispose();
  }
  const U = { uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) }, uPool: { value: new THREE.Vector2(0.7, 0.55) }, tPlaster: { value: plasterRT.texture } };
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    uniforms: U, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }',
    fragmentShader: `
      precision highp float;
      varying vec2 vUv; uniform float uTime; uniform vec2 uRes; uniform vec2 uPool; uniform sampler2D tPlaster;
      float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
      float fbm3(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 3; i++){ v += a*noise(p); p = p*2.02 + 7.1; a *= 0.5; } return v / 0.875; }
      void main(){
        vec2 uv = vUv; float asp = uRes.x / uRes.y; vec2 p = vec2(uv.x*asp, uv.y);
        float plaster = texture2D(tPlaster, vec2(p.x / 1.7778, p.y)).r;
        vec3 wallDark = vec3(0.105, 0.085, 0.068);
        vec3 wallLit  = vec3(0.46, 0.37, 0.27);
        vec2 c = vec2(uPool.x*asp, uPool.y);
        float d = length((p - c) * vec2(0.8, 1.0));
        float pool = smoothstep(0.75, 0.0, d); pool *= pool;
        vec2 bdir = normalize(vec2(0.55, -0.62));
        vec2 rel = p - vec2(uPool.x*asp - 0.9, 1.15);
        float along = dot(rel, bdir);
        float across = abs(rel.x*bdir.y - rel.y*bdir.x);
        float beam = smoothstep(0.34 + along*0.18, 0.0, across) * smoothstep(0.0, 0.4, along) * smoothstep(1.9, 0.6, along);
        beam *= 0.55 + 0.6*fbm3(p*2.2 + vec2(uTime*0.02, -uTime*0.012));
        vec3 col = mix(wallDark, wallLit, pool*0.9) * (0.78 + 0.44*plaster);
        col += vec3(0.95, 0.78, 0.55) * beam * 0.16;
        col *= mix(0.6, 1.0, smoothstep(0.0, 0.35, uv.y));
        col *= 1.0 - 0.6*pow(length(uv - vec2(0.62, 0.52))*1.15, 2.2);
        gl_FragColor = vec4(pow(max(col, 0.0), vec3(2.2)), 1.0);   /* the wall is authored in display colour; the pipeline is linear */
      }`,
  }));
  wall.frustumCulled = false;
  wall.renderOrder = -10;
  scene.add(wall);

  /* ---------- lights ---------- */
  const key = new THREE.SpotLight(0xffe7c7, 32, 12, 0.5, 0.65, 1.6);
  key.position.set(-2.2, 3.1, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  key.shadow.radius = 6;
  const rim = new THREE.DirectionalLight(0xd6a86a, 1.7);
  rim.position.set(2.6, 1.6, -2.4);
  const fill = new THREE.HemisphereLight(0xfff2e0, 0x3a2a1e, 0.4);
  scene.add(key, key.target, rim, fill);

  /* ---------- statue material: baked wash between dark wash and warm white, faint veining ---------- */
  const marble = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0, vertexColors: true, transparent: true, opacity: 0 });
  marble.onBeforeCompile = (sh: any) => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWorldPos;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      varying vec3 vWorldPos;
      float h3(vec3 p){ p = fract(p*0.3183099 + 0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
      float n3(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.0-2.0*f);
        return mix(mix(mix(h3(i), h3(i+vec3(1,0,0)), f.x), mix(h3(i+vec3(0,1,0)), h3(i+vec3(1,1,0)), f.x), f.y),
                   mix(mix(h3(i+vec3(0,0,1)), h3(i+vec3(1,0,1)), f.x), mix(h3(i+vec3(0,1,1)), h3(i+vec3(1,1,1)), f.x), f.y), f.z); }`)
      .replace('#include <color_fragment>', `
        float washAmt = 1.0 - smoothstep(0.28, 0.92, vColor.r);
        vec3 white = vec3(0.93, 0.9, 0.84) * (0.95 + 0.07*(n3(vWorldPos*9.0)*0.6 + n3(vWorldPos*31.0)*0.4));
        diffuseColor.rgb = mix(white, vec3(0.24, 0.18, 0.13), washAmt*0.85);`);
  };

  const pivot = new THREE.Group();
  scene.add(pivot);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: 0.5 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.5;
  floor.receiveShadow = true;
  scene.add(floor);

  /* ---------- dust in the beam ---------- */
  const DUST = 70;
  const dustGeo = new THREE.BufferGeometry();
  const dp = new Float32Array(DUST * 3), ds = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) { dp[i*3] = -1.1 + Math.random()*1.5; dp[i*3+1] = -0.2 + Math.random()*1.5; dp[i*3+2] = 0.2 + Math.random()*0.8; ds[i] = Math.random(); }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  dustGeo.setAttribute('seed', new THREE.BufferAttribute(ds, 1));
  const dustMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPix: { value: PR } },
    vertexShader: `attribute float seed; uniform float uTime; uniform float uPix; varying float vA;
      void main(){ vec3 p = position; p.y += mod(uTime*0.02*(0.4+seed), 2.0) - 1.0; p.x += sin(uTime*0.3 + seed*20.0)*0.04;
        vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
        gl_PointSize = (0.8 + seed*1.6) * uPix * (3.0 / -mv.z); vA = 0.12 + 0.3*seed; }`,
    fragmentShader: 'varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(1.0, 0.85, 0.6, vA*(1.0 - d*2.0)); }',
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  /* ---------- loading: the dotted statue ---------- */
  const dotU = { uTime: { value: 0 }, uPix: { value: PR }, uGather: { value: reduce ? 1 : 0 }, uFade: { value: 1 }, uTop: { value: 1 } };
  const dotMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: dotU,
    vertexShader: `attribute float seed; attribute vec3 scatter; uniform float uTime, uPix, uGather, uTop; varying float vA;
      void main(){
        float g = smoothstep(0.0, 1.0, clamp(uGather*1.4 - seed*0.4, 0.0, 1.0));
        vec3 p = mix(position + scatter, position, g);
        vec4 world = modelMatrix * vec4(p, 1.0);
        float scan = fract(uTime*0.35);
        float h = clamp((position.y + 0.5) / uTop, 0.0, 1.0);
        float band = exp(-pow((h - scan) * 14.0, 2.0));
        float twinkle = 0.55 + 0.45*sin(uTime*3.0 + seed*40.0);
        vA = (0.5 + 0.35*twinkle + band*0.9) * g;
        vec4 mv = viewMatrix * world; gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.9 + band*1.8) * uPix * (3.0 / -mv.z);
      }`,
    fragmentShader: `uniform float uFade; varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
      gl_FragColor = vec4(vec3(1.0, 0.88, 0.66), vA * uFade * (1.0 - d*1.6)); }`,
  });
  let dots: any = null;
  fetch(POINTS!).then((r: Response) => r.arrayBuffer()).then((buf: ArrayBuffer) => {
    const head = new Float32Array(buf, 0, 6);
    const q = new Uint16Array(buf, 24);
    const n = q.length / 3;
    const pos = new Float32Array(n * 3), sc = new Float32Array(n * 3), sd = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      for (let k = 0; k < 3; k++) pos[i*3+k] = head[k] + (q[i*3+k] / 65535) * (head[3+k] - head[k]);
      const a = Math.random() * Math.PI * 2, r = 0.4 + Math.random() * 0.8;
      sc[i*3] = Math.cos(a) * r; sc[i*3+1] = (Math.random() - 0.3) * 0.9; sc[i*3+2] = Math.sin(a) * r;
      sd[i] = Math.random();
    }
    /* same placement as the model: centred on x and z, standing on the floor */
    const cx = (head[0] + head[3]) / 2, cz = (head[2] + head[5]) / 2;
    for (let i = 0; i < n; i++) { pos[i*3] -= cx; pos[i*3+1] += -head[1] - 0.5; pos[i*3+2] -= cz; }
    dotU.uTop.value = head[4] - head[1];
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('scatter', new THREE.BufferAttribute(sc, 3));
    g.setAttribute('seed', new THREE.BufferAttribute(sd, 1));
    dots = new THREE.Points(g, dotMat);
    dots.frustumCulled = false;
    pivot.add(dots);
  }).catch(() => {});

  let loaded = false;
  const loadStatue = () => {
    const draco = new DRACOLoader().setDecoderPath(DRACO_DECODER);
    new GLTFLoader().setDRACOLoader(draco).load(MODEL, (gltf: any) => {
      const model = gltf.scene;
      model.traverse((o: any) => { if (o.isMesh) { o.material = marble; o.castShadow = true; } });
      const b = new THREE.Box3().setFromObject(model);
      const c = b.getCenter(new THREE.Vector3());
      model.position.set(-c.x, -b.min.y - 0.5, -c.z);
      pivot.add(model);
      draco.dispose();
      loaded = true;
      if (pctEl) pctEl.textContent = '100%';
      box.classList.add('has-statue');
    }, (xhr: ProgressEvent) => { if (pctEl && xhr.total) pctEl.textContent = Math.round((xhr.loaded / xhr.total) * 100) + '%'; });
  };
  if (document.readyState === 'complete') loadStatue();
  else window.addEventListener('load', loadStatue, { once: true });
  cleanups.push(() => window.removeEventListener('load', loadStatue));

  /* ---------- post: bloom on the highlights, then the colour grade, then tone mapping ---------- */
  const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 0 });
  const composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.28, 0.6, 0.85);
  composer.addPass(bloom);
  const grade = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform sampler2D tDiffuse; uniform float uTime; uniform vec2 uRes; varying vec2 vUv;
      float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
      void main(){
        vec2 uv = vUv; vec2 off = (uv - 0.5) * 0.0008;
        vec3 c = vec3(texture2D(tDiffuse, uv + off).r, texture2D(tDiffuse, uv).g, texture2D(tDiffuse, uv - off).b);
        float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
        /* soft shoulder: highlights roll off instead of clipping (the wall stays under the knee, untouched) */
        vec3 over = max(c - 0.7, 0.0); c = min(c, 0.7) + over / (1.0 + over / 0.35);
        lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
        /* warm umber in the shadows, cream in the highlights */
        c = mix(c * vec3(1.08, 0.96, 0.84), c, smoothstep(0.0, 0.5, lum));
        c *= mix(vec3(1.0), vec3(1.05, 1.0, 0.92), smoothstep(0.35, 1.6, lum));
        /* gentle contrast around mid grey, a touch less saturation */
        c = mix(vec3(lum), c, 0.9);
        c = pow(c, vec3(1.03)) * 1.03;
        /* vignette and grain, over the statue too */
        c *= 1.0 - 0.18 * pow(length(uv - vec2(0.6, 0.5)) * 1.2, 2.4);
        /* grain: one value per screen pixel, a new pattern 24 times a second, no lattice lines (the old hash drew faint columns) */
        c += (hash(gl_FragCoord.xy + floor(uTime * 24.0) * vec2(17.0, 59.0)) - 0.5) * 0.02;
        gl_FragColor = vec4(max(c, 0.0), 1.0);
      }`,
  });
  composer.addPass(grade);
  composer.addPass(new OutputPass());
  /* light edge smoothing after the output: MSAA on the float target cost half the frame rate on an Intel UHD */
  const fxaa = new ShaderPass(FXAAShader);
  composer.addPass(fxaa);

  let side = 0;
  const resize = () => {
    const w = box.clientWidth, h = box.clientHeight;
    renderer.setSize(w, h, false);
    composer.setPixelRatio(PR);
    composer.setSize(w, h);
    bloom.setSize(w * PR / 2, h * PR / 2);   /* the glow is soft anyway: half resolution costs a quarter */
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    U.uRes.value.set(w * PR, h * PR);
    grade.uniforms.uRes.value.set(w * PR, h * PR);
    fxaa.material.uniforms.resolution.value.set(1 / (w * PR), 1 / (h * PR));
    const viewW = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    side = w >= 992 ? viewW * 0.22 : 0;
    U.uPool.value.set(w >= 992 ? 0.72 : 0.5, 0.55);
  };
  const resizer = new ResizeObserver(resize);
  resizer.observe(box);
  resize();

  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => { pointer.x = (e.clientX / window.innerWidth) * 2 - 1; pointer.y = (e.clientY / window.innerHeight) * 2 - 1; };
  window.addEventListener('pointermove', onPointer);
  let visible = true;
  const seen = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
  seen.observe(box);

  const clock = new THREE.Clock();
  const turn = { y: 0 };
  let dissolve = 0;
  let lit = false;
  const loop = () => {
    frame = requestAnimationFrame(loop);
    if (!visible) return;
    const dt = Math.min(0.05, clock.getDelta());
    const t = reduce ? 0 : clock.elapsedTime;
    U.uTime.value = t;
    dustMat.uniforms.uTime.value = t;
    dotU.uTime.value = reduce ? 0.3 : t;
    grade.uniforms.uTime.value = t;
    if (dots && !reduce) dotU.uGather.value = Math.min(1, dotU.uGather.value + dt * 0.9);
    if (loaded) {
      dissolve = Math.min(1, dissolve + dt * 0.8);
      marble.opacity = dissolve;
      dotU.uFade.value = 1 - dissolve;
      if (dissolve === 1 && marble.transparent) {
        marble.transparent = false; marble.needsUpdate = true;
        if (dots) { pivot.remove(dots); dots.geometry.dispose(); dots = null; }
        if (loadingEl) loadingEl.hidden = true;
      }
    }
    const scrolled = reduce ? 0 : Math.min(1, window.scrollY / Math.max(1, box.offsetHeight));
    const target = reduce ? 0 : Math.sin(t * 0.3) * 0.35 + pointer.x * 0.3 + scrolled * 1.0;
    turn.y += (target - turn.y) * 0.05;
    pivot.rotation.set(0, turn.y, 0);
    pivot.position.x = side;
    floor.position.x = side;
    dust.position.x = side;
    key.target.position.set(side, 0, 0);
    /* the live light fades in over the still once the intro has left the screen */
    if (!lit && document.body.classList.contains('intro-done')) { lit = true; box.classList.add('is-lit'); }
    composer.render();
  };
  loop();

  return () => {
    cancelAnimationFrame(frame);
    resizer.disconnect();
    seen.disconnect();
    window.removeEventListener('pointermove', onPointer);
    cleanups.forEach((fn) => fn());
    composer.dispose?.();
    renderer.dispose();
  };
}

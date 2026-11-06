import React, { useEffect, useRef } from 'react';

const VERT_SRC = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uNearX, uFarX, uCirrusX;
uniform float uCoverage, uSize, uSoftness, uShadow, uCirrus;
uniform vec3 uZenith, uHorizon, uCloud;
uniform vec4 uGlow;
uniform vec2 uSun;
uniform vec2 uParallax;

vec2 hash22(vec2 p){
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy);
}

float hash12(vec2 p){
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float vnoise(vec2 x){
  vec2 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), f.x),
             mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p){
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++){
    s += a * vnoise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return s;
}

vec2 blobs(vec2 uv, float seed){
  vec2 id = floor(uv), f = fract(uv);
  float best = -1e4;
  float wsum = 0.0, ysum = 0.0;
  float wMax = min(2.150, 0.72 * uSize);
  float reach = min(2.0, ceil(wMax + 0.85) - 1.0);
  for (int j = -2; j <= 2; j++){
    for (int i = -2; i <= 2; i++){
      vec2 o = vec2(float(i), float(j));
      if (max(abs(o.x), abs(o.y)) > reach) continue;
      vec2 h = hash22(id + o + seed);
      if (fract(h.x * 37.1) > uCoverage) continue;
      vec2 c = o + 0.15 + h * 0.7;
      float w = min(2.150, (0.30 + 0.42 * fract(h.y * 19.7)) * uSize);
      vec2 d = f - c;
      float ry = (d.y > 0.0 ? 0.340 : 0.190) * uSize * (0.8 + 0.5 * fract(h.y * 7.3));
      float e = length(vec2(d.x / max(w, 1e-3), d.y / max(ry, 1e-3)));
      float val = 1.0 - e;
      float yN = d.y / max(ry, 1e-3);
      if (val > best){
        float k = exp(12.0 * (best - val));
        wsum = wsum * k + 1.0;
        ysum = ysum * k + yN;
        best = val;
      } else {
        float g = exp(12.0 * (val - best));
        wsum += g;
        ysum += g * yN;
      }
    }
  }
  return vec2(best, ysum / max(wsum, 1e-4));
}

vec2 cloudField(vec2 uv, float seed, float detailScale){
  vec2 b = blobs(uv, seed);
  float n = fbm(uv * detailScale + seed * 3.1) * 0.72
          + fbm(uv * detailScale * 3.3 + seed * 7.7) * 0.28;
  return vec2(b.x - (1.0 - n) * 0.700, b.y);
}

vec3 shadeCloud(float dyNorm, vec3 sky){
  float t = smoothstep(-0.95, 0.25, dyNorm);
  vec3 base = mix(uCloud * 0.52, sky, 0.34);
  return mix(mix(uCloud, base, uShadow), uCloud, t);
}

void main(){
  vec2 frag = gl_FragCoord.xy / max(uRes.y, 1.0);
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(frag.x, frag.y);

  vec3 sky = mix(uHorizon, uZenith, smoothstep(-0.15, 1.05, p.y));
  vec2 sunP = vec2(uSun.x * aspect, uSun.y);
  float sd = length(p - sunP);
  sky += uGlow.rgb * uGlow.a * exp(-sd * 3.4) * 0.30;

  vec3 col = sky;

  if (uCirrus > 0.0) {
    vec2 cuv = vec2(p.x * 1.4 + uCirrusX, p.y * 5.5);
    float veil = fbm(cuv) * fbm(cuv * 2.3 + 9.0);
    veil = smoothstep(0.24, 0.55, veil) * smoothstep(0.15, 0.7, p.y);
    col = mix(col, uCloud, veil * uCirrus * 0.5);
  }

  vec2 fuv = vec2(p.x + uFarX, p.y) * 2.150 + uParallax * 0.4;
  vec2 fd = cloudField(fuv, 17.0, 11.0);
  float fa = clamp(fd.x * uSoftness, 0.0, 1.0);
  if (fa > 0.0) {
    vec3 lit = shadeCloud(fd.y, sky);
    col = mix(col, mix(lit, sky, 0.550), fa);
  }

  vec2 nuv = vec2(p.x + uNearX, p.y) * 1.050 + uParallax;
  vec2 nd = cloudField(nuv, 3.0, 8.5);
  float na = clamp(nd.x * uSoftness, 0.0, 1.0);
  if (na > 0.0) {
    vec3 lit = shadeCloud(nd.y, sky);
    float above = clamp(cloudField(nuv + vec2(0.0, 0.085), 3.0, 8.5).x * uSoftness, 0.0, 1.0);
    lit *= 1.0 - 0.18 * uShadow * above;
    lit += uGlow.rgb * uGlow.a * 0.22 * exp(-length(p - sunP) * 1.6);
    col = mix(col, lit, na);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  }
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
}

export const CloudSkyCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const glOpts = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power' as const,
    };

    const gl =
      (canvas.getContext('webgl', glOpts) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl', glOpts) as WebGLRenderingContext | null);

    if (!gl) return;

    function compile(type: number, src: string) {
      if (!gl) return null;
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn('CloudSky shader compile error:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('CloudSky link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);

    const zen = hexToRgb('#1F4A6D');
    const hor = hexToRgb('#94C9D1');
    const cld = hexToRgb('#FFFFFF');
    const glow = hexToRgb('#FFFFFF');

    gl.uniform1f(u('uCoverage'), 0.72);
    gl.uniform1f(u('uSize'), 1.3);
    gl.uniform1f(u('uSoftness'), 2.25);
    gl.uniform1f(u('uShadow'), 0.7);
    gl.uniform1f(u('uCirrus'), 1.0);
    gl.uniform2f(u('uSun'), 1.0, 1.0);
    gl.uniform3f(u('uZenith'), zen[0], zen[1], zen[2]);
    gl.uniform3f(u('uHorizon'), hor[0], hor[1], hor[2]);
    gl.uniform3f(u('uCloud'), cld[0], cld[1], cld[2]);
    gl.uniform4f(u('uGlow'), glow[0], glow[1], glow[2], 0.9);

    const uRes = u('uRes');
    const uNearX = u('uNearX');
    const uFarX = u('uFarX');
    const uCirrusX = u('uCirrusX');
    const uParallax = u('uParallax');

    const RENDER_SCALE = 0.5;
    const FRAME_MS = 1000 / 30;
    const NEAR_DRIFT = 0.055;
    const FAR_DRIFT = 0.026;
    const CIRRUS_DRIFT = 0.014;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let last = 0;
    let lastDraw = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let sizeDirty = true;
    let nearX = 0;
    let farX = 0;
    let cirrusX = 0;
    let leanX = 0;
    let leanY = 0;
    const ptr = { x: 0, y: 0, inside: false };

    function resize() {
      if (!canvas || !gl) return;
      const w = Math.max(1, Math.round((canvas.clientWidth || 1200) * RENDER_SCALE));
      const h = Math.max(1, Math.round((canvas.clientHeight || 640) * RENDER_SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
      sizeDirty = false;
    }

    function draw() {
      if (!gl) return;
      if (sizeDirty) resize();
      gl.uniform1f(uNearX, nearX);
      gl.uniform1f(uFarX, farX);
      gl.uniform1f(uCirrusX, cirrusX);
      gl.uniform2f(uParallax, -leanX * 3.0 * 0.07, -leanY * 3.0 * 0.05);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function step(now: number) {
      if (!visible || !pageVisible) {
        raf = 0;
        return;
      }
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      nearX += NEAR_DRIFT * 0.72 * dt;
      farX += FAR_DRIFT * 0.72 * dt;
      cirrusX += CIRRUS_DRIFT * 0.72 * dt;

      const targetX = ptr.inside ? ptr.x : 0;
      const targetY = ptr.inside ? ptr.y : 0;
      const blend = 1 - Math.exp(-dt * (50 / 6));
      leanX += (targetX - leanX) * blend;
      leanY += (targetY - leanY) * blend;

      if (now - lastDraw >= FRAME_MS) {
        draw();
        lastDraw = now;
      }
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (!raf && visible && pageVisible && !reduceMotion) {
        last = 0;
        raf = requestAnimationFrame(step);
      }
    }

    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    const onPointerMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      ptr.inside = true;
      ptr.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ptr.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      start();
    };

    const onPointerLeave = () => {
      ptr.inside = false;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave);

    const onResize = () => {
      sizeDirty = true;
      if (!raf) draw();
    };
    window.addEventListener('resize', onResize, { passive: true });

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        visible = entries[0] ? entries[0].isIntersecting : true;
        if (visible) start();
        else stop();
      });
      io.observe(canvas);
    }

    draw();
    start();

    return () => {
      stop();
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroCanvas:
 * Interactive 3D particle sphere engineered with Three.js.
 * Features:
 * - Dynamic lazy-loading of Three.js (never blocks LCP / initial bundle)
 * - Mobile / low-power detection fallback
 * - WebGL capability detection fallback
 * - prefers-reduced-motion check
 * - Smooth lerped cursor physics & scroll damping
 */
export const HeroCanvas = () => {
  const containerRef = useRef(null);
  const [hasFallback, setHasFallback] = useState(false);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasFallback(true);
      return;
    }

    // 2. Performance: Check mobile screen or low-end device
    const isMobile = window.innerWidth < 768;
    const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    if (isMobile || isLowPower) {
      setHasFallback(true);
      return;
    }

    // 3. Robustness: Check WebGL support
    const hasWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!hasWebGL()) {
      setHasFallback(true);
      return;
    }

    let isDisposed = false;
    let animationFrameId;
    let renderer, scene, camera, points, geometry, material;

    // 4. Lazy-load Three.js via dynamic import
    import('three')
      .then((THREE) => {
        if (isDisposed || !containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;

        // Scene & Camera
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 4.2;

        // Renderer
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle Geometry (Fibonacci sphere distribution)
        const particleCount = 2200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorViolet = new THREE.Color('#8B5CF6');
        const colorCyan = new THREE.Color('#06B6D4');
        const colorEmerald = new THREE.Color('#10B981');
        const tempColor = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
          const phi = Math.acos(-1 + (2 * i) / particleCount);
          const theta = Math.sqrt(particleCount * Math.PI) * phi;

          const radius = 1.65 + (Math.sin(i * 0.15) * 0.12);
          const x = radius * Math.cos(theta) * Math.sin(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(phi);

          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;

          // Color gradient distribution
          const ratio = (y + 1.65) / 3.3;
          if (ratio < 0.5) {
            tempColor.lerpColors(colorViolet, colorCyan, ratio * 2);
          } else {
            tempColor.lerpColors(colorCyan, colorEmerald, (ratio - 0.5) * 2);
          }

          colors[i * 3] = tempColor.r;
          colors[i * 3 + 1] = tempColor.g;
          colors[i * 3 + 2] = tempColor.b;
        }

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Material with additive glow
        material = new THREE.PointsMaterial({
          size: 0.038,
          vertexColors: true,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        points = new THREE.Points(geometry, material);
        scene.add(points);

        // Smooth Mouse Parallax Physics
        let targetRotationX = 0;
        let targetRotationY = 0;
        let currentRotationX = 0;
        let currentRotationY = 0;

        const onMouseMove = (e) => {
          const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
          const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
          targetRotationY = normalizedX * 0.45;
          targetRotationX = normalizedY * 0.35;
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Responsive Resize Handler
        const onResize = () => {
          if (!container || !renderer || !camera) return;
          const newW = container.clientWidth || window.innerWidth;
          const newH = container.clientHeight || window.innerHeight;
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        };

        window.addEventListener('resize', onResize);

        // Animation Loop
        let clock = new THREE.Clock();

        const animate = () => {
          if (isDisposed) return;
          animationFrameId = requestAnimationFrame(animate);

          const elapsedTime = clock.getElapsedTime();

          // Damped rotation towards mouse target
          currentRotationX += (targetRotationX - currentRotationX) * 0.05;
          currentRotationY += (targetRotationY - currentRotationY) * 0.05;

          points.rotation.y = elapsedTime * 0.12 + currentRotationY;
          points.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.2) * 0.08;

          // Subtle wave expansion
          const scale = 1 + Math.sin(elapsedTime * 0.8) * 0.03;
          points.scale.set(scale, scale, scale);

          renderer.render(scene, camera);
        };

        animate();

        // Cleanup listener references
        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('resize', onResize);
        };
      })
      .catch((err) => {
        console.warn('Three.js failed to load, falling back to CSS background:', err);
        setHasFallback(true);
      });

    return () => {
      isDisposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (points) {
        geometry?.dispose();
        material?.dispose();
      }
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Fallback for Mobile / Low-end / WebGL-unsupported / prefers-reduced-motion */}
      {hasFallback && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-accent-violet/20 via-accent-cyan/15 to-transparent blur-[100px] animate-pulse-glow" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-accent-violet/20 opacity-30 animate-spin" style={{ animationDuration: '40s' }} />
        </div>
      )}
    </div>
  );
};

export default HeroCanvas;

import React from 'react';

/**
 * NoiseOverlay adds a subtle cinematic analog film grain over the entire viewport.
 * Uses pointer-events-none and fixed positioning for zero performance overhead.
 */
export const NoiseOverlay = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 noise-bg mix-blend-overlay opacity-35 select-none"
    />
  );
};

export default NoiseOverlay;

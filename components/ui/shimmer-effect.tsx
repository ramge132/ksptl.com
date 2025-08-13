"use client"

import React from 'react';

interface ShimmerEffectProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  children,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.1)',
  shimmerSize = '100%',
  shimmerDuration = '5s',
}) => {
  const shimmerStyle: React.CSSProperties = {
    '--shimmer-color': shimmerColor,
    '--shimmer-size': shimmerSize,
    '--shimmer-duration': shimmerDuration,
  } as React.CSSProperties;

  return (
    <div className={`relative overflow-hidden ${className}`} style={shimmerStyle}>
      {children}
      <div className="shimmer-overlay absolute inset-0 pointer-events-none" />
    </div>
  );
};

export default ShimmerEffect;

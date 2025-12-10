import React from 'react';
import { cn } from '@/lib/utils';

export const GradientIcon = ({
  Icon,
  className,
  useGradient,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  className?: string;
  useGradient: boolean;
}) => {
  if (!useGradient) {
    return <Icon className={className} />;
  }

  // Aplica o gradiente no wrapper e usa o ícone SVG como máscara
  const iconRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (iconRef.current) {
      const svg = iconRef.current.querySelector('svg');
      if (svg) {
        const svgString = new XMLSerializer().serializeToString(svg);
        const encodedSvg = encodeURIComponent(svgString);
        iconRef.current.style.setProperty(
          '--icon-mask',
          `url("data:image/svg+xml,${encodedSvg}")`
        );
      }
    }
  }, []);

  return (
    <div
      ref={iconRef}
      className={cn(
        className,
        'inline-block bg-gradient-to-r from-[#6ADCC5] to-[#0055FF]'
      )}
      style={{
        WebkitMask: 'var(--icon-mask)',
        mask: 'var(--icon-mask)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    >
      <Icon className={cn(className, 'opacity-0')} />
    </div>
  );
};

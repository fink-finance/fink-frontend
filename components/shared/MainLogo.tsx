import Image from 'next/image';

type MainLogoProps = {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export const MainLogo = ({
  className = '',
  alt = '',
  width = 80,
  height = 36,
}: MainLogoProps) => {
  return (
    <Image
      src='/images/brand/logo_fink_home.png'
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={true}
    />
  );
};

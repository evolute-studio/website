export const PixelCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const positionClasses = {
    tl: 'top-[-1px] left-[-1px]',
    tr: 'top-[-1px] right-[-1px] -scale-x-100',
    bl: 'bottom-[-1px] left-[-1px] -scale-y-100',
    br: 'bottom-[-1px] right-[-1px] scale-[-1]',
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-7 h-7 pointer-events-none`}>
      <div className="absolute top-0 left-0 w-7 h-[3px] bg-yellow-600" />
      <div className="absolute top-0 left-0 w-[3px] h-7 bg-yellow-600" />
      <div className="absolute top-[1px] left-[1px] w-[26px] h-[1px] bg-yellow-400" />
      <div className="absolute top-[1px] left-[1px] w-[1px] h-[26px] bg-yellow-400" />
      <div className="absolute top-[2px] left-[2px] w-[4px] h-[4px] rotate-45 bg-yellow-500" />
      <div className="absolute top-[3px] left-[3px] w-[2px] h-[2px] rotate-45 bg-yellow-300" />
      <div className="absolute top-0 left-[24px] w-[3px] h-[3px] bg-yellow-500" />
      <div className="absolute top-[24px] left-0 w-[3px] h-[3px] bg-yellow-500" />
    </div>
  );
};

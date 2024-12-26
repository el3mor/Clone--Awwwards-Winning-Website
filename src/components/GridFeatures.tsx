import { ReactNode, useRef, useState } from 'react';

export const TiltCard = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const [transformValues, setTransformValues] = useState('');
  const itemRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeX - 0.5) * 13;
    const tiltY = (relativeY - 0.5) * 13;
    const newTransformValues = `perspective(700px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(.95, .95, .95)`;
    setTransformValues(newTransformValues);
  };
  return (
    <div
      onMouseLeave={() => setTransformValues('')}
      onMouseMove={handleMouseMove}
      ref={itemRef}
      className={`${className || ''} transition-transform duration-300 ease-out`}
      style={{ transform: transformValues }}
    >
      {children}
    </div>
  );
};

const GridFeatures = ({
  video,
  title,
  text,
  className,
}: {
  video: string;
  title: ReactNode;
  text: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
      className={
        '  relative h-full mb-7 w-full overflow-hidden rounded-md cursor-pointer  md:min-h-[55vh] border border-white/20 ' +
        className
      }
    >
      <div className='absolute size-full'>
        <video
          loop
          muted
          ref={videoRef}
          src={video}
          className=' absolute inset-0 size-full object-cover object-center'
        />
      </div>
      <div className='relative p-5'>
        <div className='special-font font-zentry text-white text-2xl md:text-6xl'>
          {title}
          <p className='text-base font-circular-web max-w-[18rem] text-gray-500 '>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GridFeatures;

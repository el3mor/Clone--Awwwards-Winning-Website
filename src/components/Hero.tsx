import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { TiLocation } from 'react-icons/ti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const backgroundVideo = useRef<HTMLVideoElement>(null);
  const totalVideos = 4;
  const [currentVideo, setCurrentVideo] = useState(0);
  const upcomingVideoIndex = (currentVideo + 1) % totalVideos;
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const timeOutMouse = useRef<NodeJS.Timeout | null>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const handleNextVideo = () => {
    setCurrentVideo(upcomingVideoIndex);
    const anmitedVideo = `#video-${upcomingVideoIndex}`;
    const videos = ['#video-0', '#video-1', '#video-2', '#video-3'].filter(
      (v) => v !== anmitedVideo,
    );
    const videoElement: HTMLVideoElement | null =
      document.querySelector(anmitedVideo);
    gsap.set(anmitedVideo, { zIndex: 30, width: '16px', height: '16px' });
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.play();
    }
    gsap.set(videos, { zIndex: 20 });
    gsap.to(anmitedVideo, { width: '100%', height: '100%' });
  };
  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setIsLoaded(false);
    }
  }, [loadedVideos]);
  useEffect(() => {
    const handleMouseEvent = (e: MouseEvent) => {
      setIsMouseMoving(true);
      if (!backgroundVideo.current) return;
      if (timeOutMouse.current) clearTimeout(timeOutMouse.current);
      if (isMouseMoving) {
        gsap.to(backgroundVideo.current, { autoAlpha: 1, duration: 0.2 });
      }
      timeOutMouse.current = setTimeout(() => {
        setIsMouseMoving(false);
        gsap.to(backgroundVideo.current, { autoAlpha: 0, duration: 0 });
      }, 2000);
      const { clientX, clientY } = e;
      const maxOffsetX = 400;
      const maxOffsetY = 600;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const constrainedX = Math.min(
        Math.max(clientX, centerX - maxOffsetX),
        centerX + maxOffsetX,
      );
      const constrainedY = Math.min(
        Math.max(clientY, centerY - maxOffsetY),
        centerY + maxOffsetY,
      );

      const polygonClipPath = `polygon(
        ${Math.max(constrainedX - 100, 0)}px ${Math.max(constrainedY - 100, 0)}px,
        ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.max(constrainedY - 100, 0)}px,
        ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.min(constrainedY + 100, window.innerHeight)}px,
        ${Math.max(constrainedX - 100, 0)}px ${Math.min(constrainedY + 100, window.innerHeight)}px
      )`;
      gsap.to(backgroundVideo.current, {
        clipPath: polygonClipPath,
        duration: 0.2,
        ease: 'power1.out',
      });
    };

    if (!heroRef.current) return;
    heroRef.current.addEventListener('mousemove', handleMouseEvent);
    return () => {
      document.removeEventListener('mousemove', handleMouseEvent);
    };
  }, [isMouseMoving]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('#video-frame', {
        clipPath: 'polygon(14% 0, 72% 0, 90% 97%, 0 96%)',
        borderRadius: '0 0 40% 10%',
      });
      gsap.from('#video-frame', {
        clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0 100%)',
        borderRadius: '0 0 0 0',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#video-frame',
          start: 'center 40%',
          end: 'bottom center',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={heroRef}
      className='bg-blue-50 relative  h-dvh   hero w-screen overflow-x-hidden'
    >
      {isLoaded && (
        <div className='flex-center  absolute z-[100] h-dvh w-screen overflow-hidden  bg-violet-50 '>
          <div className='three-body'>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
          </div>
        </div>
      )}

      <div id='video-frame' className='relative z-10 inset-0 w-full h-full'>
        <video
          onClick={handleNextVideo}
          ref={backgroundVideo}
          src={`/videos/hero-${upcomingVideoIndex}.mp4`}
          className='invisible object-cover z-40 absolute w-full h-full'
          autoPlay
          loop
          muted
        />
        <div className='video-container'>
          {Array.from({ length: totalVideos }).map((_, index) => (
            <video
              onLoadedData={() => setLoadedVideos((prev) => prev + 1)}
              key={index}
              id={`video-${index}`}
              src={`/videos/hero-${index}.mp4`}
              className='object-cover absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full'
              autoPlay
              loop
              muted
            />
          ))}
        </div>
        <h2 className='font-zentry absolute z-50 bottom-5 right-5 uppercase font-[900] special-font sm:text-7xl md:text-9xl lg:text-[12rem] text-blue-50'>
          G<b>a</b>ming
        </h2>
        <div className='flex flex-col items-start gap-5 z-50 mt-10 px-10 absolute top-10 left-[3rem]'>
          <h2 className='font-zentry uppercase font-[900] special-font sm:text-7xl md:text-9xl lg:text-[12rem] text-blue-50'>
            Redifi <b>n</b>
          </h2>
          <p className='sm:text-xs font-bold  md:text-md lg:text-xl text-blue-50'>
            ENTER THE METAGAME LAYER
            <br />
            unleash the paly econamy
          </p>
          <Button text='Watch Trailer' lefticon={<TiLocation />} />
        </div>
      </div>

      <h2 className='font-zentry absolute  bottom-5 right-5 uppercase font-[900] special-font sm:text-7xl md:text-9xl lg:text-[12rem] text-black'>
        G<b>a</b>ming
      </h2>
    </div>
  );
};

export default Hero;

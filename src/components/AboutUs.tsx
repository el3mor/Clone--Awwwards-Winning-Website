import { useEffect } from 'react';
import AnimatedTitle from './AnimatedTitle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from 'react-parallax-mouse';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.mask-clip-path', {
        clipPath: 'polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)',
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.mask-clip-path',
            start: '68% center',
            end: '+=800 center',
            pin: '#clip',
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
          
              const clipProgress = `
            polygon(
              ${gsap.utils.interpolate(14, 0, progress)}% 0,
              ${gsap.utils.interpolate(82, 100, progress)}% 0,
              ${gsap.utils.interpolate(80, 100, progress)}% 100%,
              ${gsap.utils.interpolate(6, 0, progress)}% 100%
            )
          `;
             
              gsap.set('.mask-clip-path', {
                clipPath: clipProgress,
                webkitClipPath: clipProgress,
              });
            },
          },
        })
        .to('.mask-clip-path', {
          width: '100vw',
          height: '100vh',
          marginTop: 0,
          marginLeft: 0,
          borderRadius: 0,
        });
    });

    return () => ctx.revert();
  }, []);
  return (
    <section className='min-h-dvh w-screen bg-blue-50 overflow-hidden relative'>
      <div className='flex flex-col gap-5 items-center mt-36'>
        <span className='text-sm lg:text-[12px] text-center font-general'>
          Welcome To Zentry
        </span>
        <AnimatedTitle
          text=" DISC<b>O</b>VER THE WORLD'S LARGEST SHARED <b>A</b>DVENTURE"
          className=' mt-5 w-full text-black text-center'
        />
      </div>
      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
        <MouseParallaxChild factorX={0.3} factorY={0.5}>
          <div id='clip' className='w-screen h-dvh relative'>
            <div className='mask-clip-path w-[30vw] mt-10 h-96 overflow-hidden absolute z-20 left-1/2 -translate-x-1/2 rounded-2xl border border-black'>
              <img
                src='/img/about.webp'
                alt='About Us'
                className='absolute inset-0 size-full object-cover'
              />
            </div>
            <div className='flex text-center flex-col gap-3 font-circular-web absolute z-10 left-1/2 -translate-x-1/2 bottom-52 text-lg md:max-w-[40rem] transform -translate-y-1/2'>
              <p className='uppercase text-black'>
                The Game of Games begins—your life, now an epic MMORPG
              </p>
              <p className='text-gray-500'>
                Zentry unites the every players from countless games and
                platforms, both digital and physical, into a unified Play
                Economy
              </p>
            </div>
          </div>
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </section>
  );
};

export default AboutUs;

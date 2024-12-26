import { TiLocationArrow } from 'react-icons/ti';
import GridFeatures from './GridFeatures';
import { TiltCard } from './GridFeatures';

const Features = () => {
  return (
    <section className='bg-black text-white pb-52'>
      <div className='px-36 py-28 font-robert-regular text-xl lg:text-[25px]'>
        <p className='font-robert-regular'>
          Dive into the 'Game of Games' Universe
        </p>
        <p className='text-gray-500 max-w-[34rem]'>
          Immerse yourself in a rich and ever-expanding ecosystem where a
          vibrant array of products converge into an interconnected universe.
        </p>
      </div>
      <div className='flex flex-col  gap-10 mt-10 px-20'>
        <GridFeatures
          video='/videos/feature-1.mp4'
          title={
            <h2>
              Radia<b>n</b>t
            </h2>
          }
          text='A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.'
        />
        <div className='grid grid-cols-2 grid-rows-2 gap-7'>
          <TiltCard className='col-span-full md:col-span-1 row-span-2'>
            <GridFeatures
              video='/videos/feature-2.mp4'
              title={
                <h2>
                  Zig<b>m</b>a
                </h2>
              }
              text='An anime and gaming-inspired NFT collection - the IP primed for expansion.'
            />
          </TiltCard>
          <TiltCard className='ms-32 md:ms-0 col-span-full md:col-span-1'>
            <GridFeatures
              video='/videos/feature-3.mp4'
              title={
                <h2>
                  N<b>e</b>xus
                </h2>
              }
              text='a gamified social hub . adding a new dimension of play interacting with your friends.'
            />
          </TiltCard>
          <TiltCard className='me-32 md:me-0 col-span-full md:col-span-1'>
            <GridFeatures
              video='/videos/feature-4.mp4'
              title={
                <h2>
                  Az<b>u</b>l
                </h2>
              }
              text='a gamified social hub . adding a new dimension of play interacting with your friends.'
            />
          </TiltCard>
        </div>
        <div className='grid grid-cols-2 grid-rows-1 gap-7'>
          <TiltCard className='relative bg-violet-300 col-span-1 row-span-1 p-5 rounded-lg'>
            <h2 className='special-font font-zentry text-black text-2xl md:text-7xl'>
              <span>
                M<b>o</b>re
              </span>
              <br></br>
              <span>
                Co<b>m</b>ing
              </span>
              <br></br>
              <span>
                S<b>o</b>on
              </span>
              <br></br>
            </h2>
            <div className='absolute bottom-10 right-10'>
              <TiLocationArrow className=' m-5 scale-[2] md:scale-[8]' />
            </div>
          </TiltCard>
          <TiltCard className='relative col-span-1  overflow-hidden rounded-lg'>
            <video
              className='w-full h-full'
              autoPlay
              loop
              muted
              src='/videos/feature-5.mp4'
            />
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Features;

import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle"
import Button from "./Button"
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";

const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -25;
    const rotateY = ((xPos - centerX) / centerX) * -25;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      perspective: 600,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({paused:true}).from(".parg-story p",{rotateX:90,opacity:0, translateX:100,translateY:100,y:100})
      .from(".parg-story button",{opacity:0,y:-100});
      ScrollTrigger.create({
        trigger:".parg-story",
        start: "top 80%",
        animation:tl,
        markers:true,
        toggleActions: "play none none reverse",
      })
    });
    return () => ctx.revert();
  }, [])
  return (
    <section onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} id="story" className='bg-black min-h-dvh w-screen relative overflow-hidden'>
      <div className="flex flex-col  justify-center ">
        <span className='text-base text-gray-500 lg:text-[12px] text-center font-general uppercase'>
            The Multiverse Ip World
          </span>
          <AnimatedTitle
            text=" THE ST<b>O</b>RY OF <br/> THE HIDDEN REALM"
            className='mix-blend-difference relative z-10 text-white '
          />
      </div>
      <div className="relative">
      <div className="h-[90vh] md:h-dvh story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain"
                  ref={frameRef}
                />
              </div>
            </div>
            
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
           
          </div>
          </div>
          <div className="parg-story absolute  right-16 bottom-52">
          <div className="flex h-full w-fit flex-col gap-5 text-xl items-center md:items-start">
            <p className="mt-3 max-w-md text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            <Button
            
              text="discover prologue"
             
            />
          </div>
          </div>
    </section>
  )
}

export default Story

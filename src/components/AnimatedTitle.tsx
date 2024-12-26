import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center bottom',
            toggleActions: 'play none none reverse',
          },
        })
        .to(containerRef.current?.querySelectorAll('.animated-word'), {
          opacity: 1,
          transform: 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg)',
          ease: 'power2.inOut',
          stagger: 0.1,
        });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={containerRef} >
      <h2 className={`animated-title ${className}`} >
        {text.split('<br/>').map((line, index) => (
          <div
            key={index}
            className='flex-center max-w-full flex-wrap gap-2  md:gap-3'
            
          >
            {line.split(' ').map((word, i) => (
              <span
                className='animated-word special-font'
                dangerouslySetInnerHTML={{ __html: word }}
                key={i}
              />
            ))}
          </div>
        ))}
      </h2>
    </div>
  );
};

export default AnimatedTitle;

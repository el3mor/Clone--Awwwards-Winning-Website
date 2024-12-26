import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect } from 'react'
import AnimatedTitle from './AnimatedTitle';
import Button from './Button';
import PaginationScroll from './PaginationScroll';

const Pin = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".pagination");
      const paragraphs = gsap.utils.toArray(".pagination p");
      const lineContainers = gsap.utils.toArray(".lineContainer");
      gsap.set(paragraphs, { opacity: 0.3, scaleY: 0, visibility: "hidden" });
      gsap.set(lineContainers, { opacity: 0, visibility: "hidden", height: 0 });
      let cumulativeOffset = 0;
      items.forEach((item: HTMLDivElement | null | any) => {
        if(!item) return
        const line = item.querySelector(".line");
        const paragraph = item.querySelector("p");
        const title = item.querySelector("h4");
        const lineContainer = item.querySelector(".lineContainer");
        const lineAnimation = gsap.timeline({ paused: true }).to(line, { y:100});
          const EnteryAnimation = gsap
          .timeline({ paused: true })
          .to(lineContainer, { height: "6rem", autoAlpha: 1, duration: 0.2 })
          .fromTo(title, { opacity: 0.3 }, { opacity: 1, duration: 0.3 })
          .to(paragraph, { scaleY: 1, autoAlpha: 1, duration: 0.3 });
        const start = `top+=${cumulativeOffset} center`;
        const animationDuration = 1000;
        const end = `+=${animationDuration}`;
        console.log(line)
        ScrollTrigger.create({
          trigger: item as HTMLElement,
          start: start,
          end: end,
          animation: lineAnimation,
          onEnter: () => EnteryAnimation.play(),
          onLeave: () => EnteryAnimation.reverse(),
          onEnterBack: () => EnteryAnimation.play(),
          onLeaveBack: () => EnteryAnimation.reverse(),
        })
        cumulativeOffset += animationDuration;
      })
      ScrollTrigger.create({
        trigger: '.ele',
        start: "top 70%",
      
        animation: gsap.to(".pin", { backgroundColor: "#edff66" }),
        toggleActions: "play none none reverse",
      })
      ScrollTrigger.create({
        trigger:".pin",
        start: "8% top",
        end: "+=4000 top",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
    });
  });
    return () => ctx.revert();
  }, [])
  return (
    <section className='pin min-h-[113dvh] w-screen bg-black overflow-hidden relative'>
      <div className='flex gap-10  py-2  px-5 flex-col items-start'>
        <AnimatedTitle 
         className="ele flex  lg:mt-24 mt-16 !items-start !px-0   !text-black"
         text="THE UNIVERS<b>E</b><br/>POWERED BY ZE<b>N</b>T" />
         <Button text="Enter Vault" backgroundColor='bg-black  uppercase text-white'/>
      </div>
      <div className="absolute bottom-10 right-10">
        <video src='/videos/v1.webm' autoPlay loop muted/>
      </div>
      <div className="flex  lg:mt-0 mt-40 flex-col pl-8 items-start ">
            <PaginationScroll
              num="01"
              title="Shaping Zentry Collectively"
              description="Participate in governance, influence key decisions in the ever-growing Zentry Universe that is limited only by people's imaginations"
            />
            <PaginationScroll
              title="Unlocking Economic Opportunity"
              num="02"
              description="ZENT, a commodity-based currency that unlocks exclusive benefits, airdrops, quotas, and co-creation within and beyond Zentry ecosystem."
            />
            <PaginationScroll
              title="Sharing Value Accrued"
              num="03"
              description="ZENT holders thrive as Zentry grows, benefiting from the expansive partnerships, treasury investment and economic activities."
            />
          </div>
    </section>
  )
}

export default Pin

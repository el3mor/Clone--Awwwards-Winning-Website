import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useWindowScroll } from "@reactuses/core";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";


const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

const NavBar = () => {
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navContainerRef =  useRef<HTMLDivElement >(null);

  useEffect(() => {
    if (!navContainerRef.current) return;
    if (currentScrollY === 0) {

      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {

      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {

      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <header ref={navContainerRef} className='hidden max-sm:fixed inset-x-0 top-4 z-[60] h-16 border-none transition-all duration-700 sm:inset-x-6'>
      <nav className='flex size-full items-center justify-between px-6 '>
        <div className="flex items-center gap-3">
          <img src='/img/logo.png' alt='logo' className='w-20' />
          <Button text="Products"
              righticon={<TiLocationArrow />}
              backgroundColor="bg-blue-50"/>
        </div>
        <div className="flex items-center justify-center gap-5">
          {navItems.map((item,index) => {
            return <a key={index} href={`#${item.toLowerCase()}`}
            className="nav-hover-btn">
              {item}
            </a>
          })}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

"use client"

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatGradientProps {
  prefix?: string;
  gradientText: string;
  suffix?: string;
  gradientColors?: string[];
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  gradientAnimationSpeed?: number;
}

const ScrollFloatGradient: React.FC<ScrollFloatGradientProps> = ({
  prefix = "",
  gradientText,
  suffix = "",
  gradientColors = ["#1B64DA", "#0064FF", "#33A1FF", "#0064FF", "#1B64DA"],
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
  gradientAnimationSpeed = 5
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const fullText = prefix + gradientText + suffix;
    const prefixLength = prefix.length;
    const gradientLength = gradientText.length;
    
    return fullText.split("").map((char, index) => {
      const isGradient = index >= prefixLength && index < prefixLength + gradientLength;
      
      if (isGradient) {
        const gradientStyle = {
          backgroundImage: `linear-gradient(to right, ${gradientColors.join(", ")})`,
          backgroundSize: '300% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: `gradient ${gradientAnimationSpeed}s linear infinite`,
        };
        
        return (
          <span 
            className="inline-block word gradient-char" 
            key={index}
            style={gradientStyle}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      }
      
      return (
        <span className="inline-block word" key={index}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  }, [prefix, gradientText, suffix, gradientColors, gradientAnimationSpeed]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Add gradient animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll(".word");

    gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%"
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        },
      }
    );

    return () => {
      style.remove();
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger
  ]);

  return (
    <h2
      ref={containerRef}
      className={`my-5 ${containerClassName}`}
    >
      <span
        className={`inline-block ${textClassName}`}
      >
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloatGradient;

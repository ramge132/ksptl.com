"use client";

import { useEffect, useRef } from "react";
import SpotlightCard from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Cog, Target, CheckCircle, Zap } from "lucide-react";
import GradientTextNew from "@/components/ui/gradient-text-new";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.title-word');
      
      gsap.set(words, {
        opacity: 0,
        y: 50,
        scale: 0.9
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cards animation - Chromatic split + soft-glitch (reveal + subtle RGB split + gentle hover)
    if (cardsRef.current) {
      const container = cardsRef.current;
      const cards = Array.from(container.querySelectorAll<HTMLElement>(".reason-card"));

      gsap.set(container, { perspective: 1000 });

      // initial: slightly down and invisible; prepare inner elements
      cards.forEach((card) => {
        gsap.set(card, {
          opacity: 0,
          y: 28,
          scale: 0.985,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        });

        const innerEls = card.querySelectorAll<HTMLElement>(".p-4, h3, p, .bg-blue-100");
        gsap.set(innerEls, { y: 10, opacity: 0, scale: 0.997 });

        // create lightweight chromatic layers (R/B) for soft-split effect
        if (!card.querySelector(".glitch-r")) {
          const r = document.createElement("div");
          const b = document.createElement("div");
          [r, b].forEach((el) => {
            el.className = "pointer-events-none absolute inset-0 glitch-layer";
            el.style.mixBlendMode = "screen";
            el.style.opacity = "0";
            el.style.zIndex = "2";
            el.style.borderRadius = "inherit";
            el.style.transform = "translateZ(0)";
          });
          // subtle color gradients
          r.style.background = "linear-gradient(90deg, rgba(255,80,80,0.06), rgba(255,80,80,0.02))";
          r.classList.add("glitch-r");
          b.style.background = "linear-gradient(90deg, rgba(80,150,255,0.06), rgba(80,150,255,0.02))";
          b.classList.add("glitch-b");

          // ensure card is positioned
          card.style.position = card.style.position || "relative";
          card.appendChild(r);
          card.appendChild(b);
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      // reveal with upward motion and slight softness — reveal all simultaneously for group presence
      tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0,
      });

      // inner elements soft pop (simultaneous) for cleaner group reveal
      cards.forEach((card) => {
        const innerEls = Array.from(card.querySelectorAll<HTMLElement>(".p-4, h3, p, .bg-blue-100"));
        tl.to(
          innerEls,
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", stagger: 0 },
          "-=0.5"
        );
      });

      // soft chromatic split pulse for a modern digital feel (animate all glitch layers together to avoid per-card sequencing)
      const allR = Array.from(container.querySelectorAll<HTMLElement>(".glitch-r"));
      const allB = Array.from(container.querySelectorAll<HTMLElement>(".glitch-b"));
      if (allR.length || allB.length) {
        tl.to(allR, { x: 6, opacity: 0.7, duration: 0.18, ease: "power2.out" }, "-=0.45");
        tl.to(allB, { x: -6, opacity: 0.7, duration: 0.18, ease: "power2.out" }, "-=0.45");
        tl.to([...allR, ...allB], { x: 0, opacity: 0, duration: 0.45, ease: "power2.inOut" }, "+=0.05");
      }

      // Micro-interaction removed to prevent any card movement that can cause text blurring.
      // We keep the reveal and chromatic pulse, but do not attach per-card mouse listeners or transforms.

      // Cleanup: remove glitch overlays and kill timeline on HMR/route changes
      ScrollTrigger.addEventListener("refreshInit", () => {
        cards.forEach((card) => {
          const r = card.querySelector(".glitch-r");
          const b = card.querySelector(".glitch-b");
          if (r) r.remove();
          if (b) b.remove();
          gsap.set(card, { clearProps: "all" });
        });
        tl.kill();
      });
    }

  }, []);
  const reasons = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "국내 유일 원스톱 서비스",
      description: "시험기 제작부터 교정·시험까지 모든 과정을 한 곳에서 해결할 수 있는 국내 유일의 업체입니다.",
      highlight: "One-Stop Solution"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "KOLAS 공인기관",
      description: "KOLAS 공인교정기관(KC23-420) 및 공인시험기관으로서 국가가 인정한 신뢰할 수 있는 기관입니다.",
      highlight: "Government Certified"
    },
    {
      icon: <Cog className="w-8 h-8 text-blue-600" />,
      title: "축적된 기술력",
      description: "시험기 제작 전문 기업으로서 수십 년간 축적한 기술력과 경험을 바탕으로 정확한 시험·교정을 제공합니다.",
      highlight: "Proven Expertise"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "정밀한 교정·시험",
      description: "국내외 규격에 부합하는 정밀 교정과 종합 시험으로 최고의 정확도를 보장합니다.",
      highlight: "Precision Guaranteed"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "다양한 국제 인증",
      description: "KS, ISO 9001:2015, CE 등 다양한 국제 인증을 보유하여 글로벌 표준에 부합하는 서비스를 제공합니다.",
      highlight: "International Standards"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "효율성 극대화",
      description: "독립된 교정·시험으로 축적된 데이터와 노하우를 활용해 시험 장비의 효율성을 극대화합니다.",
      highlight: "Maximized Efficiency"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-600 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-blue-600 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-blue-600 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div ref={titleRef} className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold font-title leading-tight">
              <div className="title-word block mb-2 text-gray-900">왜</div>
              <div className="title-word block mb-2">
                <span className="inline-flex items-baseline whitespace-nowrap break-keep gap-0 align-middle" style={{ wordBreak: "keep-all" }}>
                  <GradientTextNew
                    colors={["#1B64DA", "#0064FF", "#33A1FF", "#0064FF", "#1B64DA"]}
                    animationSpeed={5}
                    showBorder={false}
                    className="inline-block align-baseline"
                  >
                    한국안전용품시험연구원
                  </GradientTextNew><span className="inline-block align-baseline text-gray-900">을</span>
                </span>
              </div>
              <div className="title-word block text-gray-900">선택해야 할까요?</div>
            </h2>
          </div>
          
        </div>

        {/* Reasons Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
              <SpotlightCard
                key={index}
                className="reason-card group transition-shadow duration-300"
                spotlightColor="rgba(120, 170, 255, 0.12)"
              >
                <div className="card-inner relative overflow-hidden">
                  <span
                    className="sheen absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(27,100,218,0.06) 0%, rgba(51,161,255,0.12) 28%, rgba(255,255,255,0.18) 50%, rgba(51,161,255,0.08) 72%, rgba(27,100,218,0.04) 100%)",
                      transform: "translateX(-140%) rotate(-6deg)",
                      opacity: 0,
                    }}
                  />
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                      {reason.icon}
                    </div>
                    
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {reason.highlight}
                    </Badge>
                    
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
          ))}
        </div>


        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-16">
            국내 유일의 시험기 제작 전문기업이자 KOLAS 공인 시험·교정 기관으로서
            <br />
            <span className="text-blue-600 font-semibold">고객 성공을 위한 최고의 서비스</span>를 제공합니다
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

"use client";

import { useEffect, useRef } from "react";
import SpotlightCard from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Cog, Target, CheckCircle, Zap } from "lucide-react";
import GradientTextNew from "@/components/ui/gradient-text-new";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WhyChooseUsProps {
  whyTitle1?: string
  whyTitle2?: string
  whyTitle3?: string
  whyTitle4?: string
  whyBottomText1?: string
  whyBottomText2?: string
  whyCard1Highlight?: string
  whyCard1Title?: string
  whyCard1Description?: string
  whyCard2Highlight?: string
  whyCard2Title?: string
  whyCard2Description?: string
  whyCard3Highlight?: string
  whyCard3Title?: string
  whyCard3Description?: string
  whyCard4Highlight?: string
  whyCard4Title?: string
  whyCard4Description?: string
  whyCard5Highlight?: string
  whyCard5Title?: string
  whyCard5Description?: string
  whyCard6Highlight?: string
  whyCard6Title?: string
  whyCard6Description?: string
}

const WhyChooseUs = ({
  whyTitle1 = "왜",
  whyTitle2 = "한국안전용품시험연구원",
  whyTitle3 = "을",
  whyTitle4 = "선택해야 할까요?",
  whyBottomText1 = "국내 유일의 시험기 제작 전문기업이자 KOLAS 공인 시험·교정 기관으로서",
  whyBottomText2 = "고객 성공을 위한 최고의 서비스를 제공합니다",
  whyCard1Highlight = "One-Stop Solution",
  whyCard1Title = "국내 유일 원스톱 서비스",
  whyCard1Description = "시험기 제작부터 교정·시험까지 모든 과정을 한 곳에서 해결할 수 있는 국내 유일의 업체입니다.",
  whyCard2Highlight = "Government Certified",
  whyCard2Title = "KOLAS 공인기관",
  whyCard2Description = "KOLAS 공인교정기관(KC23-420) 및 공인시험기관으로서 국가가 인정한 신뢰할 수 있는 기관입니다.",
  whyCard3Highlight = "Proven Expertise",
  whyCard3Title = "축적된 기술력",
  whyCard3Description = "시험기 제작 전문 기업으로서 수십 년간 축적한 기술력과 경험을 바탕으로 정확한 시험·교정을 제공합니다.",
  whyCard4Highlight = "Precision Guaranteed",
  whyCard4Title = "정밀한 교정·시험",
  whyCard4Description = "국내외 규격에 부합하는 정밀 교정과 종합 시험으로 최고의 정확도를 보장합니다.",
  whyCard5Highlight = "International Standards",
  whyCard5Title = "다양한 국제 인증",
  whyCard5Description = "KS, ISO 9001:2015, CE 등 다양한 국제 인증을 보유하여 글로벌 표준에 부합하는 서비스를 제공합니다.",
  whyCard6Highlight = "Maximized Efficiency",
  whyCard6Title = "효율성 극대화",
  whyCard6Description = "독립된 교정·시험으로 축적된 데이터와 노하우를 활용해 시험 장비의 효율성을 극대화합니다.",
}: WhyChooseUsProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 애니메이션 라이브러리가 로드되지 않았을 경우를 대비한 fallback
    const fallbackTimeout = setTimeout(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>(".reason-card");
        cards.forEach((card) => {
          card.style.opacity = "1";
          card.style.transform = "none";
        });
      }
    }, 1000);

    // Title animation
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.title-word');
      
      // 초기 상태를 설정하되, 애니메이션이 실패할 경우를 대비
      words.forEach((word) => {
        (word as HTMLElement).style.opacity = "0";
      });

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
          toggleActions: "play none none reverse",
          onEnter: () => {
            // 애니메이션이 실행되면 fallback 타이머 취소
            clearTimeout(fallbackTimeout);
          }
        }
      });
    }

    // Cards animation - 더 간단하고 안정적인 접근
    if (cardsRef.current) {
      const container = cardsRef.current;
      const cards = Array.from(container.querySelectorAll<HTMLElement>(".reason-card"));

      // 초기 상태 설정을 CSS 클래스로 처리
      cards.forEach((card) => {
        card.classList.add("gsap-card-initial");
      });

      // ScrollTrigger를 사용한 애니메이션
      ScrollTrigger.create({
        trigger: container,
        start: "top 88%",
        once: true, // 한 번만 실행
        onEnter: () => {
          // 애니메이션 실행
          cards.forEach((card, index) => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
              onStart: () => {
                card.classList.remove("gsap-card-initial");
              }
            });
          });
          clearTimeout(fallbackTimeout);
        }
      });

      // 페이지가 이미 스크롤된 상태에서 로드되는 경우를 처리
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    return () => {
      clearTimeout(fallbackTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // 아이콘 매핑
  const icons = [
    <Shield className="w-8 h-8 text-blue-600" />,
    <Award className="w-8 h-8 text-blue-600" />,
    <Cog className="w-8 h-8 text-blue-600" />,
    <Target className="w-8 h-8 text-blue-600" />,
    <CheckCircle className="w-8 h-8 text-blue-600" />,
    <Zap className="w-8 h-8 text-blue-600" />
  ];
  
  const reasons = [
    {
      icon: icons[0],
      title: whyCard1Title,
      description: whyCard1Description,
      highlight: whyCard1Highlight
    },
    {
      icon: icons[1],
      title: whyCard2Title,
      description: whyCard2Description,
      highlight: whyCard2Highlight
    },
    {
      icon: icons[2],
      title: whyCard3Title,
      description: whyCard3Description,
      highlight: whyCard3Highlight
    },
    {
      icon: icons[3],
      title: whyCard4Title,
      description: whyCard4Description,
      highlight: whyCard4Highlight
    },
    {
      icon: icons[4],
      title: whyCard5Title,
      description: whyCard5Description,
      highlight: whyCard5Highlight
    },
    {
      icon: icons[5],
      title: whyCard6Title,
      description: whyCard6Description,
      highlight: whyCard6Highlight
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
            <div className="title-word block mb-2 text-gray-900">{whyTitle1}</div>
            <div className="title-word block mb-2">
              <span className="inline-flex items-baseline whitespace-nowrap break-keep gap-0 align-middle" style={{ wordBreak: "keep-all" }}>
                <GradientTextNew
                  colors={["#1B64DA", "#0064FF", "#33A1FF", "#0064FF", "#1B64DA"]}
                  animationSpeed={5}
                  showBorder={false}
                  className="inline-block align-baseline"
                >
                  {whyTitle2}
                </GradientTextNew><span className="inline-block align-baseline text-gray-900">{whyTitle3}</span>
              </span>
            </div>
            <div className="title-word block text-gray-900">{whyTitle4}</div>
          </h2>
        </div>
          
        </div>

        {/* Reasons Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
              <SpotlightCard
                key={index}
                className="reason-card group transition-all duration-300"
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
            {whyBottomText1}
            <br />
            <span className="text-blue-600 font-semibold">{whyBottomText2}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

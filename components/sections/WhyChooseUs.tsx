"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollFloat from "@/components/ui/scroll-float";
import { Shield, Award, Cog, Target, CheckCircle, Zap } from "lucide-react";

const WhyChooseUs = () => {
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
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.05}
            containerClassName="mb-6"
            textClassName="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
          >
            왜 큐로를 선택해야 할까요?
          </ScrollFloat>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            국내 유일의 시험기 제작 전문기업이자 KOLAS 공인 시험·교정 기관으로서
            <br />
            <span className="text-blue-600 font-semibold">고객 성공을 위한 최고의 서비스</span>를 제공합니다
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105"
            >
              <CardContent className="p-8">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">20+</div>
              <div className="text-sm text-gray-600">년간 축적된 기술력</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">KOLAS 공인 인증</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">24시간</div>
              <div className="text-sm text-gray-600">신속한 대응 서비스</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">1등</div>
              <div className="text-sm text-gray-600">국내 유일 원스톱</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            국내 최고의 기술력과 신뢰성을 바탕으로 고객 성공을 위해 최선을 다하겠습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              시험·교정 신청하기
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              문의하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

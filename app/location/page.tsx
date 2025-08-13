"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Car, Train, Navigation } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NaverMapWithGeocoding from "@/components/ui/naver-map-with-geocoding"

const locations = [
  {
    id: "headquarters",
    name: "본사",
    address: "경기 양주시 은현면 화합로 941번길 83",
    phone: "031-862-8556~7",
    email: "yukwho@hanmail.net",
    hours: "평일 09:00 - 18:00",
    mapUrl: "https://map.naver.com/v5/search/경기%20양주시%20은현면%20화합로%20941번길%2083"
  },
  {
    id: "lab",
    name: "시험소",
    address: "경기 양주시 은현면 화합로 701-11",
    phone: "031-858-3012",
    email: "yukwho@hanmail.net",
    hours: "평일 09:00 - 18:00",
    mapUrl: "https://map.naver.com/v5/search/경기%20양주시%20은현면%20화합로%20701-11"
  }
]

export default function LocationPage() {
  const [activeLocation, setActiveLocation] = useState("headquarters")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary-light mb-4">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-gradient">오시는 길</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              한국안전용품시험연구원 본사 및 시험소 위치 안내
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeLocation} onValueChange={setActiveLocation} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="headquarters">본사</TabsTrigger>
              <TabsTrigger value="lab">시험소</TabsTrigger>
            </TabsList>

            {locations.map((location) => (
              <TabsContent key={location.id} value={location.id} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map */}
                  <div className="lg:col-span-2">
                    <Card className="overflow-hidden h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="w-full h-full">
                        <NaverMapWithGeocoding
                          address={location.address}
                          placeName={location.name}
                          mapUrl={location.mapUrl}
                          zoom={16}
                        />
                      </div>
                    </Card>
                  </div>

                  {/* Info Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="p-6 h-[400px] flex flex-col">
                      <h3 className="text-2xl font-bold mb-4">{location.name}</h3>
                      
                      <div className="space-y-3 flex-1 overflow-y-auto">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium mb-1">주소</p>
                            <p className="text-sm text-muted-foreground break-words">{location.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium mb-1">전화</p>
                            <p className="text-sm text-muted-foreground">{location.phone}</p>
                          </div>
                        </div>


                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium mb-1">업무시간</p>
                            <p className="text-sm text-muted-foreground">{location.hours}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              토요일, 일요일, 공휴일 휴무
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t mt-auto">
                        <Button 
                          className="w-full"
                          variant="outline"
                          onClick={() => navigator.clipboard.writeText(location.address)}
                        >
                          주소 복사
                        </Button>
                        <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="block">
                          <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                            <Navigation className="h-4 w-4 mr-2" />
                            네이버 지도에서 보기
                          </Button>
                        </a>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Transportation Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <Card className="p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 자가용 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-lg">자가용 이용시</h4>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• 서울 → 의정부 → 양주 → 은현면</p>
                    <p>• 구리포천고속도로 → 신평IC → 은현면</p>
                    <p>• 주차공간이 충분히 마련되어 있습니다</p>
                  </div>
                </div>

                {/* 대중교통 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Train className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-lg">대중교통 이용시</h4>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• 지하철 1호선 양주역 하차</p>
                    <p>• 버스 35번, 35-1번, 35-5번 승차</p>
                    <p>• 은현면사무소 정류장 하차 (도보 10분)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-primary-light rounded-lg">
                <p className="text-sm text-center">
                  <span className="font-semibold">방문 전 예약</span>을 하시면 더욱 빠른 서비스를 받으실 수 있습니다.
                </p>
                <div className="flex justify-center mt-3">
                  <Button 
                    className="bg-gradient-primary text-white hover:opacity-90"
                    onClick={() => window.location.href = '/support/inquiry'}
                  >
                    문의하기
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

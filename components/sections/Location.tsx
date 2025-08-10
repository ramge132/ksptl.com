"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Navigation } from "lucide-react"
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
    hours: "평일 09:00 - 18:00",
    mapUrl: "https://map.naver.com/v5/search/경기%20양주시%20은현면%20화합로%20941번길%2083"
  },
  {
    id: "lab",
    name: "시험소",
    address: "경기 양주시 은현면 화합로 701-11",
    phone: "031-858-3012",
    hours: "평일 09:00 - 18:00",
    mapUrl: "https://map.naver.com/v5/search/경기%20양주시%20은현면%20화합로%20701-11"
  }
]

export default function Location() {
  const [activeLocation, setActiveLocation] = useState("headquarters")

  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            오시는 <span className="text-gradient">길</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            본사와 시험소에서 여러분을 기다립니다
          </p>
        </motion.div>

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
                    <h3 className="text-2xl font-bold mb-6">{location.name}</h3>
                    
                    <div className="space-y-4 flex-1">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">주소</p>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">전화</p>
                          <p className="text-sm text-muted-foreground">{location.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">업무시간</p>
                          <p className="text-sm text-muted-foreground">{location.hours}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            토요일, 일요일, 공휴일 휴무
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(location.address)}
                      >
                        주소 복사
                      </Button>
                      <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
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
      </div>
    </section>
  )
}

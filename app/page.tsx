import Hero from "@/components/sections/Hero"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import Services from "@/components/sections/Services"
import CertificatesAndPatents from "@/components/sections/CertificatesAndPatents"
import Timeline from "@/components/sections/Timeline"
import Location from "@/components/sections/Location"
import Contact from "@/components/sections/Contact"

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Services />
      <CertificatesAndPatents />
      <Timeline />
      <Location />
      <Contact />
    </>
  )
}

"use client"

import { useCallback } from "react"
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Container, Engine } from "@tsparticles/engine"

export default function ModernParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container)
  }, [])

  return (
    <Particles
      className="absolute inset-0 -z-10"
      id="modern-particles"
      particlesLoaded={particlesLoaded}
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: ["#0064FF", "#33A1FF", "#1B64DA", "#0080FF", "#60A5FA"],
            animation: {
              enable: true,
              speed: 20,
              sync: false,
            },
          },
          links: {
            color: "#0064FF",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1.5,
            triangles: {
              enable: true,
              opacity: 0.1,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 2,
            straight: false,
            attract: {
              enable: true,
              rotate: {
                x: 600,
                y: 1200,
              },
            },
          },
          number: {
            density: {
              enable: true,
            },
            value: 120,
          },
          opacity: {
            value: { min: 0.2, max: 0.6 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          shape: {
            type: ["circle", "triangle"],
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 3,
              sync: false,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.8,
                color: "#33A1FF",
              },
            },
            push: {
              quantity: 6,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            bubble: {
              distance: 250,
              size: 6,
              duration: 2,
              opacity: 0.8,
            },
          },
        },
        detectRetina: true,
      }}
    />
  )
}

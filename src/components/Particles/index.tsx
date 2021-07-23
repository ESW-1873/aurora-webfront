import { VFC } from 'react'
import Particles from 'react-tsparticles'

type Props = {
  particles_number: number
  line_linked_distance: number
}
export const BaseParticles: VFC<Props> = ({
  particles_number,
  line_linked_distance,
}) => (
  <Particles
    options={{
      resize: true,
      retina_detect: true,
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: {
            enable: true,
            mode: 'trail',
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          trail: {
            delay: 0.005,
            pauseOnStop: true,
            quantity: 5,
            particles: {
              color: {
                value: '#FFFFFF',
                animation: {
                  enable: true,
                  speed: 400,
                  sync: true,
                },
              },
              collisions: {
                enable: false,
              },
              links: {
                enable: false,
              },
              move: {
                outModes: {
                  default: 'destroy',
                },
                speed: 2,
              },
              size: {
                value: 5,
                animation: {
                  enable: true,
                  speed: 5,
                  minimumValue: 1,
                  sync: true,
                  startValue: 'min',
                  destroy: 'max',
                },
              },
            },
          },
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 0.8,
          },
          repulse: {
            distance: 200,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      particles: {
        number: {
          value: particles_number,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#ffffff',
          animation: {
            enable: true,
            speed: 10,
            sync: true,
          },
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.4,
          random: true,
          anim: {
            enable: true,
            speed: 3,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: true,
            speed: 10,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: line_linked_distance,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
          triangles: {
            enable: true,
            color: '#ffffff',
            opacity: 0.03,
          },
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
    }}
    style={{
      position: 'absolute',
      inset: 0,
    }}
  />
)

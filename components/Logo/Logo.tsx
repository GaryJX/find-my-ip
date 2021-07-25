import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const RADIUS = 250
const STROKE = 30
const NORMALIZED_RADIUS = RADIUS - STROKE / 2
const CIRCUMFERENCE = RADIUS * 2 * Math.PI

type LogoProps = {
  animate?: boolean
}

// TODO: Delete this if I am not planning on adding the loading screen
const Logo: React.FC<LogoProps> = ({ animate = false }) => {
  const controls = useAnimation()
  const initialState = animate ? 'hidden' : 'visible'

  useEffect(() => {
    if (animate) {
      controls.start('visible')
    }
  }, [animate])

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="40px"
      height="40px"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.circle
        fill="transparent"
        stroke="white"
        strokeWidth={STROKE}
        strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        r={NORMALIZED_RADIUS}
        cx={RADIUS}
        cy={RADIUS}
        style={{ rotate: '-90deg', transformOrigin: 'center' }}
        animate={controls}
        initial={initialState}
        transition={{ duration: 2, ease: [0.7, 0, 0, 0.8] }}
        variants={{
          hidden: { strokeDashoffset: CIRCUMFERENCE },
          visible: { strokeDashoffset: 0 },
        }}
      />
      <g transform="translate(0,500) scale(0.1,-0.1)" fill="white">
        <motion.path
          d="M2415 3464 c-158 -15 -367 -98 -477 -191 -214 -180 -338 -480 -338
            -818 0 -349 125 -634 354 -806 121 -92 204 -128 351 -155 264 -47 510 15 706
            177 32 27 60 45 62 41 3 -4 13 -41 22 -82 28 -117 20 -111 138 -108 l102 3 3
            518 2 517 -420 0 -420 0 0 -140 0 -140 278 -2 277 -3 -4 -55 c-11 -168 -106
            -314 -258 -392 -90 -47 -157 -62 -278 -62 -302 -1 -505 167 -582 482 -23 94
            -23 341 1 437 70 288 250 466 499 494 276 31 483 -91 558 -329 l17 -55 148 -3
            c81 -1 152 2 157 7 13 13 -36 188 -74 263 -126 250 -356 387 -674 401 -60 2
            -128 3 -150 1z"
          animate={controls}
          initial={initialState}
          transition={{ duration: 0.75, ease: 'easeInOut', delay: 1.25 }}
          variants={{
            hidden: { translateY: '-20rem', opacity: 0 },
            visible: { translateY: 0, opacity: 1 },
          }}
        />
      </g>
    </svg>
  )
}

export default Logo

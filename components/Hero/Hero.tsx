import React, { useState } from 'react'
import styles from './Hero.module.scss'

const Hero: React.FC = () => {
  return (
    <div className={styles.hero}>
      {/* // TODO: Move this to a Watermark component */}
      <div className={styles.watermarkContainer}>
        <div className={styles.watermark1} />
        <div className={styles.watermark2} />
        <div className={styles.watermark3} />
      </div>
      <h3 className={styles.titleSubHeader}>Hi, my name is</h3>
      <h2 className={styles.title}>Gary Xie.</h2>
      <h1 className={styles.subtitle}>I develop things for the web.</h1>
      <p className={styles.copyText}>
        {/* // TODO: Write copy text */}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem enim
        fuga facere, earum distinctio iusto excepturi doloremque sit impedit
        amet? At illo, eaque voluptatum eligendi saepe quaerat vel dicta.
        Impedit.
      </p>
      <button className={styles.callToAction}>View Projects</button>
    </div>
  )
}

export default Hero

import React, { useState } from 'react'

import HamburgerMenu from '@/components/HamburgerMenu/HamburgerMenu'
import LogoTitle from '@/components/LogoTitle/LogoTitle'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import styles from './NavBar.module.scss'

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <a className={styles.skipToContent} href="#main">
        Skip to content
      </a>
      <div className={styles.navContainer}>
        <LogoTitle />

        <nav
          className={`${styles.navMenu} ${
            menuOpen ? styles.open : styles.closed
          }`}
        >
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            {/* // TODO: Not sure if I should put Resume here? */}
            {/* <li>
              <a href="#">Resume</a>
            </li> */}
          </ul>
        </nav>

        <div className={styles.navBtns}>
          {/* <ThemeToggle /> */}
          <HamburgerMenu
            open={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </div>
      </div>
    </header>
  )
}

export default NavBar

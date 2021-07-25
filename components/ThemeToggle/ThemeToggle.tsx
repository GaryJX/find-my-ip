import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import styles from './ThemeToggle.module.scss'

const LOCAL_STORAGE_THEME_KEY = 'theme'

// TODO: Move the theme logic into a ThemeProvider Context
const ThemeToggle: React.FC = (props) => {
  // TODO: Consider defaulting to dark mode, and prevent toggling to light mode (since I pref dark mode significantly more)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      // Update theme based on local storage if present, else use user preferences
      const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)

      if (localTheme) {
        if (localTheme === 'light' || localTheme === 'dark') {
          setTheme(localTheme)
        } else {
          localStorage.removeItem(LOCAL_STORAGE_THEME_KEY)
        }
      } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }
  }, [])

  useEffect(() => {
    if (theme === 'light') {
      document.querySelector('body')?.classList.remove('dark-theme')
    } else {
      document.querySelector('body')?.classList.add('dark-theme')
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return (
    <button
      className={`${styles.themeToggleBtn} ${
        theme === 'light' ? styles.light : styles.dark
      }`}
      aria-label="Toggle dark theme"
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="472.39"
        height="472.39"
        viewBox="0 0 472.39 472.39"
      >
        <g className={styles.toggleSun}>
          <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
        </g>
        <g className={styles.toggleCircle}>
          <circle cx="236.2" cy="236.2" r="103.78" />
        </g>
      </svg>
    </button>
  )
}

export default ThemeToggle

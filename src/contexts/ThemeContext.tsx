import { createContext, useEffect, useState } from 'react';
import { THEMES } from '../utils/constants'

export const DEFAULT_THEME = 'default';
export const DARK_THEME = 'dark';

export const ThemeContext = createContext({
  globalTheme: '',
  setGlobalTheme: (chosenTheme: string) => {},
  isActive: false
})

export const ThemeContextParent = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [isActive, setIsActive] = useState(false);

  function setGlobalTheme(chosenTheme: string) {
    setTheme(chosenTheme)
    setIsActive(!isActive)
  }

  return (
    <ThemeContext.Provider value={{
      globalTheme: theme,
      setGlobalTheme,
      isActive
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

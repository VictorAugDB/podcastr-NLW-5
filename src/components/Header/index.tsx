import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { useContext } from 'react'
import { DARK_THEME, DEFAULT_THEME, ThemeContext } from '../../contexts/ThemeContext'

import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR })
  const { globalTheme, setGlobalTheme, isActive } = useContext(ThemeContext)

  return (
    <header className={`${styles.headerContainer} ${styles[globalTheme]}`}>
      <img src="/logo.svg" alt="Podcastr"/>

      <p>O melhor para você ouvir sempre</p>

      <button type="button" className={isActive ? styles.isActive : styles.isNotActive} onClick={() => (globalTheme === 'default' ? setGlobalTheme(DARK_THEME) : setGlobalTheme(DEFAULT_THEME))}></button>

      <span>{currentDate}</span>
    </header>
  )
}
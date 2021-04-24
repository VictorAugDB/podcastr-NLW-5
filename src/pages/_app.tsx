import '../styles/global.scss'

import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerMobile } from '../components/PlayerMobile'

import styles from '../styles/app.module.scss'
import { PlayerContextProvider } from '../contexts/PlayerContext'
import React, { useContext } from 'react'
import { ThemeContext, ThemeContextParent } from '../contexts/ThemeContext'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <ThemeContextParent>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
          <PlayerMobile />
        </div>
      </ThemeContextParent>
    </PlayerContextProvider>
  )
}

export default MyApp

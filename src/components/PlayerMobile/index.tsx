import Image from 'next/image'
import { useContext, useEffect } from 'react'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'

import { usePlayer } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import { ThemeContext } from '../../contexts/ThemeContext'

export function PlayerMobile() {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
    clearPlayerState,
    widthSize,
    audioRef,
    progress,
    setupProgressListener,
    handleEpisodeEnded,
    handleSeek
  } = usePlayer();
  const { globalTheme } = useContext(ThemeContext)

  const episode = episodeList[currentEpisodeIndex]

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  return (
    <>
      {widthSize <= 720 && (
        <div className={`${styles.playerMobileContainer} ${styles[globalTheme]}` }>
          { episode ? (
            <>
              <div className={styles.animatedContainer}>
                <span>
                  <strong>{episode.title}</strong>
                  <p>{episode.members}</p>
                </span>
              </div>
              <div className={styles.currentEpisode}>
                <Image
                  width={98}
                  height={98}
                  src={episode.thumbnail}
                  objectFit="cover"
                ></Image>
              </div>
            </>
          ) : (
            <div className={styles.emptyPlayer}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>
          )}

          <footer className={!episode ? styles.empty : ''}>
            <div className={styles.progress}>
              <span>{convertDurationToTimeString(progress)}</span>
              <div className={styles.slider}>
                {episode ? (
                  <Slider
                    max={episode.duration}
                    value={progress}
                    onChange={handleSeek}
                    trackStyle={{ backgroundColor: '#04d361' }}
                    railStyle={{ backgroundColor: '#9f75ff' }}
                    handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                  />
                ) : (
                  <div className={styles.emptySlider} />
                )}
              </div>
              <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>

            {episode &&
              <audio
                src={episode.url}
                ref={audioRef}
                autoPlay
                onEnded={handleEpisodeEnded}
                loop={isLooping}
                onPlay={() => { setPlayingState(true) }}
                onPause={() => { setPlayingState(false) }}
                onLoadedMetadata={setupProgressListener
                }
              />
            }

            <div className={styles.buttons}>
              <button
                type="button"
                disabled={!episode || episodeList.length === 1}
                onClick={toggleShuffle}
                className={isShuffling ? styles.isActive : ''}
              >

                <img src="/shuffle.svg" alt="Embaralhar" />
              </button>
              <button
                type="button"
                onClick={playPrevious}
                disabled={!episode || !hasPrevious}
              >
                <img src="/play-previous.svg" alt="Tocar anterior" />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                disabled={!episode}
                className={styles.playButton}
              >
                {isPlaying ?
                  <img src="/pause.svg" alt="Pausar" />
                  :
                  <img src="/play.svg" alt="Tocar" />
                }

              </button>
              <button
                type="button"
                onClick={playNext}
                disabled={!episode || !hasNext}
              >
                <img src="/play-next.svg" alt="Tocar próxima" />
              </button>
              <button
                type="button"
                disabled={!episode}
                onClick={toggleLoop}
                className={isLooping ? styles.isActive : ''}
              >
                <img src="/repeat.svg" alt="Repetir" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import themeData from '../../data/themeData'
import SampleTheme from '../SampleTheme'
import styles from './themes.module.scss'

function Themes() {
   const { mode, modeChanged } = useSelector(state => state.parameterReducer)
   const [changing, setChanging] = useState(false)
   const [slide, setSlide] = useState(1)
   const themeRef = useRef()
   const slideRef = useRef()
   const pistonRef = useRef()

   useEffect(() => {
      const handleResize = () => {
         const width = themeRef.current.offsetWidth
         const heigth = width >= 192 ? (width * 2) / 3 - 3 : width
         themeRef.current.style.height = Math.ceil(heigth) + 'px'
      }

      handleResize()

      window.addEventListener('resize', handleResize)

      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   const handleChangeModeTo0 = () => {
      // hide themes
      themeRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         themeRef.current.classList.remove(styles.mode0)
         themeRef.current.style.opacity = 0
      }, 1490) // 500ms delay: models + maxTokens = 500 + 500 = 1000ms

      slideRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         slideRef.current.classList.remove(styles.mode0)
         slideRef.current.style.opacity = 0
      }, 1390) // 500ms delay: models + maxTokens = 500 + 500 = 1000ms

      // All none
      setTimeout(() => {
         themeRef.current.style.display = 'none'
         slideRef.current.style.display = 'none'
      }, 1490) // 0ms delay: models + maxTokens + themes = 500 + 500 + 500 = 1500ms
   }

   const handleChangeModeTo1 = () => {
      // All display
      setTimeout(() => {
         themeRef.current.style.display = 'block'
         slideRef.current.style.display = 'flex'
      }, 0) // 0ms delay: 0

      // show themes
      themeRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         themeRef.current.classList.remove(styles.mode1)
         themeRef.current.style.opacity = 1
      }, 1990) // 500ms delay: amount + models + maxTokens = 500 + 500 + 500 = 1500ms

      slideRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         slideRef.current.classList.remove(styles.mode1)
         slideRef.current.style.opacity = 1
      }, 1890) // 500ms delay: amount + models + maxTokens = 500 + 500 + 500 = 1500ms
   }

   useEffect(() => {
      modeChanged && mode === 0 && handleChangeModeTo0()
      modeChanged && mode === 1 && handleChangeModeTo1()
   }, [mode, modeChanged])

   useEffect(() => {
      if (!modeChanged && mode === 1) {
         themeRef.current.style.opacity = 1
         slideRef.current.style.opacity = 1

         // themeRef.current.style.display = 'block'
         // slideRef.current.style.display = 'flex'
      }
   }, [modeChanged, mode])

   const handleSlide = direction => {
      if (direction === 'down') {
         if (
            themeRef.current.offsetWidth > 192
               ? slide < Math.ceil(themeData.length / 6)
               : slide < Math.ceil(themeData.length / 4)
         ) {
            pistonRef.current.style.marginBottom =
               -1 * slide * (themeRef.current.offsetHeight + 6) + 'px'
            setSlide(slide + 1)
         }
      } else {
         if (slide > 1) {
            pistonRef.current.style.marginBottom =
               -1 * (slide - 2) * (themeRef.current.offsetHeight + 6) + 'px'
            setSlide(slide - 1)
         }
      }
   }

   return (
      <>
         <div ref={themeRef} className={styles.themeWrap}>
            <div ref={pistonRef} className={styles.piston} />
            {themeData.map(data => (
               <SampleTheme key={data.label} data={data} changing={changing} setChanging={setChanging} />
            ))}
         </div>
         <div ref={slideRef} className={styles.slideWrap}>
            <button className={styles.slideBtn} onClick={() => handleSlide('down')}>
               <i className='fa-solid fa-chevron-down' />
            </button>
            <button className={styles.slideBtn} onClick={() => handleSlide('up')}>
               <i className='fa-solid fa-chevron-up' />
            </button>
         </div>
      </>
   )
}

export default Themes

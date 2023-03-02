import React, { useEffect, useRef, useState } from 'react'
import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import themeData from '../../data/themeData'
import SampleTheme from '../SampleTheme'
import styles from './themes.module.scss'

function Themes() {
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const { mode, modeChanged } = user || parameters

   const [changing, setChanging] = useState(false)
   const [slide, setSlide] = useState(1)
   const [maxSlide, setMaxSlide] = useState(0)
   const themeRef = useRef()
   const slideRef = useRef()
   const pistonRef = useRef()
   const slideDownBtn = useRef()
   const slideUpBtn = useRef()

   console.log('maxSlide: ', maxSlide)

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

   // change mode animation sidebar
   useEffect(() => {
      if (!modeChanged) {
         if (mode === 1) {
            themeRef.current.style.opacity = 1
            slideRef.current.style.opacity = 1

            themeRef.current.style.display = 'block'
            slideRef.current.style.display = 'flex'
         } else if (mode === 0) {
            themeRef.current.style.opacity = 0
            slideRef.current.style.opacity = 0

            themeRef.current.style.display = 'none'
            slideRef.current.style.display = 'none'
         }
      } else if (modeChanged) {
         if (mode === 1) {
            setTimeout(() => {
               themeRef.current.style.display = 'block'
               slideRef.current.style.display = 'flex'
            }, 490) // time = transition = 500ms

            //  ----
            setTimeout(() => {
               themeRef.current.style.opacity = 1
               slideRef.current.style.opacity = 1
            }, 990) // time = display + transition = 500 + 500 = 1000ms
         } else if (mode === 0) {
            themeRef.current.style.opacity = 0
            slideRef.current.style.opacity = 0

            setTimeout(() => {
               themeRef.current.style.display = 'none'
               slideRef.current.style.display = 'none'
            }, 490) // time = transition = 500ms
         }
      }
   }, [mode, modeChanged])

   // set max slide
   useEffect(() => {
      setMaxSlide(
         themeRef.current.offsetWidth > 192
            ? Math.ceil(themeData.length / 6)
            : Math.ceil(themeData.length / 4)
      )
   }, [])

   // slide button animation
   useLayoutEffect(() => {
      if (slide === 1) {
         // only down button
         slideDownBtn.current.style.display = 'flex'
         slideUpBtn.current.style.display = 'none'
         slideDownBtn.current.style.width = '100%'
      } else if (slide === maxSlide) {
         // only up button
         slideUpBtn.current.style.display = 'flex'
         slideDownBtn.current.style.display = 'none'
         slideUpBtn.current.style.width = '100%'
      } else {
         slideDownBtn.current.style.display = 'flex'
         slideUpBtn.current.style.width = '50%'
         slideUpBtn.current.style.display = 'flex'
         slideDownBtn.current.style.width = '50%'
      }
   }, [slide, maxSlide])

   const handleSlide = direction => {
      if (direction === 'down') {
         if (slide < maxSlide) {
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
            <button ref={slideDownBtn} className={styles.slideBtn} onClick={() => handleSlide('down')}>
               <i className='fa-solid fa-chevron-down' />
            </button>
            <button ref={slideUpBtn} className={styles.slideBtn} onClick={() => handleSlide('up')}>
               <i className='fa-solid fa-chevron-up' />
            </button>
         </div>
      </>
   )
}

export default Themes

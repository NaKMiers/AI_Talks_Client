import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import themeData from '../../data/themeData'
import SampleTheme from '../SampleTheme'
import styles from './themes.module.scss'

function Themes() {
   const [changing, setChanging] = useState(false)
   const [slide, setSlide] = useState(1)
   const themeRef = useRef()
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
         <div className={styles.slideWrap}>
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

import React, { useEffect, useState } from 'react'
import styles from './sampleTheme.module.scss'
import userApi from '../../apis/userApi'
import { useRef } from 'react'

function SampleTheme({ data, changing, setChanging }) {
   const [loading, setLoading] = useState(false)
   const timeoutRef = useRef(null)

   const handleChangeTheme = () => {
      // if this theme is changing, other theme can't change
      if (!changing) {
         setLoading(true)
         setChanging(true)

         timeoutRef.current = setTimeout(async () => {
            try {
               // const res = await userApi.changeTheme()
               console.log(data)
            } catch (err) {
               console.log(err)
            }

            setLoading(false)
            setChanging(false)
         }, 3000)
      }
   }

   const handleCancelChangeTheme = () => {
      // if this theme is changing, this theme will cancel
      if (loading) {
         setLoading(false)
         setChanging(false)
         clearTimeout(timeoutRef.current)
      }
   }

   return (
      <div
         className={`${styles.sampleTheme} ${loading ? styles.disappear : ''} ${
            changing && !loading && styles.disabled
         }`}
         style={{ background: data.background, color: data.text }}
         onClick={handleChangeTheme}
      >
         <span>{data.label}</span>
         <img className={styles.loading} src='assets/spin.gif' alt='loading' />
         <button className={styles.cancelBtn} onClick={handleCancelChangeTheme}>
            <i className='fa-solid fa-xmark' />
         </button>
      </div>
   )
}

export default SampleTheme

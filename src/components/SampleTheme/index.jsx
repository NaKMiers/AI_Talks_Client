import React, { useEffect, useState } from 'react'
import styles from './sampleTheme.module.scss'
import userApi from '../../apis/userApi'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parameterAction from '../../action/parameterAction'

function SampleTheme({ data, changing, setChanging }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer)
   const { theme } = useSelector(state => state.parameterReducer)
   const [loading, setLoading] = useState(false)
   const timeoutRef = useRef(null)

   const handleChangeTheme = () => {
      // if this theme is changing, other theme can't change
      console.log(data)
      if (!changing) {
         setLoading(true)
         setChanging(true)

         timeoutRef.current = setTimeout(async () => {
            if (user) {
               try {
                  console.log(12312323)
                  // const res = await userApi.changeTheme()
               } catch (err) {
                  console.log(err)
               }
            } else {
               dispatch(parameterAction.changeTheme(data.index))
            }

            setLoading(false)
            setChanging(false)
         }, 2000)
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
         style={{
            background: data.background,
            color: data.text,
            borderRadius: data.index === theme ? '0.2rem' : '',
         }}
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

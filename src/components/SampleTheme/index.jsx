import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parameterAction from '../../action/parameterAction'
import userAction from '../../action/userAction'
import userApi from '../../apis/userApi'
import styles from './sampleTheme.module.scss'

function SampleTheme({ data, changing, setChanging }) {
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const { theme } = user || parameters

   const [loading, setLoading] = useState(false)
   const timeoutRef = useRef(null)

   const handleChangeTheme = () => {
      // if this theme is changing, other theme can't change
      if (!changing) {
         setLoading(true)
         setChanging(true)

         timeoutRef.current = setTimeout(async () => {
            const newState = user ? { ...user, theme: data.index } : { ...parameters, theme: data.index }
            if (user) {
               try {
                  const res = await userApi.changeParameter(user._id, newState)
                  dispatch(userAction.changeParameter(res.data))
               } catch (err) {
                  console.log(err)
               }
            } else {
               dispatch(parameterAction.changeParameter(newState))
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

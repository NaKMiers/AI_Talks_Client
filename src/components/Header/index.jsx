import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parameterAction from '../../action/parameterAction'
import userAction from '../../action/userAction'
import userApi from '../../apis/userApi'
import styles from './header.module.scss'

function Header({ setShowSidebar }) {
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const { mode } = user || parameters

   const [modeChanging, setModeChanging] = useState(false)
   const pistonRef = useRef()

   // set status for change mode button
   useLayoutEffect(() => {
      pistonRef.current.style.marginTop = mode === 1 ? 0 : -1.3 + 'rem'
   }, [mode])

   const handleChangeMode = useCallback(async () => {
      // disable change mode button when mode is changing
      if (!modeChanging) {
         setModeChanging(true)

         if (user) {
            try {
               const res = await userApi.changeParameter(user._id, {
                  ...user,
                  mode: mode === 1 ? 0 : 1,
               })
               dispatch(userAction.changeMode(res.data))
            } catch (err) {
               console.log(err)
            }
         } else {
            dispatch(parameterAction.changeMode(mode === 1 ? 0 : 1))
         }

         setTimeout(() => {
            setModeChanging(false)
         }, 2000)
      }
   }, [modeChanging, user, mode, dispatch])

   return (
      <div className={styles.header}>
         <div className={styles.menuBtn}>
            <button onClick={() => setShowSidebar(true)}>
               <i className='fa-solid fa-bars' />
            </button>
         </div>
         AI TALKS
         <div className={styles.switchWrap}>
            <div>
               <div ref={pistonRef} className={styles.piston} />
               <span className={styles.switchBtn} onClick={handleChangeMode}>
                  Chat
               </span>
               <span className={styles.switchBtn} onClick={handleChangeMode}>
                  Image
               </span>
            </div>
            <div className={styles.tooltip}>Change Mode</div>
         </div>
      </div>
   )
}

export default memo(Header)

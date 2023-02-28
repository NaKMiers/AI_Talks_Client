import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parameterAction from '../../action/parameterAction'
import styles from './header.module.scss'

function Header({ setShowSidebar }) {
   const dispatch = useDispatch()
   const { mode } = useSelector(state => state.parameterReducer)

   const [modeChanging, setModeChanging] = useState(false)

   const pistonRef = useRef()

   useLayoutEffect(() => {
      pistonRef.current.style.marginTop = mode === 1 ? -1.3 + 'rem' : 0
   }, [mode])

   const handleChangeMode = () => {
      // disable change mode button when mode is changing
      if (!modeChanging) {
         dispatch(parameterAction.changeMode(mode === 1 ? 0 : 1))
         setModeChanging(true)
         console.log('setModeChanging(true)')
         setTimeout(() => {
            setModeChanging(false)
         }, 2000)
      }
   }

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
                  Image
               </span>
               <span className={styles.switchBtn} onClick={handleChangeMode}>
                  Chat
               </span>
            </div>
         </div>
      </div>
   )
}

export default Header

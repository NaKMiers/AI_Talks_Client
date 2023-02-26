import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parameterAction from '../../action/parameterAction'
import styles from './header.module.scss'

function Header({ setShowSidebar }) {
   const dispatch = useDispatch()
   const { mode } = useSelector(state => state.parameterReducer)

   const pistonRef = useRef()

   useLayoutEffect(() => {
      pistonRef.current.style.marginTop = mode === 1 ? -1.3 + 'rem' : 0
   }, [mode])

   const handleChangeMode = () => {
      dispatch(parameterAction.changeMode(mode === 1 ? 0 : 1))
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

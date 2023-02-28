import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from '../Message'
import styles from './chatBody.module.scss'

function ChatBody() {
   const { mode, modeChanged } = useSelector(state => state.parameterReducer)
   const { loading } = useSelector(state => state.promptReducer)
   const { promptsMode1, promptsMode0 } = useSelector(state => state.promptReducer)

   const scrollRef = useRef(null)
   const wrapMode1Ref = useRef(null)
   const wrapMode0Ref = useRef(null)

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
   })

   // animation when mode change
   useEffect(() => {
      if (!modeChanged) {
         if (mode === 1) {
            wrapMode1Ref.current.style.opacity = 1
            wrapMode1Ref.current.style.display = 'flex'

            // ----

            wrapMode0Ref.current.style.opacity = 0
            wrapMode0Ref.current.style.display = 'none'
         } else if (mode === 0) {
            wrapMode1Ref.current.style.opacity = 0
            wrapMode1Ref.current.style.display = 'none'

            // ----

            wrapMode0Ref.current.style.opacity = 1
            wrapMode0Ref.current.style.display = 'flex'
         }
      } else if (modeChanged) {
         if (mode === 1) {
            wrapMode0Ref.current.style.opacity = 0
            setTimeout(() => {
               wrapMode0Ref.current.style.display = 'none'
               wrapMode1Ref.current.style.display = 'flex'
            }, 790) // time = transition = 800ms

            // ----

            setTimeout(() => {
               wrapMode1Ref.current.style.opacity = 1
            }, 1590) // time = display + transition = 800 + 800 = 1600ms
         } else if (mode === 0) {
            wrapMode1Ref.current.style.opacity = 0
            setTimeout(() => {
               wrapMode1Ref.current.style.display = 'none'
               wrapMode0Ref.current.style.display = 'flex'
            }, 790) // time = transition = 800ms

            // ----

            setTimeout(() => {
               wrapMode0Ref.current.style.opacity = 1
            }, 1590) // time = display + transition = 800 + 800 = 1600ms
         }
      }
   }, [mode, modeChanged])

   const renderMesssageMode1 = () => promptsMode1.map((data, i) => <Message key={i} data={data} />)
   const renderMesssageMode0 = () => promptsMode0.map((data, i) => <Message key={i} data={data} />)

   return (
      <>
         <div ref={wrapMode1Ref} className={styles.body}>
            {renderMesssageMode1()}

            {loading && (
               <div className={styles.aiMessage}>
                  <img src='assets/typing.gif' alt='typing' />
               </div>
            )}

            <div ref={scrollRef} className={styles.theLast} />
         </div>
         <div ref={wrapMode0Ref} className={styles.body}>
            {renderMesssageMode0()}

            {loading && (
               <div className={styles.aiMessage}>
                  <img src='assets/typing.gif' alt='typing' />
               </div>
            )}

            <div ref={scrollRef} className={styles.theLast} />
         </div>
      </>
   )
}

export default ChatBody

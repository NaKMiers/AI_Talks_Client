import React, { memo, useState } from 'react'
import { useRef } from 'react'
import { format } from 'timeago.js'
import styles from './message.module.scss'

function Message({ data }) {
   const [showTime, setShowTime] = useState(false)
   const timeRef = useRef()

   const handleShowTime = () => {
      if (!showTime) {
         // show time
         timeRef.current.style.display = 'block'
         timeRef.current.classList.remove(styles.hide)
         timeRef.current.classList.add(styles.show)
         setShowTime(true)
      } else {
         // hide time
         timeRef.current.classList.remove(styles.show)
         timeRef.current.classList.add(styles.hide)
         setTimeout(() => {
            timeRef.current.style.display = 'none'
            setShowTime(false)
         }, 190) // animation: 200ms
      }
   }

   return data.type === 'ai-image' ? (
      <div className={styles.aiImage} onClick={handleShowTime}>
         <div>
            {data.images.map((img, i) => (
               <div key={i} className={styles.imageWrap}>
                  <img
                     src={img}
                     alt='ai-response'
                     className={styles.imgRes}
                     onError={e => (e.target.src = 'assets/default.png')}
                  />
                  <button className={styles.downloadBtn}>
                     <i className='fa-solid fa-download' />
                  </button>
               </div>
            ))}
         </div>
         <span
            style={{ float: 'right' }}
            ref={timeRef}
            className={`${styles.time} ${showTime && styles.active}`}
         >
            {format(data.createdAt)}
         </span>
      </div>
   ) : (
      <div
         className={
            data.type === 'user' || data.type === 'user-image' ? styles.userMessage : styles.aiMessage
         }
         onClick={handleShowTime}
      >
         <div>{data.text}</div>
         <span
            ref={timeRef}
            className={styles.time}
            style={{ float: data.type === 'user' || data.type === 'user-image' ? 'left' : 'right' }}
         >
            {format(data.createdAt)}
         </span>
      </div>
   )
}

export default memo(Message)

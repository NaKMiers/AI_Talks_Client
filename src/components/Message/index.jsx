import React, { memo, useState } from 'react'
import { format } from 'timeago.js'
import styles from './message.module.scss'

function Message({ data }) {
   const [showTime, setShowTime] = useState(false)

   return data.type === 'ai-image' ? (
      <div className={styles.aiImage} onClick={() => setShowTime(!showTime)}>
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
         <span className={`${styles.time} ${showTime && styles.active}`}>{format(data.createdAt)}</span>
      </div>
   ) : (
      <div
         className={
            data.type === 'user' || data.type === 'user-image' ? styles.userMessage : styles.aiMessage
         }
         onClick={() => setShowTime(!showTime)}
      >
         <div>{data.text}</div>
         <span className={`${styles.time} ${showTime && styles.active}`}>{format(data.createdAt)}</span>
      </div>
   )
}

export default memo(Message)

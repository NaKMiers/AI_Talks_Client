import React, { useState } from 'react'
import styles from './message.module.scss'
import { format } from 'timeago.js'

function Message({ data }) {
   const [showTime, setShowTime] = useState(false)

   return data.type === 'ai-image' ? (
      <div className={styles.aiImage} onClick={() => setShowTime(!showTime)}>
         <div>
            {data.images.map((img, i) => (
               <img
                  key={i}
                  src={img}
                  alt='ai-response'
                  className={styles.imgRes}
                  onError={e => {
                     console.log((e.target.src = 'assets/default.png'))
                  }}
               />
            ))}
         </div>
         <span className={`${styles.time} ${showTime && styles.active}`}>2 minutes ago</span>
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

export default Message

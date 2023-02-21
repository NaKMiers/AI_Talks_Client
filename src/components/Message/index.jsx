import React, { useState } from 'react'
import styles from './message.module.scss'

function Message({ type, data }) {
   const [showTime, setShowTime] = useState(false)

   return type === 'ai-image' ? (
      <div className={styles.aiImage} onClick={() => setShowTime(!showTime)}>
         <div>
            {data.map((img, i) => (
               <img key={i} src={img} alt='ai-response' className={styles.imgRes} />
            ))}
         </div>
         <span className={`${styles.time} ${showTime && styles.active}`}>2 minutes ago</span>
      </div>
   ) : (
      <div
         className={type === 'user' ? styles.userMessage : styles.aiMessage}
         onClick={() => setShowTime(!showTime)}
      >
         <div>Hello</div>
         <span className={`${styles.time} ${showTime && styles.active}`}>2 minutes ago</span>
      </div>
   )
}

export default Message

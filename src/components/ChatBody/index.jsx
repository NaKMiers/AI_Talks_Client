import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useEffect, useRef } from 'react'
import styles from './chatBody.module.scss'

function ChatBody() {
   const scrollRef = useRef(null)

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
   })
   return (
      <div className={styles.body}>
         <div className={styles.userMessage}>Hello</div>
         <div className={styles.aiMessage}>
            awdawd is a word that has no meaning. It is sometimes used as a placeholder when someone is
            trying to think of the right word to use. It can also be used as a filler word when someone
            is talking and doesn't know what to say.
         </div>
         <div className={styles.userMessage}>Hello</div>
         <div className={styles.aiMessage}>
            awdawd is a word that has no meaning. It is sometimes used as a placeholder when someone is
            trying to think of the right word to use. It can also be used as a filler word when someone
            is talking and doesn't know what to say.
         </div>
         <div className={styles.userMessage}>Hello</div>
         <div className={styles.aiMessage}>
            awdawd is a word that has no meaning. It is sometimes used as a placeholder when someone is
            trying to think of the right word to use. It can also be used as a filler word when someone
            is talking and doesn't know what to say.
         </div>
         <div className={styles.userMessage}>Hello</div>
         <div className={styles.aiMessage}>
            awdawd is a word that has no meaning. It is sometimes used as a placeholder when someone is
            trying to think of the right word to use. It can also be used as a filler word when someone
            is talking and doesn't know what to say.
         </div>
         <div className={styles.userMessage}>Hello</div>
         <div className={styles.aiMessage}>
            awdawd is a word that has no meaning. It is sometimes used as a placeholder when someone is
            trying to think of the right word to use. It can also be used as a filler word when someone
            is talking and doesn't know what to say.
         </div>
         <div ref={scrollRef} className={styles.theLast} />
      </div>
   )
}

export default ChatBody

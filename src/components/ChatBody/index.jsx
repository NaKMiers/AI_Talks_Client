import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useEffect, useRef } from 'react'
import { large } from '../../data/imageData'
import Message from '../Message'
import styles from './chatBody.module.scss'

function ChatBody() {
   const scrollRef = useRef(null)

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
   })
   return (
      <div className={styles.body}>
         <Message type='ai' />
         <Message type='user' />
         <Message type='ai-image' data={large} />

         <div ref={scrollRef} className={styles.theLast} />
      </div>
   )
}

export default ChatBody

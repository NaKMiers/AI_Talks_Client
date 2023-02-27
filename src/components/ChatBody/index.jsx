import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from '../Message'
import styles from './chatBody.module.scss'

function ChatBody() {
   const { mode } = useSelector(state => state.parameterReducer)
   const { messagesMode1, messagesMode0 } = useSelector(state => state.messageReducer)
   const scrollRef = useRef(null)

   console.log('messagesMode1: ', messagesMode1)

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
   })

   const renderMesssageMode1 = () => messagesMode1.map(message => <Message data={message} />)

   const renderMesssageMode0 = () => messagesMode0.map(message => <Message data={message} />)

   return (
      <div className={styles.body}>
         {mode === 1 ? renderMesssageMode1() : renderMesssageMode0()}

         <div ref={scrollRef} className={styles.theLast} />
      </div>
   )
}

export default ChatBody

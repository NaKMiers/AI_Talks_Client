import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useRef, useState } from 'react'
import styles from './input.module.scss'

function Input() {
   const [value, setValue] = useState('')
   const inputRef = useRef(null)

   const setHeight = () => {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
   }

   return (
      <div className={styles.inputContainer}>
         <textarea
            rows={1}
            onChange={e => setValue(e.target.value)}
            onInput={setHeight}
            ref={inputRef}
            className={styles.inputText}
            value={value}
         />
         <button className={styles.sendBtn}>
            <i className='fa-solid fa-paper-plane' />
         </button>
      </div>
   )
}

export default Input

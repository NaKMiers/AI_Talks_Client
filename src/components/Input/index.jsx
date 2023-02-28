import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './input.module.scss'
import promptAction from '../../action/promptAction'
import completionApi from '../../apis/completionApi'
import imageApi from '../../apis/imageApi'

function Input() {
   const dispatch = useDispatch()
   const { amount, size, mode } = useSelector(state => state.parameterReducer)
   const { loading, promptsMode1, promptsMode0 } = useSelector(state => state.promptReducer)
   const [prompt, setPrompt] = useState('')
   const inputRef = useRef(null)

   const setHeight = () => {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
   }

   const handleSend = async () => {
      if (prompt.trim()) {
         try {
            dispatch(promptAction.loading(true))
            setPrompt('')
            if (mode === 1) {
               const newText =
                  promptsMode1
                     .slice(promptsMode1.length - 10)
                     .map(item => item.text)
                     .join('\n') + prompt.trim()

               dispatch(
                  promptAction.sendPromptMode1({
                     type: 'user',
                     text: prompt.trim(),
                     createdAt: Date.now(),
                  })
               )
               const res = await completionApi.createPrompt(newText)
               dispatch(promptAction.loading(false))
               dispatch(promptAction.receiveCompletion({ ...res.data, type: 'ai' }))
            } else if (mode === 0) {
               dispatch(
                  promptAction.sendPromptMode0({
                     type: 'user',
                     text: prompt.trim(),
                     createdAt: Date.now(),
                  })
               )
               const res = await imageApi.generateImage(prompt.trim(), amount, size)
               dispatch(promptAction.loading(false))
               dispatch(
                  promptAction.receiveImage({ ...res.data, type: 'ai-image', images: res.data.images })
               )
               console.log('res-image: ', res)
            }
         } catch (err) {
            console.log(err)
         }
      }

      // dispatch(mode === 1 ? promptAction.sendPromptMode1() : promptAction.sendPromptMode0())
   }

   return (
      <div className={styles.inputContainer}>
         <textarea
            ref={inputRef}
            className={styles.inputText}
            rows={1}
            value={prompt}
            onInput={setHeight}
            onChange={e => setPrompt(e.target.value)}
         />
         <button
            className={`${styles.sendBtn} ${loading && styles.disabled}`}
            onClick={handleSend}
            disabled={loading}
         >
            <i className='fa-solid fa-paper-plane' />
         </button>
      </div>
   )
}

export default Input

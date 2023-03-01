import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './input.module.scss'
import promptAction from '../../action/promptAction'
import userPromptAction from '../../action/userPromptAction'
import completionApi from '../../apis/completionApi'
import imageApi from '../../apis/imageApi'

function Input() {
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const { model, maxTokens, temperature, amount, size, mode } = user || parameters

   const userPrompts = useSelector(state => state.userPromptReducer)
   const prompts = useSelector(state => state.promptReducer)
   const { loading, promptsMode1, promptsMode0 } = user ? userPrompts : prompts

   const [prompt, setPrompt] = useState('')
   const inputRef = useRef(null)

   const setHeight = () => {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
   }

   const handleSend = () => {
      const handleCreateCompletionNoLogin = async newText => {
         console.log('handleCreateCompletionNoLogin')
         dispatch(promptAction.loading(true))
         try {
            dispatch(
               promptAction.sendPromptMode1({
                  type: 'user',
                  text: prompt.trim(),
                  createdAt: Date.now(),
               })
            )

            const res = await completionApi.createCompletion({ prompt: newText })
            dispatch(promptAction.receiveCompletion({ ...res.data, type: 'ai' }))
            dispatch(promptAction.loading(false))
            setPrompt('')
         } catch (err) {
            dispatch(promptAction.loading(false))
            console.log(err)
         }
      }

      const handleCreateCompletionLogined = async newText => {
         console.log('handleCreateCompletionNoLogin')
         dispatch(userPromptAction.loading(true))
         try {
            const res1 = await completionApi.createPrompt(user._id, prompt.trim())
            console.log('res1: ', res1.data)
            dispatch(userPromptAction.sendPromptMode1(res1.data))

            const res2 = await completionApi.createFullCompletion(user._id, {
               prompt: newText,
               model,
               maxTokens,
               temperature,
            })
            console.log('res2: ', res2.data)
            dispatch(userPromptAction.receiveCompletion(res2.data))
            dispatch(userPromptAction.loading(false))
            setPrompt('')
         } catch (err) {
            dispatch(userPromptAction.loading(false))
            console.log(err)
         }
      }

      const handleGenerateImageNoLogin = async () => {
         console.log('handleGenerateImageNoLogin')
         dispatch(promptAction.loading(true))
         try {
            dispatch(
               promptAction.sendPromptMode0({
                  type: 'user',
                  text: prompt.trim(),
                  createdAt: Date.now(),
               })
            )

            const res = await imageApi.generateImage({ prompt: prompt.trim(), amount, size })
            console.log('res1', res.data)
            dispatch(promptAction.receiveImage({ images: res.data, type: 'ai-image' }))
            dispatch(promptAction.loading(false))
            setPrompt('')
         } catch (err) {
            dispatch(promptAction.loading(false))
            console.log(err)
         }
      }

      const handleGenerateImageLogined = async () => {
         console.log('handleGenerateImageLogined')
         dispatch(userPromptAction.loading(true))

         try {
            const res1 = await imageApi.createPrompt(user._id, prompt.trim())
            console.log('res1: ', res1.data)
            dispatch(userPromptAction.sendPromptMode0(res1.data))

            const res2 = await imageApi.generateFullImage(user._id, {
               prompt: prompt.trim(),
               amount,
               size,
            })
            console.log('res2: ', res2.data)
            dispatch(userPromptAction.receiveImage(res2.data))
            dispatch(userPromptAction.loading(false))
            setPrompt('')
         } catch (err) {
            dispatch(userPromptAction.loading(false))
            console.log(err)
         }
      }

      if (prompt.trim()) {
         if (mode === 1) {
            const newText =
               promptsMode1
                  .slice(promptsMode1.length - 8)
                  .map(item => item.text)
                  .join('\n') + prompt.trim()

            if (user) {
               handleCreateCompletionLogined(newText)
            } else {
               handleCreateCompletionNoLogin(newText)
            }
         } else if (mode === 0) {
            if (user) {
               handleGenerateImageLogined()
            } else {
               handleGenerateImageNoLogin()
            }
         }
      }
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

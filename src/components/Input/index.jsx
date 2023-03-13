import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useCallback, useRef, useState } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import promptAction from '../../action/promptAction'
import userPromptAction from '../../action/userPromptAction'
import completionApi from '../../apis/completionApi'
import imageApi from '../../apis/imageApi'
import styles from './input.module.scss'

function Input() {
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const { model, maxTokens, temperature, amount, size, mode } = user || parameters

   const userPrompts = useSelector(state => state.userPromptReducer)
   const prompts = useSelector(state => state.promptReducer)
   const { loading, promptsMode1, promptsMode0 } = user ? userPrompts : prompts

   const [prompt, setPrompt] = useState('')
   const [clearLoading, setClearLoading] = useState(false)
   const inputRef = useRef(null)

   // update textarea height when input
   const setHeight = useCallback(() => {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
   }, [])

   // send prompt and create completions (NO LOGIN)
   const handleCreateCompletionNoLogin = useCallback(
      async newText => {
         console.log('prompt: ', newText)
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
            setPrompt('')

            const res = await completionApi.createCompletion({ prompt: newText })
            console.log('res: ', res.data)
            dispatch(promptAction.receiveCompletion({ ...res.data, type: 'ai' }))
            dispatch(promptAction.loading(false))
         } catch (err) {
            dispatch(promptAction.loading(false))
            console.log(err)
         }
      },
      [dispatch, prompt]
   )
   // send prompt and create completions (LOGINED)
   const handleCreateCompletionLogined = useCallback(
      async newText => {
         console.log('handleCreateCompletionNoLogin')
         dispatch(userPromptAction.loading(true))
         try {
            const res1 = await completionApi.createPrompt(user._id, prompt.trim())
            console.log('res1: ', res1.data)
            dispatch(userPromptAction.sendPromptMode1(res1.data))
            setPrompt('')

            const res2 = await completionApi.createFullCompletion(user._id, {
               prompt: newText,
               model,
               maxTokens,
               temperature,
            })
            console.log('res2: ', res2.data)
            dispatch(userPromptAction.receiveCompletion(res2.data))
            dispatch(userPromptAction.loading(false))
         } catch (err) {
            dispatch(userPromptAction.loading(false))
            console.log(err)
         }
      },
      [dispatch, prompt, model, maxTokens, temperature, user?._id]
   )
   // send prompt and create images (NO LOGIN)
   const handleGenerateImageNoLogin = useCallback(async () => {
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
         setPrompt('')

         const res = await imageApi.generateImage({ prompt: prompt.trim(), amount, size })
         console.log('res1', res.data)
         dispatch(promptAction.receiveImage({ images: res.data, type: 'ai-image' }))
         dispatch(promptAction.loading(false))
      } catch (err) {
         dispatch(promptAction.loading(false))
         console.log(err)
      }
   }, [dispatch, prompt, amount, size])
   // send prompt and create images (LOGINED)
   const handleGenerateImageLogined = useCallback(async () => {
      console.log('handleGenerateImageLogined')
      dispatch(userPromptAction.loading(true))

      try {
         const res1 = await imageApi.createPrompt(user._id, prompt.trim())
         console.log('res1: ', res1.data)
         dispatch(userPromptAction.sendPromptMode0(res1.data))
         setPrompt('')

         const res2 = await imageApi.generateFullImage(user._id, {
            prompt: prompt.trim(),
            amount,
            size,
         })
         console.log('res2: ', res2.data)
         dispatch(userPromptAction.receiveImage(res2.data))
         dispatch(userPromptAction.loading(false))
      } catch (err) {
         dispatch(userPromptAction.loading(false))
         console.log(err)
      }
   }, [dispatch, user?._id, prompt, amount, size])

   // clear prompt and completions (NO LOGIN)
   const handleClearConversationMode1NoLogin = useCallback(async () => {
      console.log('handleClearConversationMode1NoLogin')
      setClearLoading(true)

      setTimeout(() => {
         dispatch(promptAction.clearMode1())
         setClearLoading(false)
      }, 1000)
   }, [dispatch])

   // clear prompt and completions (LOGINED)
   const handleClearConversationMode1Logined = useCallback(async () => {
      console.log('handleClearConversationMode1Logined')
      setClearLoading(true)

      try {
         const res = await completionApi.clearCompletions(user._id)
         console.log('res-clearCompletions: ', res.data)
         dispatch(userPromptAction.clearMode1())
         setClearLoading(false)
      } catch (err) {
         setClearLoading(false)
         console.log(err)
      }
   }, [dispatch, user?._id])

   // clear prompt and images (NO LOGIN)
   const handleClearConversationMode0NoLogin = useCallback(async () => {
      console.log('handleClearConversationMode0NoLogin')
      setClearLoading(true)

      setTimeout(() => {
         dispatch(promptAction.clearMode0())
         setClearLoading(false)
      }, 1000)
   }, [dispatch])

   // clear prompt and images (LOGINED)
   const handleClearConversationMode0Logined = useCallback(async () => {
      console.log('handleClearConversationMode0Logined')
      setClearLoading(true)

      try {
         const res = await imageApi.clearImages(user._id)
         console.log('res-clearImages: ', res.data)
         dispatch(userPromptAction.clearMode0())
         setClearLoading(false)
      } catch (err) {
         setClearLoading(false)
         console.log(err)
      }
   }, [dispatch, user?._id])

   // handle send prompt to server
   const handleSend = useCallback(() => {
      if (prompt.trim()) {
         if (mode === 1) {
            const newText =
               promptsMode1
                  .slice(promptsMode1.length - 6)
                  .map(item => item.text)
                  .join('\n') +
               '\n' +
               prompt.trim()

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
   }, [
      prompt,
      mode,
      promptsMode1,
      user,
      handleCreateCompletionLogined,
      handleCreateCompletionNoLogin,
      handleGenerateImageLogined,
      handleGenerateImageNoLogin,
   ])

   // clear conversation in redux when nologin and clear in database when logined
   const handleClearConversation = useCallback(() => {
      if (mode === 1) {
         if (user) {
            promptsMode1.length && handleClearConversationMode1Logined()
         } else {
            promptsMode1.length && handleClearConversationMode1NoLogin()
         }
      } else if (mode === 0) {
         if (user) {
            promptsMode0.length && handleClearConversationMode0Logined()
         } else {
            promptsMode0.length && handleClearConversationMode0NoLogin()
         }
      }
   }, [
      user,
      mode,
      promptsMode1.length,
      promptsMode0.length,
      handleClearConversationMode1Logined,
      handleClearConversationMode1NoLogin,
      handleClearConversationMode0Logined,
      handleClearConversationMode0NoLogin,
   ])

   return (
      <div className={styles.inputContainer}>
         <button
            className={`${styles.inputBtn} ${loading && styles.disabled}`}
            onClick={handleClearConversation}
            disabled={loading}
            tooltip='Clear Conversation'
         >
            {clearLoading ? (
               <img className={styles.loading} src='assets/spin.gif' alt='loading' />
            ) : (
               <i className='fa-solid fa-trash-can' />
            )}
         </button>
         <textarea
            ref={inputRef}
            className={styles.inputText}
            rows={1}
            value={prompt}
            onInput={setHeight}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.ctrlKey && e.keyCode === 13 && handleSend()}
            placeholder={mode === 1 ? 'Message...' : 'Describe the image...'}
         />
         <button
            className={`${styles.inputBtn} ${loading && styles.disabled}`}
            onClick={handleSend}
            disabled={loading}
            tooltip='send'
         >
            <i className='fa-solid fa-paper-plane' />
         </button>
      </div>
   )
}

export default memo(Input)

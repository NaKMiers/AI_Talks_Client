import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userPromptAction from '../../action/userPromptAction'
import completionApi from '../../apis/completionApi'
import imageApi from '../../apis/imageApi'
import Message from '../Message'
import styles from './chatBody.module.scss'

function ChatBody() {
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const { mode, modeChanged } = user || parameters

   const userPrompts = useSelector(state => state.userPromptReducer)
   const prompts = useSelector(state => state.promptReducer)
   const { loading, promptsMode1, promptsMode0 } = user ? userPrompts : prompts

   const scrollRefMode1 = useRef(null)
   const scrollRefMode0 = useRef(null)
   const wrapMode1Ref = useRef(null)
   const wrapMode0Ref = useRef(null)

   // scroll into view
   useEffect(() => {
      scrollRefMode1.current?.scrollIntoView({ behavior: 'smooth' })
      scrollRefMode0.current?.scrollIntoView({ behavior: 'smooth' })
   })

   // animation when mode change
   useEffect(() => {
      if (!modeChanged) {
         if (mode === 1) {
            wrapMode1Ref.current.style.opacity = 1
            wrapMode1Ref.current.style.display = 'flex'

            // ----

            wrapMode0Ref.current.style.opacity = 0
            wrapMode0Ref.current.style.display = 'none'
         } else if (mode === 0) {
            wrapMode1Ref.current.style.opacity = 0
            wrapMode1Ref.current.style.display = 'none'

            // ----

            wrapMode0Ref.current.style.opacity = 1
            wrapMode0Ref.current.style.display = 'flex'
         }
      } else if (modeChanged) {
         if (mode === 1) {
            wrapMode0Ref.current.style.opacity = 0
            setTimeout(() => {
               wrapMode0Ref.current.style.display = 'none'
               wrapMode1Ref.current.style.display = 'flex'
            }, 790) // time = transition = 800ms

            // ----

            setTimeout(() => {
               wrapMode1Ref.current.style.opacity = 1
            }, 1590) // time = display + transition = 800 + 800 = 1600ms
         } else if (mode === 0) {
            wrapMode1Ref.current.style.opacity = 0
            setTimeout(() => {
               wrapMode1Ref.current.style.display = 'none'
               wrapMode0Ref.current.style.display = 'flex'
            }, 790) // time = transition = 800ms

            // ----

            setTimeout(() => {
               wrapMode0Ref.current.style.opacity = 1
            }, 1590) // time = display + transition = 800 + 800 = 1600ms
         }
      }
   }, [mode, modeChanged])

   // get prompts + get images
   useEffect(() => {
      const getPromptsMode1 = async () => {
         try {
            const res = await completionApi.getPrompts(user._id)
            console.log('res-prompt-mode1: ', res.data)
            dispatch(userPromptAction.setPromptsMode1(res.data))
         } catch (err) {
            console.log(err)
         }
      }
      const getPromptsMode0 = async () => {
         try {
            const res = await imageApi.getImages(user._id)
            console.log('res-prompt-mode0: ', res.data)
            dispatch(userPromptAction.setPromptsMode0(res.data))
         } catch (err) {
            console.log(err)
         }
      }
      if (user) {
         console.log('mode: ', mode)
         mode === 1 ? getPromptsMode1() : getPromptsMode0()
      }
   }, [user, mode, dispatch])

   const renderMesssageMode1 = useCallback(
      () => promptsMode1.map((data, i) => <Message key={i} data={data} />),
      [promptsMode1]
   )
   const renderMesssageMode0 = useCallback(
      () => promptsMode0.map((data, i) => <Message key={i} data={data} />),
      [promptsMode0]
   )

   return (
      <>
         <div ref={wrapMode1Ref} className={styles.body}>
            {mode === 1 && renderMesssageMode1()}

            {loading && (
               <div className={styles.aiMessage}>
                  <img src='assets/typing.gif' alt='typing' />
               </div>
            )}

            <div ref={scrollRefMode1} className={styles.theLast} />
         </div>
         <div ref={wrapMode0Ref} className={styles.body}>
            {mode === 0 && renderMesssageMode0()}

            {loading && (
               <div className={styles.aiMessage}>
                  <img src='assets/typing.gif' alt='typing' />
               </div>
            )}

            <div ref={scrollRefMode0} className={styles.theLast} />
         </div>
      </>
   )
}

export default memo(ChatBody)

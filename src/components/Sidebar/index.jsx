import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parameterAction from '../../action/parameterAction'
import userAction from '../../action/userAction'
import userApi from '../../apis/userApi'
import { GroupByName } from '../../data/modelData'
import Themes from '../Themes'
import UserBlock from '../UserBlock'
import styles from './sidebar.module.scss'

function Sidebar({ showSidebar, setShowSidebar }) {
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const { model, maxTokens, temperature, amount, size, mode, modeChanged } = user || parameters

   const [groupBy, setGroupBy] = useState('name')
   const fixedSize = ['256x256', '512x512', '1024x1024']

   // DOM REF
   const resetRef = useRef(null)
   const modelLabelRef = useRef(null)
   const modelInputRef = useRef(null)
   const groupByRef = useRef(null)
   const maxTokenLabelRef = useRef(null)
   const maxTokenInputRef = useRef(null)
   const tempLabelRef = useRef(null)
   const tempInputRef = useRef(null)
   const themeLabelRef = useRef(null)

   const amountLabelRef = useRef(null)
   const amountInputRef = useRef(null)
   const sizeLabelRef = useRef(null)
   const sizeInputRef = useRef(null)

   const paramsMode1 = useMemo(
      () => [
         {
            ref: modelLabelRef,
            display: 'block',
         },
         {
            ref: modelInputRef,
            display: 'block',
         },
         {
            ref: groupByRef,
            display: 'flex',
         },
         {
            ref: maxTokenLabelRef,
            display: 'block',
         },
         {
            ref: maxTokenInputRef,
            display: 'flex',
         },
         {
            ref: tempLabelRef,
            display: 'block',
         },
         {
            ref: tempInputRef,
            display: 'flex',
         },
         {
            ref: themeLabelRef,
            display: 'block',
         },
      ],
      []
   )
   const paramsMode0 = useMemo(
      () => [
         {
            ref: amountLabelRef,
            display: 'block',
         },
         {
            ref: amountInputRef,
            display: 'flex',
         },
         {
            ref: sizeLabelRef,
            display: 'block',
         },
         {
            ref: sizeInputRef,
            display: 'flex',
         },
      ],
      []
   )

   // change mode animation sidebar
   useEffect(() => {
      if (!modeChanged) {
         if (mode === 1) {
            paramsMode1.forEach(item => (item.ref.current.style.opacity = 1))
            paramsMode1.forEach(item => (item.ref.current.style.display = item.display))

            // ----

            paramsMode0.forEach(item => (item.ref.current.style.opacity = 0))
            paramsMode0.forEach(item => (item.ref.current.style.display = 'none'))
         } else if (mode === 0) {
            paramsMode1.forEach(item => (item.ref.current.style.opacity = 0))
            paramsMode1.forEach(item => (item.ref.current.style.display = 'none'))

            // ----

            paramsMode0.forEach(item => (item.ref.current.style.opacity = 1))
            paramsMode0.forEach(item => (item.ref.current.style.display = item.display))
         }
      } else if (modeChanged) {
         resetRef.current.style.opacity = 0
         if (mode === 1) {
            paramsMode0.forEach(item => (item.ref.current.style.opacity = 0))
            setTimeout(() => {
               paramsMode0.forEach(item => (item.ref.current.style.display = 'none'))
               paramsMode1.forEach(item => (item.ref.current.style.display = item.display))
            }, 490) // time = transition = 500ms

            // ----

            setTimeout(() => {
               paramsMode1.forEach(item => (item.ref.current.style.opacity = 1))
               resetRef.current.style.opacity = 1
            }, 990) // time = display + transition = 500 + 500 = 1000ms
         } else if (mode === 0) {
            paramsMode1.forEach(item => (item.ref.current.style.opacity = 0))
            setTimeout(() => {
               paramsMode1.forEach(item => (item.ref.current.style.display = 'none'))
               paramsMode0.forEach(item => (item.ref.current.style.display = item.display))
            }, 490) // time = transition = 500ms

            // ----

            setTimeout(() => {
               paramsMode0.forEach(item => (item.ref.current.style.opacity = 1))
               resetRef.current.style.opacity = 1
            }, 990) // time = display + transition = 500 + 500 = 1000ms
         }
      }
   }, [mode, modeChanged, paramsMode0, paramsMode1])

   //

   const handleChangeParameter = async (type, value) => {
      let newState = user ? { ...user, [type]: value } : { ...parameters, [type]: value }

      switch (type) {
         case 'model':
         case 'maxTokens':
         case 'temperature':
         case 'size':
         case 'amount': {
            if (user) {
               try {
                  const res = await userApi.changeParameter(user._id, newState)
                  console.log('res: ', res.data)
                  dispatch(userAction.changeParameter(res.data))
               } catch (err) {
                  console.log(err)
               }
            } else {
               console.log(12323)
               dispatch(parameterAction.changeParameter(newState))
            }
            break
         }
         case 'reset': {
            let resetObject = null
            if (mode === 1) {
               resetObject = {
                  theme: 0,
                  model: 'text-davinci-003',
                  maxTokens: 100,
                  temperature: 0.5,
               }
            } else if (mode === 0) {
               resetObject = { size: '256x256', amount: 1 }
            }

            newState = user ? { ...user, ...resetObject } : { ...parameters, ...resetObject }

            if (user) {
               try {
                  const res = await userApi.changeParameter(user._id, newState)
                  dispatch(userAction.changeParameter(res.data))
               } catch (err) {
                  console.log(err)
               }
            } else {
               dispatch(parameterAction.changeParameter(newState))
            }
            break
         }
         default:
            throw new Error('Invalid Action')
      }
   }

   const renderModelOption = () => {
      let models = []

      switch (groupBy) {
         case 'name':
            models = GroupByName
            break
         case 'function':
            models = []
            break
         default:
            return
      }

      return models.map(model => (
         <optgroup key={model.name} label={model.name}>
            {model.data.map(data => (
               <option key={data} value={data}>
                  {data}
               </option>
            ))}
         </optgroup>
      ))
   }

   return (
      <div className={`${styles.sidebar} ${showSidebar && styles.active}`}>
         <button className={styles.closeBtn} onClick={() => setShowSidebar(false)}>
            <i className='fa-solid fa-xmark' />
         </button>
         <h2 className={styles.title}>AI TALKS</h2>

         <div className={styles.sidebarBody}>
            {/* Models */}
            <label ref={modelLabelRef} className={`${styles.label} ${styles.model}`} htmlFor='model'>
               Select Models:
            </label>
            <select
               ref={modelInputRef}
               value={model}
               onChange={e => handleChangeParameter('model', e.target.value)}
               size={1}
               className={styles.selectModel}
               name='model'
               id='model'
            >
               {renderModelOption()}
            </select>
            <div ref={groupByRef} className={styles.groupByWrap}>
               <i>Group by: </i>
               <select onChange={e => setGroupBy(e.target.value)} value={groupBy} name='groupby'>
                  <option value='name'>Name</option>
                  <option value='function'>Function</option>
               </select>
            </div>

            {/* Max Tokens */}
            <label
               ref={maxTokenLabelRef}
               className={`${styles.label}  ${styles.maxToken}`}
               htmlFor='maxTokens'
            >
               Max Tokens:
            </label>
            <div ref={maxTokenInputRef} className={styles.maxTokenWrap}>
               <button
                  className={styles.maxTokenBtn}
                  onClick={() =>
                     handleChangeParameter('maxTokens', maxTokens > 50 ? maxTokens - 50 : maxTokens)
                  }
               >
                  <i className='fa-solid fa-minus' />
               </button>
               <input
                  type='number'
                  max='1500'
                  min='1'
                  className={styles.maxTokenInput}
                  value={maxTokens}
                  onChange={e =>
                     handleChangeParameter('maxTokens', e.target.value ? e.target.value : 50)
                  }
               />
               <button
                  className={styles.maxTokenBtn}
                  onClick={() =>
                     handleChangeParameter('maxTokens', maxTokens < 1500 ? maxTokens + 50 : maxTokens)
                  }
               >
                  <i className='fa-solid fa-plus' />
               </button>
            </div>

            {/* Temperature */}
            <label
               ref={tempLabelRef}
               className={`${styles.label} ${styles.temperature}`}
               htmlFor='temperature'
            >
               Temperature:
            </label>
            <div ref={tempInputRef} className={styles.temperatureWrap}>
               <input
                  className={styles.temperatureInput}
                  type='range'
                  min='0'
                  max='100'
                  value={temperature * 100}
                  onChange={e =>
                     handleChangeParameter('temperature', Math.floor(e.target.value / 10) / 10)
                  }
                  id='myRange'
               />
               <span className={styles.temperature}>{Math.round((temperature * 100) / 10) / 10}</span>
            </div>

            {/* Themes */}
            <label ref={themeLabelRef} className={`${styles.label} ${styles.theme}`} htmlFor='models'>
               Select Themes:
            </label>
            <Themes />

            {/* Amount */}
            <label ref={amountLabelRef} className={`${styles.label} ${styles.amount}`} htmlFor='amount'>
               Amount:
            </label>
            <div ref={amountInputRef} className={styles.amountWrap}>
               <button
                  className={styles.amountBtn}
                  onClick={() => handleChangeParameter('amount', amount > 1 ? amount - 1 : amount)}
               >
                  <i className='fa-solid fa-minus' />
               </button>
               <div className={styles.amountValue}>{amount}</div>
               <button
                  className={styles.amountBtn}
                  onClick={() => handleChangeParameter('amount', amount < 10 ? amount + 1 : amount)}
               >
                  <i className='fa-solid fa-plus' />
               </button>
            </div>

            {/* Size */}
            <label ref={sizeLabelRef} className={`${styles.label} ${styles.amount}`} htmlFor='size'>
               Size:
            </label>
            <div ref={sizeInputRef} className={styles.amountWrap}>
               <button
                  className={styles.amountBtn}
                  onClick={() =>
                     handleChangeParameter(
                        'size',
                        fixedSize.indexOf(size) > 0
                           ? fixedSize[fixedSize.indexOf(size) - 1]
                           : fixedSize[2]
                     )
                  }
               >
                  <i className='fa-solid fa-minus' />
               </button>
               <div className={styles.amountValue}>{size}</div>
               <button
                  className={styles.amountBtn}
                  onClick={() =>
                     handleChangeParameter(
                        'size',
                        fixedSize.indexOf(size) < 2
                           ? fixedSize[fixedSize.indexOf(size) + 1]
                           : fixedSize[0]
                     )
                  }
               >
                  <i className='fa-solid fa-plus' />
               </button>
            </div>

            {/* reset button */}
            <button
               ref={resetRef}
               className={styles.resetBtn}
               onClick={() => handleChangeParameter('reset')}
            >
               Reset
            </button>

            <UserBlock />
         </div>
      </div>
   )
}

export default Sidebar

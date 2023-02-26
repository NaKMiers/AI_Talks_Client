import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GroupByName } from '../../data/modelData'
import Themes from '../Themes'
import UserBlock from '../UserBlock'
import styles from './sidebar.module.scss'
import parameterAction from '../../action/parameterAction'
import { useRef } from 'react'

function Sidebar({ showSidebar, setShowSidebar }) {
   const dispath = useDispatch()
   const { model, maxTokens, temperature, amount, size, mode, modeChanged } = useSelector(
      state => state.parameterReducer
   )

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

   const handleChangeParameter = (type, value) => {
      switch (type) {
         case 'model': {
            dispath(parameterAction.changeModel(value))
            break
         }
         case 'maxTokens': {
            dispath(parameterAction.changeMaxTokens(value))
            break
         }
         case 'temperature': {
            dispath(parameterAction.changeTemperature(value))
            break
         }
         case 'size': {
            console.log(value)
            dispath(parameterAction.changeSize(fixedSize[value]))
            break
         }
         case 'amount': {
            dispath(parameterAction.changeAmount(value))
            break
         }
         case 'mode': {
            dispath(parameterAction.changeMode(value))
            break
         }
         case 'reset': {
            dispath(parameterAction.reset())
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

   const handleChangeModeTo0 = () => {
      // hide reset button
      resetRef.current.classList.add(styles.hide)

      // hide models
      modelLabelRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         modelLabelRef.current.classList.remove(styles.mode0)
         modelLabelRef.current.style.opacity = 0
      }, 390) // 400ms delay: 0

      modelInputRef.current.classList.add(styles.mode0)
      groupByRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         modelInputRef.current.classList.remove(styles.mode0)
         modelInputRef.current.style.opacity = 0
         groupByRef.current.classList.remove(styles.mode0)
         groupByRef.current.style.opacity = 0
      }, 490) // 500ms delay: 0

      // // hide maxTokens, temperature
      maxTokenLabelRef.current.classList.add(styles.mode0)
      tempLabelRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         maxTokenLabelRef.current.classList.remove(styles.mode0)
         maxTokenLabelRef.current.style.opacity = 0
         tempLabelRef.current.classList.remove(styles.mode0)
         tempLabelRef.current.style.opacity = 0
      }, 890) // 400ms delay: models = 500ms

      maxTokenInputRef.current.classList.add(styles.mode0)
      tempInputRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         maxTokenInputRef.current.classList.remove(styles.mode0)
         maxTokenInputRef.current.style.opacity = 0
         tempInputRef.current.classList.remove(styles.mode0)
         tempInputRef.current.style.opacity = 0
      }, 990) // 500ms delay: models = 500ms

      // // hide themes
      themeLabelRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         themeLabelRef.current.classList.remove(styles.mode0)
         themeLabelRef.current.style.opacity = 0
      }, 1390) // 400ms delay: models + maxTokens = 500 + 500 = 1000ms

      // All none
      setTimeout(() => {
         modelLabelRef.current.style.display = 'none'
         modelInputRef.current.style.display = 'none'
         groupByRef.current.style.display = 'none'
         maxTokenLabelRef.current.style.display = 'none'
         tempLabelRef.current.style.display = 'none'
         maxTokenInputRef.current.style.display = 'none'
         tempInputRef.current.style.display = 'none'
         themeLabelRef.current.style.display = 'none'
      }, 1490) // 0ms delay: models + maxTokens + themes = 500 + 500 + 500 = 1500ms

      // // --------------

      // All display
      setTimeout(() => {
         amountLabelRef.current.style.display = 'block'
         sizeLabelRef.current.style.display = 'block'
         amountInputRef.current.style.display = 'flex'
         sizeInputRef.current.style.display = 'flex'
      }, 0) // 0ms delay: 0

      // // show amount, size
      amountLabelRef.current.classList.add(styles.mode0)
      sizeLabelRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         amountLabelRef.current.classList.remove(styles.mode0)
         amountLabelRef.current.style.opacity = 1
         sizeLabelRef.current.classList.remove(styles.mode0)
         sizeLabelRef.current.style.opacity = 1
      }, 1890) // 400ms delay: models + maxTokens + themes = 500 + 500 + 500 = 1500ms

      amountInputRef.current.classList.add(styles.mode0)
      sizeInputRef.current.classList.add(styles.mode0)
      setTimeout(() => {
         amountInputRef.current.classList.remove(styles.mode0)
         amountInputRef.current.style.opacity = 1
         sizeInputRef.current.classList.remove(styles.mode0)
         sizeInputRef.current.style.opacity = 1
      }, 1990) // 500ms delay: models + maxTokens + themes = 500 + 500 + 500 = 1500ms

      // show reset button
      resetRef.current.classList.remove(styles.hide)
   }

   const handleChangeModeTo1 = () => {
      // hide reset button
      resetRef.current.classList.add(styles.hide)

      // hide amount, size
      amountLabelRef.current.classList.add(styles.mode1)
      sizeLabelRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         amountLabelRef.current.classList.remove(styles.mode1)
         amountLabelRef.current.style.opacity = 0
         sizeLabelRef.current.classList.remove(styles.mode1)
         sizeLabelRef.current.style.opacity = 0
      }, 390) // 400ms delay: 0ms

      amountInputRef.current.classList.add(styles.mode1)
      sizeInputRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         amountInputRef.current.classList.remove(styles.mode1)
         amountInputRef.current.style.opacity = 0
         sizeInputRef.current.classList.remove(styles.mode1)
         sizeInputRef.current.style.opacity = 0
      }, 490) // 500ms delay: 0ms

      // All none
      setTimeout(() => {
         amountLabelRef.current.style.display = 'none'
         sizeLabelRef.current.style.display = 'none'
         amountInputRef.current.style.display = 'none'
         sizeInputRef.current.style.display = 'none'
      }, 490) // 0ms delay: amount = 500ms

      // --------------

      // All display
      setTimeout(() => {
         modelLabelRef.current.style.display = 'block'
         modelInputRef.current.style.display = 'flex'
         groupByRef.current.style.display = 'flex'
         maxTokenLabelRef.current.style.display = 'block'
         maxTokenInputRef.current.style.display = 'flex'
         tempLabelRef.current.style.display = 'block'
         tempInputRef.current.style.display = 'flex'
         themeLabelRef.current.style.display = 'block'
      }, 0) // 0ms delay: 0

      // show models
      modelLabelRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         modelLabelRef.current.classList.remove(styles.mode1)
         modelLabelRef.current.style.opacity = 1
      }, 890) // 400ms delay: amount = 500ms

      modelInputRef.current.classList.add(styles.mode1)
      groupByRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         modelInputRef.current.classList.remove(styles.mode1)
         modelInputRef.current.style.opacity = 1
         groupByRef.current.classList.remove(styles.mode1)
         groupByRef.current.style.opacity = 1
      }, 990) // 500ms delay: amount = 500ms

      // show maxTokens, temperature
      maxTokenLabelRef.current.classList.add(styles.mode1)
      tempLabelRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         maxTokenLabelRef.current.classList.remove(styles.mode1)
         maxTokenLabelRef.current.style.opacity = 1
         tempLabelRef.current.classList.remove(styles.mode1)
         tempLabelRef.current.style.opacity = 1
      }, 1390) // 400ms delay: amount + models = 500 + 500 = 1000ms

      maxTokenInputRef.current.classList.add(styles.mode1)
      tempInputRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         maxTokenInputRef.current.classList.remove(styles.mode1)
         maxTokenInputRef.current.style.opacity = 1
         tempInputRef.current.classList.remove(styles.mode1)
         tempInputRef.current.style.opacity = 1
      }, 1490) // 500ms delay: amount + models = 500 + 500 = 1000ms

      // show themes
      themeLabelRef.current.classList.add(styles.mode1)
      setTimeout(() => {
         themeLabelRef.current.classList.remove(styles.mode1)
         themeLabelRef.current.style.opacity = 1
      }, 1890) // 400ms delay: amount + models + maxTokens = 500 + 500 + 500 = 1500ms

      // show reset button
      resetRef.current.classList.remove(styles.hide)
   }

   useEffect(() => {
      modeChanged && mode === 0 && handleChangeModeTo0()
      modeChanged && mode === 1 && handleChangeModeTo1()
   }, [mode, modeChanged])

   useEffect(() => {
      if (!modeChanged && mode === 0) {
         amountLabelRef.current.style.opacity = 1
         amountInputRef.current.style.opacity = 1
         sizeLabelRef.current.style.opacity = 1
         sizeInputRef.current.style.opacity = 1

         // amountLabelRef.current.style.display = 'block'
         // amountInputRef.current.style.display = 'flex'
         // sizeLabelRef.current.style.display = 'block'
         // sizeInputRef.current.style.display = 'flex'
      }
      if (!modeChanged && mode === 1) {
         modelLabelRef.current.style.opacity = 1
         modelInputRef.current.style.opacity = 1
         groupByRef.current.style.opacity = 1
         maxTokenLabelRef.current.style.opacity = 1
         maxTokenInputRef.current.style.opacity = 1
         tempLabelRef.current.style.opacity = 1
         tempInputRef.current.style.opacity = 1
         themeLabelRef.current.style.opacity = 1

         // modelLabelRef.current.style.display = 'block'
         // modelInputRef.current.style.display = 'flex'
         // groupByRef.current.style.display = 'flex'
         // maxTokenLabelRef.current.style.display = 'block'
         // maxTokenInputRef.current.style.display = 'flex'
         // tempLabelRef.current.style.display = 'block'
         // tempInputRef.current.style.display = 'flex'
         // themeLabelRef.current.style.display = 'block'
      }
   }, [modeChanged, mode])

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
                        fixedSize.indexOf(size) > 0 ? fixedSize.indexOf(size) - 1 : 2
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
                        fixedSize.indexOf(size) < 2 ? fixedSize.indexOf(size) + 1 : 0
                     )
                  }
               >
                  <i className='fa-solid fa-plus' />
               </button>
            </div>

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

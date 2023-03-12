import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parameterAction from '../../action/parameterAction'
import userAction from '../../action/userAction'
import userApi from '../../apis/userApi'
import { GroupByName, GroupByFunction } from '../../data/modelData'
import Themes from '../Themes'
import UserBlock from '../UserBlock'
import styles from './sidebar.module.scss'

function Sidebar({ showSidebar, setShowSidebar }) {
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const {
      model: initModel,
      maxTokens: initMaxTokens,
      temperature: initTemp,
      amount: initAmount,
      size: initSize,
      mode,
      modeChanged,
   } = user || parameters

   const [showOptions, setShowOptions] = useState(false)
   const [showGroupBy, setShowGroupBy] = useState(false)

   const [model, setModel] = useState(initModel)
   const [maxTokens, setMaxTokens] = useState(initMaxTokens)
   const [temperature, setTemperature] = useState(initTemp)
   const [amount, setAmount] = useState(initAmount)
   const [size, setSize] = useState(initSize)

   const [groupBy, setGroupBy] = useState('name')
   const [reseting, setReseting] = useState(false)
   const [saving, setSaving] = useState(false)
   const [isChanged, setIsChanged] = useState(false)
   const fixedSize = ['256x256', '512x512', '1024x1024']
   console.log('isChanged: ', isChanged)

   // DOM REF
   const buttonWrapRef = useRef(null)
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
         buttonWrapRef.current.style.opacity = 0
         if (mode === 1) {
            paramsMode0.forEach(item => (item.ref.current.style.opacity = 0))
            setTimeout(() => {
               paramsMode0.forEach(item => (item.ref.current.style.display = 'none'))
               paramsMode1.forEach(item => (item.ref.current.style.display = item.display))
            }, 490) // time = transition = 500ms

            // ----

            setTimeout(() => {
               paramsMode1.forEach(item => (item.ref.current.style.opacity = 1))
               buttonWrapRef.current.style.opacity = 1
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
               buttonWrapRef.current.style.opacity = 1
            }, 990) // time = display + transition = 500 + 500 = 1000ms
         }
      }
   }, [mode, modeChanged, paramsMode0, paramsMode1])

   // check parameter is changed anything or not
   useEffect(() => {
      setIsChanged(
         model !== initModel ||
            maxTokens !== initMaxTokens ||
            temperature !== initTemp ||
            amount !== initAmount ||
            size !== initSize
      )
   }, [
      isChanged,
      model,
      initModel,
      maxTokens,
      initMaxTokens,
      temperature,
      initTemp,
      amount,
      initAmount,
      size,
      initSize,
   ])

   // handle save and reset parameters (except theme)
   const handleChangeParameter = useCallback(
      async type => {
         let newState = user
            ? { ...user, model, maxTokens, temperature, amount, size }
            : { ...parameters, model, maxTokens, temperature, amount, size }

         const resetAllState = () => {
            setModel(initModel)
            setMaxTokens(initMaxTokens)
            setTemperature(initTemp)
            setAmount(initAmount)
            setSize(initSize)
            setReseting(false)
         }

         if (type === 'save') {
            setSaving(true)
            if (user) {
               try {
                  const res = await userApi.changeParameter(user._id, newState)
                  console.log('res: ', res.data)
                  setTimeout(() => {
                     dispatch(userAction.changeParameter(res.data))
                     setSaving(false)
                  }, 1000)
               } catch (err) {
                  console.log(err)
                  setSaving(false)
               }
            } else {
               setTimeout(() => {
                  dispatch(parameterAction.changeParameter(newState))
                  setSaving(false)
               }, 1200)
            }
         } else if (type === 'reset') {
            setReseting(true)
            let resetObject = null
            if (mode === 1) {
               resetObject = {
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
                  setTimeout(() => {
                     dispatch(userAction.changeParameter(res.data))
                     resetAllState()
                  }, 1000)
               } catch (err) {
                  console.log(err)
                  resetAllState()
               }
            } else {
               setTimeout(() => {
                  dispatch(parameterAction.changeParameter(newState))
                  resetAllState()
               }, 1200)
            }
         }
      },
      [
         model,
         maxTokens,
         temperature,
         amount,
         size,
         initAmount,
         initMaxTokens,
         initModel,
         initSize,
         initTemp,
         mode,
         parameters,
         dispatch,
         user,
      ]
   )

   // render model option sorted by name and function from model data
   const renderModelOption = useCallback(() => {
      let models = []

      switch (groupBy) {
         case 'name':
            models = GroupByName
            break
         case 'function':
            models = GroupByFunction
            break
         default:
            return
      }

      return models.map(model => (
         <div key={model.name} className={styles.optGroup}>
            <p>{model.name}</p>
            {model.data.map((data, i) => (
               <div
                  key={i}
                  className={styles.options}
                  onClick={() => {
                     setModel(data)
                     setShowOptions(false)
                  }}
               >
                  {data}
               </div>
            ))}
         </div>
      ))
   }, [groupBy])

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
            <div
               ref={modelInputRef}
               size={1}
               className={styles.selectModel}
               onClick={() => setShowOptions(!showOptions)}
               name='model'
               id='model'
            >
               <span>{model}</span>
               <button className={`${styles.showOptionBtn} ${showOptions ? styles.show : ''}`}>
                  <i className='fa-solid fa-angle-down' />
               </button>
               <div className={`${styles.optionWrap} ${showOptions ? styles.show : ''}`}>
                  {renderModelOption()}
               </div>
            </div>
            <div ref={groupByRef} className={styles.groupByWrap}>
               <i>Group by: </i>
               <div className={styles.selectGroupBy} onClick={() => setShowGroupBy(!showGroupBy)}>
                  <p>{groupBy}</p>
                  <div className={`${styles.groupByOptWrap} ${showGroupBy ? styles.show : ''}`}>
                     <div onClick={() => setGroupBy('name')} className={styles.groupByOpts}>
                        name
                     </div>
                     <div onClick={() => setGroupBy('function')} className={styles.groupByOpts}>
                        function
                     </div>
                  </div>
               </div>
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
                  onClick={() => setMaxTokens(maxTokens > 50 ? maxTokens - 50 : maxTokens)}
               >
                  <i className='fa-solid fa-minus' />
               </button>
               <input
                  type='number'
                  max='1500'
                  min='1'
                  className={styles.maxTokenInput}
                  value={maxTokens}
                  onChange={e => setMaxTokens(e.target.value ? e.target.value : 50)}
               />
               <button
                  className={styles.maxTokenBtn}
                  onClick={() => setMaxTokens(maxTokens < 1500 ? maxTokens + 50 : maxTokens)}
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
                  onChange={e => setTemperature(Math.floor(e.target.value / 10) / 10)}
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
                  onClick={() => setAmount(amount > 1 ? amount - 1 : amount)}
               >
                  <i className='fa-solid fa-minus' />
               </button>
               <div className={styles.amountValue}>{amount}</div>
               <button
                  className={styles.amountBtn}
                  onClick={() => setAmount(amount < 10 ? amount + 1 : amount)}
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
                     setSize(
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
                     setSize(
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
            <div ref={buttonWrapRef} className={styles.buttonWrap}>
               <button
                  className={`${styles.sidebarBtn} ${styles.reset} ${reseting ? styles.loading : ''}`}
                  onClick={() => handleChangeParameter('reset')}
               >
                  {reseting ? (
                     <img className={styles.loading} src='assets/spin.gif' alt='loading' />
                  ) : (
                     'Reset'
                  )}
               </button>
               <button
                  className={`${styles.sidebarBtn} ${styles.save} ${saving ? styles.loading : ''} ${
                     isChanged ? styles.active : ''
                  }`}
                  onClick={() => handleChangeParameter('save')}
               >
                  {saving ? (
                     <img className={styles.loading} src='assets/spin.gif' alt='loading' />
                  ) : (
                     'Save'
                  )}
               </button>
            </div>

            <UserBlock />
         </div>
      </div>
   )
}

export default memo(Sidebar)

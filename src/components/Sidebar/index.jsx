import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GroupByName } from '../../data/modelData'
import Themes from '../Themes'
import UserBlock from '../UserBlock'
import styles from './sidebar.module.scss'
import parameterAction from '../../action/parameterAction'

function Sidebar({ showSidebar, setShowSidebar }) {
   const dispath = useDispatch()
   const { model, maxTokens, temperature, amount, size, mode } = useSelector(
      state => state.parameterReducer
   )

   const [groupBy, setGroupBy] = useState('name')
   const fixedSize = ['256x256', '512x512', '1024x1024']

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

   const handleChangeMode = () => {}

   return (
      <div className={`${styles.sidebar} ${showSidebar && styles.active}`}>
         <button className={styles.closeBtn} onClick={() => setShowSidebar(false)}>
            <i className='fa-solid fa-xmark' />
         </button>
         <h2 className={styles.title}>AI TALKS</h2>

         <div className={styles.sidebarBody}>
            {/* Models */}
            <label className={styles.label} htmlFor='model'>
               Select Models:
            </label>
            <select
               value={model}
               onChange={e => handleChangeParameter('model', e.target.value)}
               size={1}
               className={styles.selectModel}
               name='model'
               id='model'
            >
               {renderModelOption()}
            </select>
            <div className={styles.groupByWrap}>
               <i>Group by: </i>
               <select onChange={e => setGroupBy(e.target.value)} value={groupBy} name='groupby'>
                  <option value='name'>Name</option>
                  <option value='function'>Function</option>
               </select>
            </div>

            {/* Max Tokens */}
            <label className={styles.label} htmlFor='maxTokens'>
               Max Tokens:
            </label>
            <div className={styles.maxTokenWrap}>
               <button
                  className={styles.maxTokenBtn}
                  // onClick={() => setMaxToken(maxToken > 50 ? maxToken - 50 : maxToken)}
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
            <label className={styles.label} htmlFor='temperature'>
               Temperature:
            </label>
            <div className={styles.temperatureWrap}>
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
            {/* <label className={styles.label} htmlFor='models'>
               Select Themes:
            </label>
            <Themes /> */}

            {/* Amount */}
            <label className={styles.label} htmlFor='amount'>
               Amount:
            </label>
            <div className={styles.amountWrap}>
               <button
                  className={styles.amountBtn}
                  onClick={() => handleChangeParameter('amount', amount > 1 ? amount - 1 : amount)}
               >
                  <i className='fa-solid fa-minus' />
               </button>
               <div className={styles.amount}>{amount}</div>
               <button
                  className={styles.amountBtn}
                  onClick={() => handleChangeParameter('amount', amount < 10 ? amount + 1 : amount)}
               >
                  <i className='fa-solid fa-plus' />
               </button>
            </div>

            {/* Size */}
            <label className={styles.label} htmlFor='size'>
               Size:
            </label>
            <div className={styles.amountWrap}>
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
               <div className={styles.amount}>{size}</div>
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

            <button className={styles.resetBtn} onClick={() => handleChangeParameter('reset')}>
               Reset
            </button>

            <UserBlock />
         </div>
      </div>
   )
}

export default Sidebar

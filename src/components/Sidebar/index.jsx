import React, { useState } from 'react'
import { GroupByName } from '../../data/modelData'
import themeData from '../../data/themeData'
import SampleTheme from '../SampleTheme'
import UserBlock from '../UserBlock'
import styles from './sidebar.module.scss'

function Sidebar({ showSidebar, setShowSidebar }) {
   const [groupBy, setGroupBy] = useState('name')
   const [model, setModel] = useState(GroupByName[0].data[0])
   const [maxToken, setMaxToken] = useState(100)
   const [temperature, setTemperature] = useState(500)
   const [changing, setChanging] = useState(false)

   console.log('changing: ', changing)

   const [amount, setAmount] = useState(1)
   const fixedSize = ['256x256', '512x512', '1024x1024']
   const [size, setSize] = useState(0)

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
            <label className={styles.label} htmlFor='models'>
               Select Models:
            </label>
            <select
               onChange={e => setModel(e.target.value)}
               value={model}
               size={1}
               className={styles.selectModel}
               name='models'
               id='models'
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
            <label className={styles.label} htmlFor='max-token'>
               Max Tokens:
            </label>
            <div className={styles.maxTokenWrap}>
               <button
                  className={styles.maxTokenBtn}
                  onClick={() => setMaxToken(maxToken > 50 ? maxToken - 50 : maxToken)}
               >
                  <i className='fa-solid fa-minus' />
               </button>
               <input
                  type='number'
                  max='1500'
                  min='1'
                  className={styles.maxTokenInput}
                  value={maxToken}
                  onChange={e => setMaxToken(e.target.value ? e.target.value : 50)}
               />
               <button
                  className={styles.maxTokenBtn}
                  onClick={() => setMaxToken(maxToken < 1500 ? maxToken + 50 : maxToken)}
               >
                  <i className='fa-solid fa-plus' />
               </button>
            </div>

            {/* Temperature */}
            <label className={styles.label} htmlFor='max-token'>
               Temperature:
            </label>
            <div className={styles.temperatureWrap}>
               <input
                  className={styles.temperatureInput}
                  type='range'
                  min='0'
                  max='1000'
                  value={temperature}
                  onChange={e => setTemperature(e.target.value)}
                  id='myRange'
               />
               <span className={styles.temperature}>{Math.round(temperature / 100) / 10}</span>
            </div>

            {/* Themes */}
            <label className={styles.label} htmlFor='models'>
               Select Themes:
            </label>
            <div className={styles.themeWrap}>
               {themeData.map(data => (
                  <SampleTheme
                     key={data.label}
                     data={data}
                     changing={changing}
                     setChanging={setChanging}
                  />
               ))}
            </div>

            {/* Amount */}
            {/* <label className={styles.label} htmlFor='amount'>
               Amount:
            </label>
            <div className={styles.amountWrap}>
               <button
                  className={styles.amountBtn}
                  onClick={() => setAmount(amount > 1 ? amount - 1 : amount)}
               >
                  <i className='fa-solid fa-minus' />
               </button>
               <div className={styles.amount}>{amount}</div>
               <button
                  className={styles.amountBtn}
                  onClick={() => setAmount(amount < 10 ? amount + 1 : amount)}
               >
                  <i className='fa-solid fa-plus' />
               </button>
            </div> */}

            {/* Size */}
            {/* <label className={styles.label} htmlFor='size'>
               Size:
            </label>
            <div className={styles.amountWrap}>
               <button className={styles.amountBtn} onClick={() => setSize(size > 0 ? size - 1 : 2)}>
                  <i className='fa-solid fa-minus' />
               </button>
               <div className={styles.amount}>{fixedSize[size]}</div>
               <button className={styles.amountBtn} onClick={() => setSize(size < 2 ? size + 1 : 0)}>
                  <i className='fa-solid fa-plus' />
               </button>
            </div> */}

            <UserBlock />
         </div>
      </div>
   )
}

export default Sidebar

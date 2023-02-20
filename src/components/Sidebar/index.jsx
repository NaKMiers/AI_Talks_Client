import React, { useState } from 'react'
import styles from './sidebar.module.scss'

const themeData = [
   {
      bg: 'linear-gradient(to right, #cb2d3e, #ef473a)',
      text: '#fff',
      label: 'Label 1',
   },
   {
      bg: 'linear-gradient(to bottom, #f3904f, #3b4371)',
      text: '#fff',
      label: 'Label 2',
   },
   {
      bg: 'linear-gradient(to right, #603813, #b29f94)',
      text: '#fff',
      label: 'Label 3',
   },
   {
      bg: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
      text: '#fff',
      label: 'Label 4',
   },
   {
      bg: 'linear-gradient(to bottom, #e6e9f0, #eef1f5)',
      text: '#333',
      label: 'Label 5',
   },
   {
      bg: 'linear-gradient(to right, #ff8008, #ffc837)',
      text: '#333',
      label: 'Label 6',
   },
   {
      bg: 'linear-gradient(to bottom, #7028e4, #e5b2ca)',
      text: '#fff',
      label: 'Label 7',
   },
   {
      bg: 'linear-gradient(to bottom, #bdc3c7, #2c3e50)',
      text: '#fff',
      label: 'Label 8',
   },
   {
      bg: 'linear-gradient(to right, #f6d365, #fda085)',
      text: '#333',
      label: 'Label 9',
   },
   {
      bg: 'linear-gradient(to right, #B8D8BA, #7D9A91)',
      text: '#333',
      label: 'Label 10',
   },
]

function Sidebar() {
   const [collapseUser, setCollapseUser] = useState(false)

   return (
      <div className={styles.sidebar}>
         <button className={styles.closeBtn}>
            <i class='fa-solid fa-xmark' />
         </button>
         <h2 className={styles.title}>AI TALKS</h2>

         <div className={styles.sidebarBody}>
            <label className={styles.label} htmlFor='models'>
               Select Models
            </label>
            <select className={styles.selectModel} name='models' id='models'>
               <option value='1'>Models 1</option>
               <option value='2'>Models 2</option>
               <option value='3'>Models 3</option>
            </select>

            <label className={styles.label} htmlFor='models'>
               Select Theme
            </label>
            <div className={styles.themeWrap}>
               {themeData.map((data, i) => (
                  <div
                     key={i}
                     className={styles.sampleTheme}
                     style={{ background: data.bg, color: data.text }}
                  >
                     <span>{data.label}</span>
                  </div>
               ))}
            </div>

            <div className={styles.userBlock}>
               <div className={styles.userWrap}>
                  <img className={styles.avatar} src='https://bom.so/wJUam1' alt='avt' />
                  <span>nakmiers</span>
                  <button
                     onClick={() => setCollapseUser(!collapseUser)}
                     className={`${styles.collapseBtn} ${collapseUser && styles.active}`}
                  >
                     <i class='fa-solid fa-chevron-down' />
                  </button>
               </div>
               <div className={`${styles.collapseUserContent} ${collapseUser && styles.active}`}>
                  <div>
                     <i class='fa-solid fa-gear'></i> Setting
                  </div>
                  <div>
                     <i class='fa-solid fa-arrow-right-from-bracket'></i> Logout
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Sidebar

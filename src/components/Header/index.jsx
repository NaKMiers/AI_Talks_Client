import '@fortawesome/fontawesome-free/css/all.min.css'
import React from 'react'
import styles from './header.module.scss'

function Header() {
   return (
      <div className={styles.header}>
         <div className={styles.menuBtn}>
            <button>
               <i className='fa-solid fa-bars'></i>
            </button>
         </div>
         AI TALKS
         <div className={styles.switchBtn}>
            <button>Image</button>
         </div>
      </div>
   )
}

export default Header

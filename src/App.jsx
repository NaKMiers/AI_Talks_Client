import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useState } from 'react'
import styles from './App.module.scss'
import ChatBody from './components/ChatBody'
import Header from './components/Header'
import Input from './components/Input'
import Sidebar from './components/Sidebar'

function App() {
   const [showSidebar, setShowSidebar] = useState(false)

   return (
      <div className={styles.app}>
         <div className={styles.gradient1} />
         <div className={styles.gradient2} />
         <div className={styles.gradient3} />
         <div className={styles.gradient4} />

         <Header setShowSidebar={setShowSidebar} />

         <ChatBody />

         <Input />

         <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
   )
}

export default App

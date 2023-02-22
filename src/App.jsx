import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './App.module.scss'
import ChatBody from './components/ChatBody'
import Header from './components/Header'
import Input from './components/Input'
import Sidebar from './components/Sidebar'
import themeData from './data/themeData'

function App() {
   const { user } = useSelector(state => state.userReducer)
   const [showSidebar, setShowSidebar] = useState(false)

   const theme = themeData[10]

   return (
      <div className={styles.app}>
         <div className={styles.gradient1} style={{ background: theme.set[0] }} />
         <div className={styles.gradient2} style={{ background: theme.set[1] }} />
         <div className={styles.gradient3} style={{ background: theme.set[2] }} />
         <div className={styles.gradient4} style={{ background: theme.set[3] }} />

         <Header setShowSidebar={setShowSidebar} />

         <ChatBody />

         <Input />

         <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
   )
}

export default App

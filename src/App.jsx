import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parameterAction from './action/parameterAction'
import userAction from './action/userAction'
import userApi from './apis/userApi'
import styles from './App.module.scss'
import ChatBody from './components/ChatBody'
import Header from './components/Header'
import Input from './components/Input'
import Sidebar from './components/Sidebar'
import themeData from './data/themeData'

function App() {
   const dispatch = useDispatch()
   const user = useSelector(state => state.userReducer.user)
   const parameters = useSelector(state => state.parameterReducer)
   const { theme } = user || parameters
   const [showSidebar, setShowSidebar] = useState(false)

   const themeObj = themeData[theme]

   useEffect(() => {
      const getUserData = async () => {
         try {
            const res = await userApi.getUserData(user._id)
            dispatch(userAction.setUserData(res.data))
         } catch (err) {
            console.log(err)
         }
      }

      if (user?._id) {
         dispatch(userAction.resetModeChanged())
         getUserData()
      } else {
         dispatch(parameterAction.resetModeChanged())
      }
   }, [user?._id, dispatch])

   return (
      <div
         className={styles.app}
         style={{
            '--theme-background': themeObj.background,
            '--sidebar-bgr': themeObj.appSidebarBackground,
            '--app-bgr': themeObj.appBackground,
            '--app-btn-bgr': themeObj.appBtnBackground,
            '--app-text1': themeObj.appText1,
            '--app-text2': themeObj.appText2,
         }}
      >
         <div className={styles.gradient1} style={{ background: themeObj.set[0] }} />
         <div className={styles.gradient2} style={{ background: themeObj.set[1] }} />
         <div className={styles.gradient3} style={{ background: themeObj.set[2] }} />
         <div className={styles.gradient4} style={{ background: themeObj.set[3] }} />

         <Header setShowSidebar={setShowSidebar} />

         <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

         <ChatBody />

         <Input />
      </div>
   )
}

export default App

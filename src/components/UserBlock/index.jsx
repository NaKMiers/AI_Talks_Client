import React, { useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userAction from '../../action/userAction'
import userApi from '../../apis/userApi'
import AuthModal from '../AuthModal'
import styles from './userBlock.module.scss'

function UserBlock() {
   const { user } = useSelector(state => state.userReducer)
   const dispatch = useDispatch()

   const [collapseUser, setCollapseUser] = useState(false)
   const [openAuthModal, setOpenAuthModal] = useState(false)
   const [error, setError] = useState('')
   const fileRef = useRef()
   const SERVER_FOLDER = process.env.REACT_APP_SERVER_IMAGES

   const handleLogout = async () => {
      dispatch(userAction.logout())
   }

   const handleChangeAvatar = async e => {
      const file = e.target.files[0]
      console.log(file)
      if (!file.type.startsWith('image')) {
         setError('This is not an image.')
         return
      }
      if (file.size > 1024 * 1024) {
         setError('Max size is 1mb.')
         return
      }

      const data = new FormData()
      data.append('name', Date.now() + file.name)
      data.append('file', file)

      try {
         const res = await userApi.changeAvatar(user._id, data)
         dispatch(userAction.changeAvatar(res.data))
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className={styles.userBlock}>
         {user ? (
            <>
               <div className={styles.userWrap}>
                  <div className={styles.avatarWrap}>
                     <img
                        className={styles.avatar}
                        src={user.avatar ? SERVER_FOLDER + user.avatar : 'assets/avatar.png'}
                        alt='avt'
                     />
                     <button
                        className={styles.avatarBtn}
                        onClick={() => {
                           fileRef.current.click()
                           setError('')
                        }}
                     >
                        <i className='fa-solid fa-camera' />
                     </button>
                     <input onChange={handleChangeAvatar} ref={fileRef} type='file' name='avatar' />
                  </div>
                  <span>{user.username}</span>
                  <button
                     onClick={() => setCollapseUser(!collapseUser)}
                     className={`${styles.collapseBtn} ${collapseUser && styles.active}`}
                  >
                     <i className='fa-solid fa-chevron-down' />
                  </button>
                  <span className={styles.error}>{error && '*' + error}</span>
               </div>
               <div className={`${styles.collapseUserContent} ${collapseUser && styles.active}`}>
                  <div>
                     <i className='fa-solid fa-gear' /> Setting
                  </div>
                  <div onClick={handleLogout}>
                     <i className='fa-solid fa-arrow-right-from-bracket' /> Logout
                  </div>
               </div>
            </>
         ) : (
            <>
               <button className={styles.loginBtn} onClick={() => setOpenAuthModal(!openAuthModal)}>
                  Login
               </button>
               <AuthModal open={openAuthModal} setOpen={setOpenAuthModal} />
            </>
         )}
      </div>
   )
}

export default UserBlock

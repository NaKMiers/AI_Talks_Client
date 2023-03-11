import React, { useCallback, useRef, useState } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import userAction from '../../action/userAction'
import userApi from '../../apis/userApi'
import styles from './authModal.module.scss'

function AuthModal({ open, setOpen }) {
   const [isSignUp, setSignUp] = useState(false)
   const [showPass, setShowPass] = useState(false)
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [errors, setErrors] = useState({ password: '', username: '' })

   const modalRef = useRef(null)
   const modalContentRef = useRef(null)

   const dispatch = useDispatch()

   // close modal on click outside and after login-signup
   const closeModal = useCallback(() => {
      modalRef.current.classList.add(styles.close)
      setTimeout(() => {
         modalRef.current.classList.remove(styles.close)
         modalRef.current.style.display = 'none'
         setOpen(false)
      }, 299)
   }, [setOpen])

   // reset errors when input value or submit successfull
   const handleResetErrors = useCallback(
      type => {
         setErrors({ ...errors, [type]: '' })
      },
      [errors]
   )

   // test password is strong or weak
   const testData = useCallback(
      type => {
         if (type === 'password') {
            const passwordRegex =
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/])(?=.{6,})/
            return passwordRegex.test(password.trim())
         }
         if (type === 'username') {
            const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/
            return usernameRegex.test(username.trim())
         }
         return false
      },
      [password, username]
   )

   const handleSubmit = useCallback(
      async e => {
         e.preventDefault()
         const data = { username, password }
         if (!username.trim()) setErrors(prev => ({ ...prev, username: 'Username is empty.' }))
         if (!password.trim()) setErrors(prev => ({ ...prev, password: 'Password is empty.' }))
         if (!username.trim() || !password.trim()) return

         try {
            if (isSignUp) {
               //  SIGN UP
               let isError = false
               if (!testData('username')) {
                  setErrors(prev => ({
                     ...prev,
                     username:
                        'Username must be start with a letter or "_" and length from 3 to 20 letters.',
                  }))
                  isError = true
               }
               if (!testData('password')) {
                  setErrors(prev => ({
                     ...prev,
                     password:
                        'Password must have a lower letter, a upper letter, a number, and length >= 6.',
                  }))
                  isError = true
               }
               if (isError) return
               const res = await userApi.register(data)
               dispatch(userAction.register(res.data))
            } else {
               // LOGIN
               const res = await userApi.login(data)
               dispatch(userAction.login(res.data))
            }

            setUsername('')
            setPassword('')
            closeModal()
         } catch (err) {
            const { error, message } = err.response.data
            setErrors({ ...errors, [error]: message })
            console.log(err.response.data)
         }
      },
      [username, password, isSignUp, errors, testData, dispatch, closeModal]
   )

   // close modal on click outside of modal body
   const handleClickOutside = useCallback(
      e => {
         if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            closeModal()
         }
      },
      [closeModal]
   )

   return (
      <div
         ref={modalRef}
         className={`${styles.authModal} ${open ? styles.open : ''}`}
         onClick={handleClickOutside}
      >
         <div ref={modalContentRef} className={styles.authWrap}>
            <h2 className={styles.heading}>{isSignUp ? 'Sign Up' : 'Login'}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
               <label className={styles.label} htmlFor='username'>
                  Username
               </label>
               <div className={styles.inputWrap}>
                  <input
                     className={styles.input}
                     type='text'
                     id='username'
                     placeholder='Type your username'
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                     onFocus={() => handleResetErrors('username')}
                  />
                  <i className={`${styles.icon} fa-regular fa-user`} />
               </div>
               <span className={styles.error}>{errors.username}</span>

               <label className={styles.label} htmlFor='password'>
                  Password
               </label>
               <div className={styles.inputWrap}>
                  <input
                     className={styles.input}
                     type={showPass ? 'text' : 'password'}
                     id='password'
                     placeholder='Type your password'
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     onFocus={() => handleResetErrors('password')}
                  />
                  <i
                     className={`${styles.icon} fa-regular ${showPass ? 'fa-eye' : 'fa-eye-slash'}`}
                     style={{ cursor: 'pointer' }}
                     onClick={() => setShowPass(!showPass)}
                  />
               </div>
               <span className={styles.error}>{errors.password}</span>

               <span className={styles.forgotPass}>Forgot password?</span>

               <button className={styles.authBtn}>{isSignUp ? 'SIGN UP' : 'LOGIN'}</button>
            </form>

            {/* <p className={styles.subHeading}>{isSignUp ? 'Or Sign Up Using' : 'Or Login Using'}</p>
            <div className={styles.socialLoginWrap}>
               <img src='https://bom.so/kAoKm6' alt='facebook' />
               <img src='https://bom.so/0fwCWL' alt='google' />
            </div> */}

            <p className={styles.subHeading}>{isSignUp ? 'Or Login  Using' : 'Or Sign Up Using'}</p>
            <button className={styles.subBtn} onClick={() => setSignUp(!isSignUp)}>
               {isSignUp ? 'LOGIN' : 'SIGN UP'}
            </button>
         </div>
      </div>
   )
}

export default memo(AuthModal)

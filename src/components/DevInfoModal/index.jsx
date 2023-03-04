import React, { useCallback, useRef, useState } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import userAction from '../../action/userAction'
import userApi from '../../apis/userApi'
import RealTime from '../RealTime'
import styles from './DevInfoModal.module.scss'

function DevInfoModal({ open, setOpen }) {
   const dispatch = useDispatch()

   const [showTitle, setShowTitle] = useState(false)

   const modalRef = useRef(null)
   const modalContentRef = useRef(null)
   const jobTitleRef = useRef(null)

   // close modal on click outside and after login-signup
   const closeModal = useCallback(() => {
      modalRef.current.classList.add(styles.close)
      setTimeout(() => {
         modalRef.current.classList.remove(styles.close)
         modalRef.current.style.display = 'none'
         setOpen(false)
      }, 299)
   }, [setOpen])

   // close modal on click outside of modal body
   const handleClickOutside = useCallback(
      e => {
         if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            closeModal()
         }
      },
      [closeModal]
   )

   const handleShowJobTitle = useCallback(appear => {
      if (appear) {
         jobTitleRef.current.style.display = 'flex'
         jobTitleRef.current.classList.add(styles.appear)
         setTimeout(() => {
            jobTitleRef.current.classList.remove(styles.appear)
            setShowTitle(true)
         }, 1990) // animation = 2000ms
      } else {
         jobTitleRef.current.classList.add(styles.disappear)
         setTimeout(() => {
            jobTitleRef.current.style.display = 'none'
            jobTitleRef.current.classList.remove(styles.disappear)
            setShowTitle(false)
         }, 1690) // animation = 2000ms
      }
   }, [])

   return (
      <div
         ref={modalRef}
         className={`${styles.devInfoModal} ${open ? styles.open : ''}`}
         onClick={handleClickOutside}
      >
         <div ref={modalContentRef} className={styles.devInfoWrap}>
            <div className={styles.basicInfoWrap}>
               <div className={styles.avatarContainer}>
                  <div className={styles.avatarWrap}>
                     <img className={styles.avatar} src='assets/dev-avatar.png' alt='dev avatar' />
                     <button
                        onClick={() => handleShowJobTitle(!showTitle)}
                        className={showTitle ? styles.hide : ''}
                     >
                        {showTitle ? (
                           <i className='fa-regular fa-eye' />
                        ) : (
                           <i className='fa-regular fa-eye' />
                        )}
                     </button>
                  </div>
                  <div ref={jobTitleRef} className={styles.jobTitle}>
                     <h1>Full Stack</h1>
                     <h1>Developer</h1>
                  </div>
               </div>
               <div className={styles.information}>
                  <h3 className={styles.subHeading}>Infomation</h3>
                  <div className={styles.infoWrap}>
                     <p className={styles.info}>
                        <span>Name: </span> Nguyen Anh Khoa (Pi Pi)
                     </p>
                     <p className={styles.info}>
                        <span>Job: </span> Full Stack Developer
                     </p>
                     <p className={styles.info}>
                        <span>Country: </span> Vietnam -- local time (<RealTime />)
                     </p>
                     <p className={styles.info}>
                        <span>Email: </span>{' '}
                        <a href='mailto:diwas118151@gmail.com'>diwas118151@gmail.com</a>
                     </p>
                     <p className={styles.info}>
                        <span>WorkAt: </span>
                        <a
                           href='https://bom.so/VWnLIk'
                           target='_blank'
                           rel='noreferrer'
                           className={styles.companyLink}
                        >
                           Upwork
                        </a>
                        <span> and </span>
                        <a
                           href='https://bom.so/74DATE'
                           target='_blank'
                           rel='noreferrer'
                           className={styles.companyLink}
                        >
                           Fiver
                        </a>
                     </p>
                  </div>
               </div>
            </div>
            <div className={styles.introductionWrap}>
               <h1 className={styles.heading}>Introduction</h1>
               <div className={styles.introduction}>
                  <p>
                     I am a Full Stack Developer with expertise in React JS, Express JS, Node JS, and
                     MongoDB with over 3000 hours of code.
                  </p>
                  <br />
                  <p>
                     ⭐<strong>Things only I do for my clients:</strong>
                  </p>
                  <p className='mg-0'>
                     1️⃣ Great effort. I am willing to spend 80% of my day researching problems and
                     solutions to help you get the best product possible.
                  </p>
                  <p className='mg-0'>
                     2️⃣I am not the type to wait until the end of the shift to shut down the laptop.
                     Working extra hours to help my clients get what they are looking for is my
                     happiness.
                  </p>
                  <p className='mg-0'>
                     3️⃣ Sincere, attitude and creating good relationships with clients are the top
                     criteria in my work.
                  </p>
                  <p>
                     4️⃣ And I am willing to give you your money back if you are disappointed with my
                     results. For me, satisfactions are more important than money.
                  </p>
                  <br />
                  <p>
                     🤹
                     <strong>My Skills:</strong>
                  </p>

                  <p className='mg-0'>✅ React JS, React-Router, Redux-Saga, Redux Thunk</p>
                  <p className='mg-0'>✅ Builders (Elementor, Visual Composer, Beaver)</p>
                  <p className='mg-0'>✅ Theme Development (Material UI, Flat UI, Metro UI)</p>
                  <p className='mg-0'>✅ PSD to HTML / Bootstrap</p>
                  <p className='mg-0'>✅ Responsive Web Design, SEO, Page Speed ​​Optimization</p>
                  <p className='mg-0'>✅ Git (Github, Bitbucket, GitLab)</p>
                  <p className='mg-0'>✅ Web Servers (Epxress.js, Node.js, MongoDB, Template Engine)</p>
                  <p className='mg-0'>✅ Deployment (Heroku, Netlify, Firebase)</p>
                  <p>✅ Adobe Photoshop</p>
                  <br />
                  <p className='mg-0'>If you are interested in what I say then contact me.</p>
                  <p>I am ready to serve you.</p>
                  <br />
                  <p className='mg-0'>
                     Anh Khoa. <strong>Thanks!</strong> 🫡
                  </p>
               </div>

               <div className={styles.skillWrap}>
                  <h3 className={styles.subHeading}>Skills</h3>
                  <div className={styles.skillBox}>
                     <div>HTML</div>
                     <div>CSS</div>
                     <div>JS</div>
                     <div>Bootstrap</div>
                     <div>Material Design</div>
                     <div>NodeJS</div>
                     <div>Express JS</div>
                     <div>API</div>
                     <div>React</div>
                     <div>Redux</div>
                     <div>React Router</div>
                     <div>Redux Saga</div>
                     <div>SCSS</div>
                     <div>Responsive</div>
                     <div>MongoDB</div>
                     <div>Template Engine</div>
                     <div>Full Stack Development</div>
                     <div>Git</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default memo(DevInfoModal)

import moment from 'moment'
import { memo } from 'react'
import { useEffect, useState } from 'react'

function RealTime() {
   const [time, setTime] = useState()

   useEffect(() => {
      let interval
      const handleTime = () => {
         interval = setInterval(() => {
            const now = new Date()
            const options = { timeZone: 'Asia/Ho_Chi_Minh' }
            const time = now.toLocaleString('en-US', options)
            setTime(time)
         }, 1000)
      }
      handleTime()
      return () => {
         clearInterval(interval)
      }
   }, [])

   return (
      <>
         <span style={{ color: '#FFFFCC ' }}>{moment(time).format('hh')}</span>
         <span style={{ color: '#ADD8E6 ' }}>{moment(time).format(':mm')}</span>
         <span style={{ color: '#FFC0CB ' }}>{moment(time).format(':ss')}</span>
      </>
   )
}

export default memo(RealTime)

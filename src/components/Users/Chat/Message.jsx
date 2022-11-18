import React from 'react'
import Moment from 'react-moment';
import Styles from './_chat.module.css'

const Message = ({message, own }) => {
  console.log(message)
  return (
    <div className={own ? "message own" : "message"}>
       <div className={Styles.messageTop}>
         <p className={Styles.messageText}>
           {message.text}
         </p>
        </div> 
        <div className={Styles.messageBottom}>
        <Moment fromNow>{(message.createdAt)}</Moment>
        </div>
    </div>
  )
}

export default Message
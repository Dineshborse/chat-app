import React from 'react'
import "./styles/_messagerow.scss"
const MessageRow = (props) => {
    const { userInfo,messageData} = props;
    // console.log(userInfo.userName,messageData.senderId)

    return (
        <div className='message-container' style={{ 
            alignSelf: (userInfo.userEmail === messageData.senderId) ? "flex-end" : 'flex-start',
            backgroundColor: (userInfo.userEmail === messageData.senderId) ? "#8421f5" : '#b07deb' }}>
            <div className='message-container__message' >{messageData.message}</div>
            {/* <div className='message-container__userinfo'>{messageData.senderId}</div> */}
        </div>
    )
}

export default MessageRow
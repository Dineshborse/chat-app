import React, { useEffect, useRef, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import './styles/_conversationrow.scss'
const ConversationRow = (props) => {
    const { conversationData, userEmail, handleconversationClick, activeConversation } = props;
    // console.log(conversationData);
    const [otherUser, setOtherUser] = useState("");
    const ConversationContainerRef = useRef();
    useEffect(() => {
        conversationData.members.forEach(element => {
            if (element !== userEmail) {
                setOtherUser(element)
            }
        });
        if (activeConversation._id === conversationData._id) {
            // ConversationContainerRef.current.style={bac:"#8421f5"}
        }
    }, [])
    return (
        <div ref={ConversationContainerRef} onClick={() => { 
            handleconversationClick(conversationData) }}
            className='conversationrow-container' style={{ backgroundColor: (activeConversation._id !== conversationData._id)?"#ceb7e7":"#8421f5" }}>
            <div className='conversationrow-container__sender-image-div'>
                <PersonIcon />
            </div>
            <div>{otherUser}</div>
        </div>
    )
}

export default ConversationRow;
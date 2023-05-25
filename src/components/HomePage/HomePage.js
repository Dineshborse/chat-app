import React, { useEffect, useRef, useState } from 'react'
import "./HomePage.scss"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import NavMenu from '../NavMenu';
import SearchBar from '../SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ConversationRow from '../ConversationRow';
import MessageRow from '../MessageRow';
import { useDispatch, useSelector } from 'react-redux';
import { update } from "../../redux/userSlice";

function HomePage(props) {
  const user = useSelector((state) => state.user);
  const userDispatch = useDispatch();
  const userdetail = {
    name: "",
    email: "",
  }

  const { userCookie, setuserCookie, removeCookie } = props;
  const [userInfo, setUserInfo] = useState({ userName: "", userEmail: "" });
  const [senderInfo, setSenderInfo] = useState({ userName: "", userEmail: "" });
  const [userSearch, setUserSearch] = useState("");
  const [allConversations, setAllConversations] = useState([]);
  const [refreshdata, setRefreshData] = useState(false);
  const [activeConversation, setActiveConversation] = useState({});
  const [conversationMessages, setConversationMessages] = useState([]);

  const [currentMessage, setCurrentMessage] = useState("");

  const MessageInputElementRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    if (userCookie.token === "") {
      navigate("/login");
    }
    axios({
      url: "http://localhost:3006/user/userchat",
      method: "GET",
      headers: {
        authorization: userCookie.token
      }
    }).then((loginData) => {
      setUserInfo({ userName: loginData.data.userName, userEmail: loginData.data.userEmail })

      console.log(loginData.data)
      setAllConversations(loginData.data.conversationsData)
      if (loginData.data.conversationsData.length) { setActiveConversation(loginData.data.conversationsData[0]) }
    }).catch((err) => {
      window.alert(err.response.data.message)
      console.log(err);
    })

  }, [refreshdata]);

  const handleInputSearchClick = () => {
    console.log("handleInputSearchClick", userSearch);
    axios({
      url: "http://localhost:3006/user/new-conversation",
      method: "POST",
      headers: {
        authorization: userCookie.token
      },
      data: {
        user2ndPartyEmail: userSearch
      }
    }).then((loginData) => {

      console.log(loginData.data)
      setRefreshData((prev) => { return !prev })
    }).catch((err) => {
      // window.alert(err.response.data.message)
      if (err.response.data.message !== "conversation already exists") {
        window.alert(err.response.data.message)
      }
      else {
        setRefreshData((prev) => { return !prev })
      }
      console.log(err);
    })
  }

  // useEffect(()=>{

  // },[userSearch])
  // const handleInputSearchChange=()=>{

  // }
  const handleconversationClick = (conversation) => {
    setActiveConversation(conversation);
    // console.log(conversation._id);

    // axios({
    //   url: "http://localhost:3006/user/all-conversation-messages",
    //   method: "POST",
    //   headers: {
    //     authorization: userCookie.token
    //   },
    //   data: {
    //     conversationId: conversation._id
    //   }
    // }).then((resp) => {

    //   console.log(resp.data)
    //   // setRefreshData((prev) => { return !prev })
    //   setConversationMessages(resp.data.conversationMesages)
    // }).catch((err) => {
    //   // window.alert(err.response.data.message)
    //   if (err.response.data.message !== "conversation already exists") {
    //     window.alert(err.response.data.message)
    //   }
    //   else {
    //     // setRefreshData((prev) => { return !prev })
    //   }
    //   console.log(err);
    // })
  }
  // useEffect(()=>{
  //   handleconversationClick(activeConversation)
  // },[refreshdata])

  const handleSendMessageClick = () => {

    axios({
      url: "http://localhost:3006/user/new-message",
      method: "POST",
      headers: {
        authorization: userCookie.token
      },
      data: {
        conversationId: activeConversation._id,
        message: currentMessage,
        messageType: "String"
      }
    }).then((resp) => {

      console.log(resp.data)
      // setRefreshData((prev) => { return !prev })
      setConversationMessages((prev) => { return [...prev, resp.data.messageData] })
      setCurrentMessage("");
      MessageInputElementRef.current.value = "";
    }).catch((err) => {
      // window.alert(err.response.data.message)
      if (err.response.data.message !== "conversation already exists") {
        window.alert(err.response.data.message)
      }
      else {
        // setRefreshData((prev) => { return !prev })
      }
      console.log(err);
    })
  }

  useEffect(() => {
    if (activeConversation !== {}) {
      console.log(activeConversation._id);

      axios({
        url: "http://localhost:3006/user/all-conversation-messages",
        method: "POST",
        headers: {
          authorization: userCookie.token
        },
        data: {
          conversationId: activeConversation._id
        }
      }).then((resp) => {

        console.log(resp.data.conversationDetails)
        // setRefreshData((prev) => { return !prev })
        setConversationMessages(resp.data.conversationMesages)
        userdetail.name = resp.data.userName;
        userdetail.email = resp.data.userEmail;
        userDispatch(update(userdetail));

      }).catch((err) => {
        // window.alert(err.response.data.message)
        if (err.response.data.message !== "conversation already exists") {
          window.alert(err.response.data.message)
        }
        else {
          // setRefreshData((prev) => { return !prev })
        }
        console.log(err);
      })
    }

  }, [activeConversation])

  const handleKeyPressed = (e) => {
    // console.log("key pressed",e.key )
    if (e.key === "Enter") {
      handleSendMessageClick();
      console.log("key event")
    }
  }

  useEffect(() => {
    fetch("http://localhost:3006/user/notify", {
      method: "POST",
      keepalive: true,

      headers: {
        // KeepAlive: timeout=100,
        authorization: userCookie.token,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        conversationId: activeConversation._id,
        sender: "dinesh@test.com"
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))

  }, [])

  return (
    <div className='homePage-container' style={{ height: "80vh", width: "80vw" }}>
      <Navbar userCookie={userCookie} setuserCookie={setuserCookie} userInfo={userInfo} />
      <main className='home-main'>
        <div className='home-main__sidepanel'>
          <div className='SearchBar-container'>
            <div className='SearchBar-container__searchIconbtn' onClick={handleInputSearchClick}><SearchIcon /></div>
            <input onChange={(e) => { setUserSearch(e.currentTarget.value) }} className='SearchBar-container__input' type={"text"}></input>
          </div>
          <div className='home-main__sidepanel__all-conversations-container'>
            {allConversations.map((ele) => {
              return <ConversationRow conversationData={ele}
                key={ele._id}
                userEmail={userInfo.userEmail}
                handleconversationClick={handleconversationClick}
                activeConversation={activeConversation} />
            })}
          </div>

        </div>
        <div className='home-main__chatbox'>
          <div className='home-main__chatbox__messages_container'>
            {conversationMessages.map((ele) => { return <MessageRow key={ele._id} userInfo={userInfo} messageData={ele} /> })}
          </div>
          <div className='home-main__chatbox__new-message-div-container' >
            <div className='home-main__chatbox__new-message-div-container__input-div' >
              <input className='home-main__chatbox__new-message-div-container__input-div__message-input'
                onChange={(e) => { setCurrentMessage(e.currentTarget.value) }}
                ref={MessageInputElementRef}
                onKeyUp={handleKeyPressed}
                type={"text"} placeholder={"new Message"}></input>
            </div >
            <SendIcon onClick={handleSendMessageClick} fontSize='large' className='home-main__chatbox__new-message-div-container__sendBtn' />
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
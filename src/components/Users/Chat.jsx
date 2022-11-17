import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AxioInstance from "../../services/AxioInstance";
import Message from "../Message/Message";
import { store } from "../../redux/store";
import Conversation from "../Conversation/Conversation";
import { io } from "socket.io-client";
import "./chat.css";
import { useSelector } from "react-redux";

const SelectedBatchList = React.memo((props) => {
  let { batchCode } = useParams();
  let [oneBatchList, setOneBatchList] = useState([]);
  let [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessag, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [stdid, setStuid] = useState(null);
  const socket = useRef();
  const state = store.getState();
  const auth = state.auth.user._id;
  const scrollRef = useRef();
  let {user} = useSelector(state => state?.auth);
useEffect(() => {
    async function fetchlist() {
      AxioInstance.get(`admin/batchList/${batchCode}` , {
        headers : {
          Authorization : `Bearer ${user.TOKEN}`
        }
      }).then((data) => {
        console.log(data);
        let payload = data.data.batchData;
        let studentData = data.data.studentData;
        setOneBatchList(payload);
        setStudents(studentData);
      });
    }
    fetchlist();
  }, []);

  useEffect(() => {
    async function demo() {
      let payload = { senderId: auth, receiverId: stdid };
   let data = await AxioInstance.post("/chat/newConversation", payload);
    
    }
    demo();
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("getMessage", (data) => {
      // console.log(data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, [onlineUsers]);

  useEffect(() => {
    setMessages((prev) => [...prev, arrivalMessage]);
    // console.log(messages);
  }, [arrivalMessage]);

  useEffect(() => {
    let batchStudents = students.map((x) => x._id);
    let users = { auth, ...batchStudents };
    socket.current.emit("addUser", auth);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
      setOnlineUsers(
        students.filter((f) => users.some((u) => u.userId === f._id))
      );
    });
  }, [auth]);
  // get all conversation from the user
  useEffect(() => {
    const getconversations = async () => {
      try {
        const res = await AxioInstance.get("/chat/" + auth);
        setConversations(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getconversations();
  }, [auth]);

  // console.log(currentChat)
  // console.log(oneBatchList)
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await AxioInstance.get("/chat/msg/" + currentChat?._id);
        // console.log(res.data);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: auth,
      text: newMessag,
      conversationId: currentChat._id,
    };
    // console.log(message)
    const receiverId = currentChat._id !== auth;

    socket.current.emit("sendMessage", {
      senderId: auth,
      receiverId: currentChat._id,
      text: newMessag,
    });

    try {
      const res = await AxioInstance.post("/chat/newmsg", message);
      // console.log(res.data);
      setMessages([...messages, res.data]);
      // setMessages("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);
  return (
    <div >
      {oneBatchList
        ? oneBatchList.map((ele, ind) => {
            return (
              <>
                <div className="messenger">
                 <aside className="chattype">
                    <div>
                      <h1>{ele.batchCode}</h1>
                    </div>
                 </aside>
                  <aside className="chatMenu">
                    <div>
                      <h1>{ele.trainer}</h1>
                    </div>
                    <div >
                        <div className="chatMenuWrapper">
                      <input type="search" placeholder="Search Chat" className="chatMenuInput"/>
                      {students.map((c) => (
                        <div
                          onClick={() => {
                            setCurrentChat(c);
                            setStuid(c._id);
                          }}>
                          <Conversation students={c} />
                        </div>
                      ))}
                      </div>
                    </div>
                  </aside>
                  <aside className="chatBox">
                 
                      <div className="chatBoxWrapper">
                        {currentChat ? (
                          <>
                            <div className="chatBoxTop">
                              {/* <div ref={scrollRef}> */}
                                {messages?.map((m) => (
                                  <Message
                                    message={m}
                                    own={m.sender === auth}
                                  />
                                ))}
                              {/* </div> */}
                            </div>
                            <div className="chatBoxBottom">
                              <textarea className="chatMessageInput" placeholder="write something..."
                                onChange={(e) => {setNewMessage(e.target.value);}}value={newMessag}>
                              </textarea>
                              <button className="chatSubmitButton" onClick={handelSubmit}>Send</button>
                            </div>
                         </>
                        ) : (
                          <span className="noConversationText">
                            Open a conversation to start a chat.
                          </span>
                        )}
                      </div>
                  </aside>
                </div>
              </>
            );
          })
        : ""}
    </div>
  );
});

export default SelectedBatchList;

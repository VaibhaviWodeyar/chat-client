import React, { useEffect, useRef, useState } from "react";
import Styles from "./_chat.module.css";
import { useParams } from "react-router-dom";
import AxioInstance from "../../../api/AxiosInstance";
import Message from "./StdMessage";
import { store } from "../../../redux/store";
import Conversation from "./StdConversation";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

const ChatComponent = React.memo((props) => {
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
  let { user } = useSelector((state) => state?.auth);

  useEffect(() => {
    async function fetchlist() {
      AxioInstance.get(`users/batches/${batchCode}`, {
        headers: {
          Authorization: `Bearer ${user.TOKEN}`,
        },
      }).then((data) => {
        console.log(data);
        let payload = data.data.batchData;
        let studentData = data.data.trainersandtrackerdata;
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
  }, [stdid]);

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
        const res = await AxioInstance.get("/chat/" + stdid);
        console.log(res.data);

        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getconversations();
  }, [stdid]);

  // console.log(currentChat)
  // console.log(oneBatchList)
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await AxioInstance.get(
          "/chat/msg/" + conversations.conversation
        );
        // console.log(res.data);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  console.log(currentChat);
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

  // console.log(messages);
  return (
    <section id={Styles.chatBoxSection}>
      <article>
        {oneBatchList
          ? oneBatchList.map((ele, ind) => {
              return (
                <>
                  <aside className={Styles.chattype}>
                    <div>
                      <h1>{ele.batchCode}</h1>
                    </div>
                  </aside>
                  <aside className={Styles.chatMenu}>
                    <div>
                      <h1>{ele.trainer}</h1>
                    </div>
                    <div>
                      <div className={Styles.chatMenuWrapper}>
                        <span>
                          {" "}
                          <input
                            type="search"
                            placeholder="Search Chat"
                            className="chatMenuInput"
                          />
                        </span>

                        <span className={Styles.searchIcon}>
                          <FiSearch />
                        </span>
                        {students.map((c) => (
                          <div
                            className={Styles.listUser}
                            onClick={() => {
                              setCurrentChat(c);
                              setStuid(c._id);
                            }}
                          >
                            <Conversation students={c} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>

                  <aside className={Styles.chatBox}>
                    <div className={Styles.chatBoxWrapper}>
                      {currentChat ? (
                        <>
                          <div className={Styles.chatBoxTop}>
                            {/* <div ref={scrollRef}> */}
                            {messages?.map((m) => (
                              <Message
                                message={m}
                                own={m.sender === user._id}
                              />
                            ))}
                            {/* </div> */}
                          </div>
                          <div className={Styles.chatBoxBottom}>
                            <textarea
                              className="chatMessageInput"
                              placeholder="write something..."
                              onChange={(e) => {
                                setNewMessage(e.target.value);
                              }}
                              value={newMessag}
                            ></textarea>
                            <button
                              className="chatSubmitButton"
                              onClick={handelSubmit}
                            >
                              Send
                            </button>
                          </div>
                        </>
                      ) : (
                        <span className="noConversationText">
                          Open a conversation to start a chat.
                        </span>
                      )}
                    </div>
                  </aside>
                </>
              );
            })
          : ""}
      </article>
    </section>
  );
});

export default ChatComponent;

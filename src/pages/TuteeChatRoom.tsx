import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../database/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import "../components/styles/ChatRoom.css"; // Import the new chatroom styles

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const ChatRoom: React.FC = () => {
  const { chatroomId } = useParams<{ chatroomId?: string }>(); // Allow chatroomId to be undefined
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUserName, setOtherUserName] = useState("Chat");
  const [userType, setUserType] = useState<"student" | "tutor" | null>(null);
  const userEmail = Cookies.get("userEmail");

  useEffect(() => {
    if (!chatroomId || !userEmail) {
      console.error("Chatroom ID or User not found.");
      return;
    }

    const fetchUserType = async () => {
      try {
        // Check if the user is a student
        const studentsRef = collection(db, "students");
        const studentQuery = query(studentsRef, where("email", "==", userEmail));
        const studentSnap = await getDocs(studentQuery);

        if (!studentSnap.empty) {
          setUserType("student");
          return;
        }

        // Check if the user is a tutor
        const tutorsRef = collection(db, "tutors");
        const tutorQuery = query(tutorsRef, where("email", "==", userEmail));
        const tutorSnap = await getDocs(tutorQuery);

        if (!tutorSnap.empty) {
          setUserType("tutor");
          return;
        }

        console.error("User type could not be determined.");
      } catch (error) {
        console.error("Error determining user type:", error);
      }
    };

    const fetchChatroomData = async () => {
      try {
        const chatroomRef = doc(db, "chatrooms", chatroomId);
        const chatroomSnap = await getDoc(chatroomRef);

        if (chatroomSnap.exists()) {
          const chatroomData = chatroomSnap.data();
          setMessages(chatroomData.messages || []);

          // Determine the other user's name
          const otherUserEmail = userEmail === chatroomData.studentId ? chatroomData.tutorId : chatroomData.studentId;
          
          // Fetch the other user's name from Firestore
          const usersRef = collection(db, userEmail === chatroomData.studentId ? "tutors" : "students");
          const userQuery = query(usersRef, where("email", "==", otherUserEmail));
          const userSnap = await getDocs(userQuery);

          if (!userSnap.empty) {
            setOtherUserName(userSnap.docs[0].data().fullName || "Chat");
          }
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchUserType();
    fetchChatroomData();
  }, [chatroomId, userEmail]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    if (!newMessage.trim() || !userEmail || !chatroomId) return;

    try {
      const chatroomRef = doc(db, "chatrooms", chatroomId);
      await updateDoc(chatroomRef, {
        messages: arrayUnion({
          sender: userEmail,
          content: newMessage,
          timestamp: new Date().toISOString(),
        }),
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: userEmail, content: newMessage, timestamp: new Date().toISOString() },
      ]);

      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatroom-page"> 
    <div className="chatroom-container">
      <h2 className="chatroom-title">{otherUserName}</h2>

      {/* Fixed the Go Back button */}
      <button className="chat-back-button" onClick={() => navigate(-1)}>⬅ Go Back</button>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === userEmail ? "student-message" : "tutor-message"}`}>
            <div className="message-bubble">
              <strong>{msg.sender === userEmail ? "You" : otherUserName}</strong>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* ✅ Wrap the input & button inside a <form> for better behavior */}
      <form className="chat-input-container" onSubmit={sendMessage}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
    </div>
    </div>
  );
};

export default ChatRoom;

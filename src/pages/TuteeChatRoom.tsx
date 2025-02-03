import React, { useState, useEffect, useRef } from "react";
import { db } from "../database/firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import "../components/styles/ChatRoom.css";

const TuteeChatRoom = () => {
  const [messages, setMessages] = useState<
    { id: string; sender: string; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const auth = getAuth();
  const user = auth.currentUser; // Get the authenticated user

  // Fetch messages from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any))
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        alert("Permission denied. Please log in.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to Firestore
  const handleSend = async () => {
    if (input.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    if (!user) {
      alert("You must be logged in to send messages.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: input,
        sender: user.displayName || user.email || "Anonymous",
        timestamp: serverTimestamp(),
      });
      setInput(""); // Clear input
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Check console for details.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Chat Room</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div className="chat-box">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${
                msg.sender === (user?.displayName || user?.email)
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <p>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
      )}

      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default TuteeChatRoom;

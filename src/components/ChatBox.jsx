import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import "../styles/ChatBox.scss";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ChatBox = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  
  useEffect(() => {
    const stored = localStorage.getItem("sessionId");
    if (stored) {
      setSessionId(stored);
      fetchHistory(stored);
    } else {
      createSession();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function createSession() {
    try {
      console.log(BASE_URL);

      const res = await axios.post(`${BASE_URL}/session/new`);
      const id = res.data.sessionId;
      setSessionId(id);
      localStorage.setItem("sessionId", id);
    } catch (err) {
      console.error("Error creating session:", err);
    }
  }

  async function fetchHistory(id) {
    try {
      const res = await axios.get(`${BASE_URL}/session/${id}/history`);
      setMessages(res.data.history || []);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  }

  async function sendMessage(message) {
    if (!message.trim() || !sessionId) return;

    setMessages((prev) => [...prev, { role: "user", text: message }]);

    try {
      const res = await axios.post(`${BASE_URL}/chat`, {
        sessionId,
        message,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.data.answer },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Error: could not reach server." },
      ]);
    }
  }

  async function resetSession() {
    if (sessionId) {
      try {
        await axios.post(`${BASE_URL}/session/${sessionId}/clear`);
        setMessages([]);
      } catch (err) {
        console.error("Error resetting session:", err);
      }
    }
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h2>RAG News Assistant</h2>
        <button className="reset-btn" onClick={resetSession}>
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} text={m.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatBox;

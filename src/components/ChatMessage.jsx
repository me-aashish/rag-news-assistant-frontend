import React from "react";
import "../styles/ChatMessage.scss";

const ChatMessage = ({ role, text }) => {
  console.log(text);

  return (
    <div className={`chat-message ${role}`}>
      <div className="message-bubble">{text}</div>
    </div>
  );
};

export default ChatMessage;

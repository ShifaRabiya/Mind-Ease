import React, { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 350px;
  max-height: 500px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 2000;
`;

const Header = styled.div`
  background: #597c49ff;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px 15px;
  overflow-y: auto;
  font-size: 0.9rem;
`;

const InputWrapper = styled.form`
  display: flex;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
`;

const SendBtn = styled.button`
  padding: 0 15px;
  border: none;
  background: #597c49ff;
  color: white;
  cursor: pointer;
`;

export default function ChatbotPopup({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    // Send to Flask backend
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMsg = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <Overlay>
      <Header>
        Chatbot
        <span style={{ cursor: "pointer" }} onClick={onClose}>✖</span>
      </Header>
      <Messages>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "user" ? "right" : "left", margin: "5px 0" }}>
            <b>{m.sender === "user" ? "You" : "Bot"}:</b> {m.text}
          </div>
        ))}
      </Messages>
      <InputWrapper onSubmit={sendMessage}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <SendBtn type="submit">Send</SendBtn>
      </InputWrapper>
    </Overlay>
  );
}

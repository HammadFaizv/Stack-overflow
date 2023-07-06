import React from "react";

import "./ChatAI.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { ChatAiInput } from "../../components/ChatAI/ChatAiInput";
import { ChatViewer } from "../../components/ChatAI/ChatViewer";
import { useSelector } from "react-redux";
import ChatVerification from "../../components/ChatAI/ChatVerification";

const ChatAI = () => {
  const signal = useSelector((state) => state.otpReducer)

  return (
    <>
      <div className="home-container-1">
        <LeftSidebar />
        {signal.verified === 1 ? (
          <div className="home-container-2">
            <h1>Chat AI</h1>
            <div className="chat-container">
              <div className="chat-message-container">
                <ChatViewer />
              </div>
              <ChatAiInput />
            </div>
          </div>
        ) : (
          <ChatVerification />
        )}
      </div>
    </>
  );
};

export default ChatAI;
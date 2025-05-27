import React from "react";
import ChatHeader from "./components/chat-header";
import MessageContainer from "./components/message-container";
import MessageBar from "./components/message-bar";

const ChatContainer = () => {
  return (
    <div className="h-[100vh] bg-[#1c1d25] flex flex-col w-full">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
};

export default ChatContainer;

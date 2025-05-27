import React from "react";
import ChatContainer from "./components/chat-container";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import { useContact } from "@/context/ContactContext";

const Chat = () => {
  const { selectedContact } = useContact();

  const isChatSelected = selectedContact.length !== 0;

  return (
    <div className="flex h-screen text-white overflow-hidden w-full">
      {/* Show Contacts if no chat is selected or on desktop */}
      {(!isChatSelected || window.innerWidth >= 768) && (
        <div className={`w-full md:w-auto h-full overflow-y-auto ${isChatSelected ? 'hidden md:block' : ''}`}>
          <ContactsContainer />
        </div>
      )}

      {/* Show Chat if a contact is selected */}
      {isChatSelected && (
        <div className="flex-1 bg-gray-900 overflow-y-auto w-full md:flex">
          <ChatContainer />
        </div>
      )}

      {/* Optional: Show empty chat container if nothing is selected */}
      {!isChatSelected && (
        <div className="flex-1 bg-gray-900 overflow-y-auto hidden md:flex">
          <EmptyChatContainer />
        </div>
      )}
    </div>
  );
};

export default Chat;

import { useUser } from "@/context/AuthContext";
import { useContact } from "@/context/ContactContext";
import { useSocket } from "@/context/SocketContext";
import { getAllContacts } from "@/services/message";
import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  // const emojiRef = useRef();
  const [emojiOpen, setEmojiOpen] = useState(false);

  const [message, setMessage] = useState("");
  const { userInfo } = useUser();
  const { selectedContact, contacts } = useContact();

  const socketRef = useSocket();

  const handleAddEmoji = (emoji) => {
    setMessage((message) => {
      return message + emoji.emoji;
    });
  };

  const handleMessage = async () => {
    setMessage("");
    if (selectedContact) {
      socketRef.current.emit("sendMessage", {
        sender: userInfo._id,
        recipient: selectedContact._id,
        messageType: "text",
        content: message,
        fileUrl: undefined,
      });

      const contactBool = contacts.filter(
        (arr) => arr._id === selectedContact._id
      );
      if (contactBool.length === 0) {
        await getAllContacts();
      }
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center pr-5 gap-2">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none "
          placeholder="Enter Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:outline-none hover:text-white transition-all duration-300">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative pt-1">
          <button
            className="text-neutral-500 focus:outline-none hover:text-white transition-all duration-300"
            onClick={() =>
              setEmojiOpen((prev) => {
                return !prev;
              })
            }
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>

          {emojiOpen && (
            <div className="absolute bottom-15 right-0.5 z-50">
              <EmojiPicker
                theme="dark"
                onEmojiClick={handleAddEmoji}
                autoFocusSearch={false}
                searchDisabled={true}
                skinTonesDisabled={true}
                lazyLoadEmojis={true}
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
        </div>
      </div>
      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none hover:text-white transition-all duration-300"
        onClick={handleMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;

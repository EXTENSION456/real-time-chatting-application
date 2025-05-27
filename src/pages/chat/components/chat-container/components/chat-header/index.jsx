import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useContact } from "@/context/ContactContext";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { setSelectedContact, selectedContact } = useContact();

  const closeChat = () => {
    setSelectedContact([]);
  };

  return (
    <div className="h-20 border-b-2 border-[#2f303b] flex items-center justify-between px-6 md:px-10 lg:px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative ">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden border-4 border-[#ff006e]">
              {selectedContact?.image ? (
                <AvatarImage
                  // src={imageUrl}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white text-2xl bg-[#712c4a57]">
                  {selectedContact?.email?.[0]?.toUpperCase() || "?"}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            {selectedContact && selectedContact.firstName
              ? selectedContact.firstName + selectedContact.lastName
              : selectedContact.email}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button className="text-neutral-500 focus:outline-none hover:text-white transition-all duration-300 cursor-pointer">
            <RiCloseFill className="text-3xl" onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

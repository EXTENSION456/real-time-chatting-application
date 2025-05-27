import { useContact } from "@/context/ContactContext";
import moment from "moment";
import React, { useEffect, useRef } from "react";

const MessageContainer = () => {
  const containerRef = useRef(null);

  const { selectedContact, selectedChatMessage } = useContact();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [selectedChatMessage]);

  const renderMessages = () => {
    let lastDate = null;

    // Filter out invalid dates first
    const validMessages = selectedChatMessage.filter((message) => {
      const momentObj = moment(message.createdAt || message.timestamp);
      return momentObj.isValid();
    });

    return validMessages
      .map((message, index) => {
        const messageMoment = moment(message.createdAt || message.timestamp);
        const currentDateFormatted = messageMoment.format("YYYY-MM-DD");
        const showDate = currentDateFormatted !== lastDate;
        lastDate = currentDateFormatted;

        return (
          <div key={message._id || index}>
            {showDate && (
              <div className="text-center text-gray-500">
                {messageMoment.format("LL")}
              </div>
            )}
            {renderDmMessage(message)}
          </div>
        );
      })
      .filter(Boolean);
  };

  const renderDmMessage = (message) => {
    const messageMoment = moment(message.createdAt || message.timestamp);

    return (
      <div
        className={`${
          message.sender === selectedContact._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedContact._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 "
            } border inline-block p-4 rounded max-w-[50%] break-words `}
          >
            {message.content}
          </div>
        )}

        <div className="text-xs text-gray-600 ">
          {messageMoment.format("LT")}{" "}
        </div>
      </div>
    );
  };

  console.log(selectedContact);

  return (
    <div
      className="flex-1 overflow-y-auto scroll-hidden p-4 px-8 md:w-[55vw] lg:w-[60vw] xl:w-[70vw] w-full"
      ref={containerRef}
    >
      {renderMessages()}
    </div>
  );
};

export default MessageContainer;

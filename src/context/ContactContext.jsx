import { getAllContacts, getMessages } from "@/services/message";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./AuthContext";

const ContactContext = createContext([]);

export const ContactProvider = ({ children }) => {
  const [selectedContact, setSelectedContact] = useState([]);

  const [selectedChatMessage, setSelectedChatMessage] = useState([]);

  const [contacts, setContacts] = useState([]);

  const { userInfo } = useUser();

  const addMessage = (message) => {
    setSelectedChatMessage((msg) => {
      return [
        ...msg,
        {
          ...message,
          recipient: message.recipient,
          sender: message.sender,
          timestamp: Date.now(),
        },
      ];
    });
  };

  useEffect(() => {
    if (selectedContact.length === 0) {
      return;
    }
    getMessages(selectedContact._id)
      .then((res) => {
        const messages = res.messages;
        setSelectedChatMessage(messages);
      })
      .catch((err) => {
        console.log(err, "error in getting messages");
      });
  }, [selectedContact, userInfo]);

  const fetchContact = async () => {
    try {
      const data = await getAllContacts();

      const arr = data?.contacts
        ?.map((contact) => {
          const { sender, recipient } = contact;
          if (sender?._id !== userInfo?._id) return sender;
          if (recipient?._id !== userInfo?._id) return recipient;
          return null;
        })
        .filter((user) => user && user._id);

      const uniqueUsers = arr?.filter(
        (user, index, self) =>
          index === self?.findIndex((u) => u._id === user._id)
      );

      setContacts(uniqueUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [userInfo]);

  return (
    <ContactContext.Provider
      value={{
        selectedContact,
        setSelectedContact,
        addMessage,
        selectedChatMessage,
        setSelectedChatMessage,
        contacts,
        fetchContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);

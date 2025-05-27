import { createContext, useContext, useEffect, useRef } from "react";
import { useUser } from "./AuthContext";
import { io } from "socket.io-client";
import { useContact } from "./ContactContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const socket = useRef();

  const { userInfo } = useUser();

  const { selectedContact, addMessage, fetchContact } = useContact();

  const recieveMessage = (msg) => {
    if (
      selectedContact._id === msg.recipient ||
      selectedContact._id === msg.sender
    ) {
      addMessage(msg);
    } else {
      fetchContact();
    }
  };

  useEffect(() => {
    if (userInfo) {
      // creating an instance of socket io client and storing it inside socket ref , socket.current  .... Also it tries to connect with the socket io server in the backend
      socket.current = io(backendUrl, {
        withCredentials: true,
        query: {
          userId: userInfo._id,
        },
      });

      // using the stored socket io instance, we set up a listener to confirm when we've successfully connected with the backend

      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      socket.current.on("recieveMessage", recieveMessage);

      return () => {
        // using the stored instance of socket io client , we disconnect with the server because the component has unmounted and we dont want to linger open connections

        socket.current.disconnect();
      };
    }
  }, [userInfo, selectedContact]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

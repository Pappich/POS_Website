import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        const text = await event.data.text(); 
        try {
          const message = JSON.parse(text);
          console.log("Message from server:", message);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      } else {
        try {
          const message = JSON.parse(event.data);
          console.log("Message from server:", message);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

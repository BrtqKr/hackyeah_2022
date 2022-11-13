import React, { useContext, useState } from 'react';
import { Socket } from 'socket.io-client';

const MessagingContext = React.createContext<{
  socket: Socket | null;
}>({
  socket: null,
});

export const MessagingProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  //   useEffect(() => {
  //     const newSocket = io('http://localhost:3000', {
  //       reconnection: false,
  //       autoConnect: false,
  //     });
  //     newSocket.on('connected', (res) => {
  //       console.warn(`user ${res.id} connected`);
  //       setConnected(true);
  //     });
  //     newSocket.on('updatedStats', (res) => {
  //       console.warn(`updatedStats ${res}`);
  //     });
  //     setSocket(newSocket);
  //     return () => {
  //       newSocket.close();
  //       setConnected(false);
  //     };
  //   }, []);

  //   const disconnect = useCallback(() => {
  //     socket?.disconnect();
  //     setConnected(false);
  //     console.warn(`user disconnected`);
  //   }, [socket]);

  //   const connect = useCallback(() => {
  //     socket?.connect();
  //     console.warn(`connecting...`);
  //   }, [socket]);

  return (
    <MessagingContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => useContext(MessagingContext);

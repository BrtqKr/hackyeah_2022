import { createContext, FC, useCallback, useContext, useState } from 'react';
import useGameState from '../store/game_state/useGameState';
import { useNavigation } from '@react-navigation/native';

const MessagingContext = createContext<{
  socket: WebSocket | null;
  connect?(): void;
}>({
  socket: null,
});

export const MessagingProvider: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const { navigate } = useNavigation();

  const { dispatch } = useGameState();

  const connect = useCallback(() => {
    console.info(`connecting...`);

    const socket = new WebSocket('ws://192.168.0.52:3000/server');
    socket.onopen = (_) => {
      console.warn('Socket connected');
      setConnected(true);
      navigate('CardsRoute');
    };
    socket.onclose = (event) => {
      console.warn(`Socket closed - reason: ${event.reason}`);
      setConnected(false);
    };
    socket.onerror = (error) => {
      console.warn(`Error: ${JSON.stringify(error)}`);
    };
    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const { message, payload } = response;
      dispatch(message, payload);
    };
    setSocket(socket);
  }, [socket]);

  return (
    <MessagingContext.Provider
      value={{
        socket,
        connect,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => useContext(MessagingContext);

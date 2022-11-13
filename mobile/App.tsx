import { NavigationContainer } from '@react-navigation/native';
import { MessagingProvider } from './src/contexts/MessagingContext';
import RootNavigator from './src/navigation/navigators/RootNavigator/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MessagingProvider>
        <RootNavigator />
      </MessagingProvider>
    </NavigationContainer>
  );
}

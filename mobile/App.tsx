import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MessagingProvider } from './src/contexts/MessagingContext';
import RootNavigator from './src/navigation/navigators/RootNavigator/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MessagingProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </MessagingProvider>
    </NavigationContainer>
  );
}

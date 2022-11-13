import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

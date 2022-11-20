import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/auth/AuthProvider';
import RootNavigator from './src/navigation/navigators/RootNavigator';
import { CustomQueryClientProvider } from './src/query/CustomQueryClientProvider';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['']);

export default function App() {
  return (
    <AuthProvider>
      <CustomQueryClientProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CustomQueryClientProvider>
    </AuthProvider>
  );
}

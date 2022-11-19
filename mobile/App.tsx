import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/auth/AuthProvider';
import RootNavigator from './src/navigation/navigators/RootNavigator';
import { CustomQueryClientProvider } from './src/query/CustomQueryClientProvider';

export default function App() {
  return (
    <CustomQueryClientProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </CustomQueryClientProvider>
  );
}

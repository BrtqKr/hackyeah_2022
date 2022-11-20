import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { useAuthContext } from '../../auth/AuthProvider';
import AppCoreNavigator from './AppCoreNavigator/AppCoreNavigator';
import AuthNavigator from './AuthNavigator/AuthNavigator';

export type RootStackParamList = {
  AuthRoute: undefined;
  AppCoreRoute: undefined;
};

const RootNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const { isSignedIn, initializing } = useAuthContext();

  if (initializing) {
    return <View />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isSignedIn ? (
        <Stack.Screen name="AppCoreRoute" component={AppCoreNavigator} />
      ) : (
        <Stack.Screen name="AuthRoute" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

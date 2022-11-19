import { createStackNavigator } from '@react-navigation/stack';
import AppCoreNavigator from './AppCoreNavigator/AppCoreNavigator';
import AuthNavigator from './AuthNavigator/AuthNavigator';

export type RootStackParamList = {
  AuthRoute: undefined;
  AppCoreRoute: undefined;
};

const RootNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="AppCoreRoute" component={AppCoreNavigator} />
      ) : (
        <Stack.Screen name="AuthRoute" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';

export type AuthStackParamList = {
  LoginRoute: undefined;
};

const AuthNavigator = () => {
  const Stack = createStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginRoute" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

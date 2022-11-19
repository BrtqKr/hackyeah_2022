import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';

export type AppCoreStackParamList = {
  BottomNavigatorRoute: undefined;
};

const AppCoreNavigator = () => {
  const Stack = createStackNavigator<AppCoreStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomNavigatorRoute" component={BottomNavigator} />
    </Stack.Navigator>
  );
};

export default AppCoreNavigator;

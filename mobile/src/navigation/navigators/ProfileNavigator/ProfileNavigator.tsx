import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from './Profile';

export type GameStackParamList = {
  ProfileRoute: undefined;
};

const ProfileNavigator = () => {
  const Stack = createStackNavigator<GameStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileRoute" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

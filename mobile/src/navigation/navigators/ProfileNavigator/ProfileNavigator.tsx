import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from './Profile';

export type ProfileStackParamList = {
  Profile: undefined;
};

const ProfileNavigator = () => {
  const Stack = createStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

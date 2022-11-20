import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from './ProfileScreen';

export type ProfileStackParamList = {
  ProfileRoute: undefined;
};

const ProfileNavigator = () => {
  const Stack = createStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileRoute" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

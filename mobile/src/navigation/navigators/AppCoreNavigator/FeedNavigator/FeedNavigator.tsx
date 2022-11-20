import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './FeedScreen';

export type FeedNavigatorStackParamList = {
  FeedRoute: undefined;
  AlertsRoute: undefined;
};

const FeedNavigator = () => {
  const Stack = createStackNavigator<FeedNavigatorStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FeedRoute" component={FeedScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;

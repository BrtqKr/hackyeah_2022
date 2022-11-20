import { createStackNavigator } from '@react-navigation/stack';
import AlertsScreen from './AlertsScreen';
import CommentsScreen from './CommentsScreen';
import FeedScreen from './FeedScreen';

export type FeedNavigatorStackParamList = {
  FeedRoute: undefined;
  CommentsRoute: { taskId: string };
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
      <Stack.Screen name="CommentsRoute" component={CommentsScreen} />
      <Stack.Screen name="AlertsRoute" component={AlertsScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;

import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './FeedScreen';
import CommentsScreen from './CommentsScreen';

export type FeedNavigatorStackParamList = {
  FeedRoute: undefined;
  CommentsRoute: {taskId: string};
};

const FeedNavigator = () => {
  const Stack = createStackNavigator<FeedNavigatorStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen name="CommentsRoute" component={CommentsScreen} />
      <Stack.Screen name="FeedRoute" component={FeedScreen} />

    </Stack.Navigator>
  );
};

export default FeedNavigator;

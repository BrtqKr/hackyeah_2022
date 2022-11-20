import { Feather } from '@expo/vector-icons';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Colors } from '../../../theme/Colors';
import { EditProfileScreen } from '../ProfileNavigator/EditProfileScreen';
import AlertsScreen from './AlertsScreen';
import BottomNavigator from './BottomNavigator';
import CommentsScreen from './FeedNavigator/CommentsScreen';
import TaskDetailsScreen from './TasksNavigator/TaskDetailsScreen';

export type AppCoreStackParamList = {
  BottomNavigatorRoute: undefined;
  EditProfileRoute: undefined;
  AlertsRoute: undefined;
  TaskDetailsRoute: { taskId: string };
  CommentsRoute: { taskId: string };
};

export const headerOptions: StackNavigationOptions = {
  //   headerTitle: ({ children }) => <Text style={Typography.text1}>{children}</Text>,
  headerBackImage: () => <Feather name="chevron-left" size={32} color={Colors.Secondary3} />,
  headerTitleAlign: 'center',
  headerStyle: {
    borderWidth: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  headerLeftContainerStyle: {
    paddingLeft: 16,
  },
  headerTitle: '',
  headerBackTitleVisible: false,
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
      <Stack.Screen
        name="EditProfileRoute"
        component={EditProfileScreen}
        options={{ headerShown: true, ...headerOptions }}
      />
      <Stack.Screen name="AlertsRoute" component={AlertsScreen} />
      <Stack.Screen name="TaskDetailsRoute" component={TaskDetailsScreen} />
      <Stack.Screen name="CommentsRoute" component={CommentsScreen} />
    </Stack.Navigator>
  );
};

export default AppCoreNavigator;

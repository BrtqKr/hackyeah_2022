import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { EditProfile } from '../ProfileNavigator/EditProfile';
import BottomNavigator from './BottomNavigator';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../../theme/Colors';
import { Typography } from '../../../theme/Typography/Typography';
import { Text } from 'react-native';
import TaskDetailsScreen from './TasksNavigator/TaskDetailsScreen';

export type AppCoreStackParamList = {
  BottomNavigatorRoute: undefined;
  EditProfile: undefined;
  TaskDetailsRoute: { taskId: number };
};

export const headerOptions: StackNavigationOptions = {
  headerTitle: ({ children }) => <Text style={Typography.text1}>{children}</Text>,
  headerBackImage: () => <Feather name="arrow-left" size={32} color={Colors.Secondary3} />,
  headerTitleAlign: 'center',
  headerStyle: {
    borderWidth: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  headerLeftContainerStyle: {
    paddingLeft: 16,
  },
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
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: true, ...headerOptions }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TaskDetailsRoute"
        component={TaskDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default AppCoreNavigator;

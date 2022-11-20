import { createStackNavigator } from '@react-navigation/stack';
import TasksScreen from './TasksScreen';
import TaskDetailsScreen from './TaskDetailsScreen';

export type TaskNavigatorStackParamList = {
  AllTasksRoute: undefined;
  TaskDetailsRoute: { taskId: string };
};

const TaskNavigator = () => {
  const Stack = createStackNavigator<TaskNavigatorStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AllTasksRoute" component={TasksScreen} />
      <Stack.Screen name="TaskDetailsRoute" component={TaskDetailsScreen} />
    </Stack.Navigator>
  );
};

export default TaskNavigator;

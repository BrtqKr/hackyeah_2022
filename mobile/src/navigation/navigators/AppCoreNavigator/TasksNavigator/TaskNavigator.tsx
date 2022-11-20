import { createStackNavigator } from '@react-navigation/stack';
import TasksScreen from './TasksScreen';
import TaskDetailsScreen from './TaskDetailsScreen';
import React from 'react';
import { View, Text } from 'react-native';
import TaskNavigatorHeader from './TaskNavigatorHeader';

export type TaskNavigatorStackParamList = {
  AllTasksRoute: undefined;
  TaskDetailsRoute: { taskId: string };
};

const TaskNavigator = () => {
  const Stack = createStackNavigator<TaskNavigatorStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <TaskNavigatorHeader />,
      }}
    >
      <Stack.Screen name="AllTasksRoute" component={TasksScreen} />
      <Stack.Screen name="TaskDetailsRoute" component={TaskDetailsScreen} />
    </Stack.Navigator>
  );
};

export default TaskNavigator;

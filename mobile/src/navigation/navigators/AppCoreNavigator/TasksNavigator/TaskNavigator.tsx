import { createStackNavigator } from '@react-navigation/stack';
import TasksScreen from './TasksScreen';
import React from 'react';

export type TaskNavigatorStackParamList = {
  TasksRoute: undefined;
};

const TaskNavigator = () => {
  const Stack = createStackNavigator<TaskNavigatorStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TasksRoute" component={TasksScreen} />
    </Stack.Navigator>
  );
};

export default TaskNavigator;

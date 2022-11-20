import { createStackNavigator } from '@react-navigation/stack';
import TasksScreen from './TasksScreen';
import TaskDetailsScreen from './TaskDetailsScreen';
import React from 'react';
import { View, Text } from 'react-native';
import TaskNavigatorHeader from './TaskNavigatorHeader';

export type TaskNavigatorStackParamList = {
  AllTasksRoute: undefined;
  TaskDetailsRoute: { taskId: string };
  StoryTasksRoute: undefined;
};

const StoryTasksComponent = () => (
  <View>
    <Text>StoryTaskRoute</Text>
  </View>
);

const TaskNavigator = () => {
  const Stack = createStackNavigator<TaskNavigatorStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AllTasksRoute" component={TasksScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TaskDetailsRoute"
        component={TaskDetailsScreen}
      />
      <Stack.Screen name="StoryTasksRoute" component={StoryTasksComponent} />
    </Stack.Navigator>
  );
};

export default TaskNavigator;

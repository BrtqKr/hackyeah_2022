import React from 'react';
import TaskDetails from '../../../../components/task/TasksDetails';
import TaskNavigatorHeader from './TaskNavigatorHeader';

export const TaskDetailsScreen = (task: any) => {
  return (
    <>
      <TaskNavigatorHeader />
      <TaskDetails task={{}} />
    </>
  );
};

export default TaskDetailsScreen;

import React from 'react';
import TaskDetails from '../../../../components/task/TaskDetails';

export const TaskDetailsScreen = ( { taskId } : { taskId: number }) => {
  return (
    <>
      <TaskDetails taskId={taskId}/>
    </>
  );
};

export default TaskDetailsScreen;

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { StoryList } from '../../../../components/task/StoryList';
import TasksList from '../../../../components/task/TasksList';
import TaskNavigatorHeader from './TaskNavigatorHeader';
import * as Api from '../../../../axios/api';
import { useAuthContext } from '../../../../auth/AuthProvider';

const TasksScreen = () => {
  const { user } = useAuthContext();

  const [currentRoute, setCurrentRoute] = useState<'AllTasksRoute' | 'StoryTasksRoute'>(
    'AllTasksRoute'
  );

  const { data, isLoading } = useQuery(
    ['getTaskCompletions', { id: 1 }], // query key
    () => Api.getTasksWithCompletions(user?.id || 0)
  );

  const finishedTasksCount = data?.data.filter(
    (task) => task.attributes.task_completions.data.length != 0
  ).length;

  const allTasksCount = data?.data.length;

  if (data) {
    return (
      <>
        <TaskNavigatorHeader
          route={currentRoute}
          setRoute={setCurrentRoute}
          allTasks={allTasksCount || 0}
          finishedTasks={finishedTasksCount || 0}
          loading={isLoading}
        />
        {currentRoute === 'AllTasksRoute' ? (
          <TasksList tasks={data.data.filter((task) => !task.attributes.special)} />
        ) : (
          <StoryList tasks={data.data.filter((task) => task.attributes.special)} />
        )}
      </>
    );
  }
  return (
    <TaskNavigatorHeader
      route={currentRoute}
      setRoute={setCurrentRoute}
      allTasks={allTasksCount || 0}
      finishedTasks={finishedTasksCount || 0}
      loading={isLoading}
    />
  );
};

export default TasksScreen;

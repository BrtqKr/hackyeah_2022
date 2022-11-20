import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StoryList } from '../../../../components/task/StoryList';
import TasksList from '../../../../components/task/TasksList';
import TaskNavigatorHeader from './TaskNavigatorHeader';

const TasksScreen = () => {
  const [currentRoute, setCurrentRoute] = useState<'AllTasksRoute' | 'StoryTasksRoute'>(
    'AllTasksRoute'
  );
  return (
    <>
      <TaskNavigatorHeader route={currentRoute} setRoute={setCurrentRoute} />
      {currentRoute === 'AllTasksRoute' ? <TasksList /> : <StoryList />}
    </>
  );
};

export default TasksScreen;

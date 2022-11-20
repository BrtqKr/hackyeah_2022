import { Colors } from 'react-native/Libraries/NewAppScreen';
import TasksList from '../../../../components/task/TasksList';
import TaskNavigatorHeader from './TaskNavigatorHeader';

const TasksScreen = () => {
  return (
    <>
      <TaskNavigatorHeader />
      <TasksList />
    </>
  );
};

export default TasksScreen;

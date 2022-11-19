import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';

const TasksScreen = () => {
  const { navigate } = useNavigation();

  return (
    <ScreenWrapper
      style={{ paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' }}
      safeArea
    >
      <Text>TASKS SCREEN HEADER</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}></View>
    </ScreenWrapper>
  );
};

export default TasksScreen;
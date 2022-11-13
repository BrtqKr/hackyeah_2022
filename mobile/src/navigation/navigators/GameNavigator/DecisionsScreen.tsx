import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';

const DecisionsScreen = () => {
  const { navigate } = useNavigation();
  return (
    <ScreenWrapper
      style={{ paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' }}
      safeArea
    >
      <Text>DECISIONS HEADER</Text>
    </ScreenWrapper>
  );
};

export default DecisionsScreen;

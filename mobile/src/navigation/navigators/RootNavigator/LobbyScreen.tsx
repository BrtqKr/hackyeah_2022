import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';

const LobbyScreen = () => {
  const { navigate } = useNavigation();

  return (
    <ScreenWrapper
      style={{ paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' }}
      safeArea
    >
      <Text>LOBBY HEADER</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button onPress={() => navigate('GameRoute')} title="Start game" />
      </View>
    </ScreenWrapper>
  );
};

export default LobbyScreen;

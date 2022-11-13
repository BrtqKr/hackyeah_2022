import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';

const MenuScreen = () => {
  const { navigate } = useNavigation();
  return (
    <ScreenWrapper
      style={{ paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' }}
      safeArea
    >
      <Text>MENU HEADER</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button onPress={() => navigate('LobbyRoute')} title="Play" />
      </View>
    </ScreenWrapper>
  );
};

export default MenuScreen;

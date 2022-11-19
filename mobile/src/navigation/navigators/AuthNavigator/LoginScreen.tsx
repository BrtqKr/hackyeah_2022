import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';

const LoginScreen = () => {
  const { navigate } = useNavigation();
  //   const { login } = useAuth();

  return (
    <ScreenWrapper
      style={{ paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' }}
      safeArea
    >
      <Text>LOGIN SCREEN HEADER</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          onPress={() => {
            console.warn('LOGIN');
          }}
          title="Play"
        />
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;

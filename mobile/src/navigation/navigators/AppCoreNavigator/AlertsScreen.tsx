import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

const AlertsScreen = () => {
  const { navigate } = useNavigation();

  return (
    <View>
      <Text>ALERTS SCREEN HEADER</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}></View>
    </View>
  );
};

export default AlertsScreen;

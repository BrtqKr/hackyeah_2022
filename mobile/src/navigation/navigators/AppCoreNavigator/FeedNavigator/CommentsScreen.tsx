import { useNavigation } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';

const CommentsScreen = () => {
  const { navigate } = useNavigation();

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <Text>Comments SCREEN HEADER</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}></View>
    </View>
  );
};

export default CommentsScreen;

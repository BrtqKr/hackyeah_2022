import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

const CommentsScreen = () => {
  const { navigate } = useNavigation();

  return (
<View
    >
      <Text>Comments SCREEN HEADER</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}></View>
    </View>
  );
};

export default CommentsScreen;

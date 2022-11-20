import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeedTasksList } from '../../../../components/feed';
import { ScreenWrapper } from '../../../../components/shared';
import { Colors } from '../../../../theme/Colors';
import { sizeMap } from '../../../../theme/Iconography';
import { FeedNavigatorStackParamList } from './FeedNavigator';

type Navigation = StackNavigationProp<FeedNavigatorStackParamList>;

const FeedScreen = () => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation<Navigation>();

  const HEADER_HEIGHT = top + 275;
  const TOP_OFFSET = top + 16;

  return (
    <ScreenWrapper style={{ backgroundColor: Colors.PrimaryDark }}>
      <View style={[styles.mainTopBar, { paddingTop: TOP_OFFSET }]}>
        <TouchableOpacity onPress={() => navigate('AlertsRoute')}>
          <Feather name={'bell'} size={sizeMap.Regular} color={Colors.White1} />
        </TouchableOpacity>
      </View>
      <FeedTasksList />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    paddingBottom: 100,
    width: '100%',
    backgroundColor: Colors.White1,
  },
  mainTopBar: {
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexShrink: 1,
    paddingVertical: 12,
  },
});

export default FeedScreen;

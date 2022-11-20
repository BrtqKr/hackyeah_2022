import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedStatistics } from '../../../components/profile';
import { AnimatedStatistics2 } from '../../../components/profile/AnimatedStatistics2';
import { ProfileDetails } from '../../../components/profile/ProfileDetails';
import { ScreenWrapper } from '../../../components/shared';
import { Colors } from '../../../theme/Colors';
import { radiusMap } from '../../../theme/Constants';
import { sizeMap } from '../../../theme/Iconography';
import { AppCoreStackParamList } from '../AppCoreNavigator/AppCoreNavigator';

type Navigation = StackNavigationProp<AppCoreStackParamList>;

export const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation<Navigation>();

  const TOP_OFFSET = top + 16;
  return (
    <ScreenWrapper style={{ backgroundColor: Colors.White1 }}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.mainTopBar, { paddingTop: TOP_OFFSET }]}>
        <TouchableOpacity onPress={() => navigate('AlertsRoute')}>
          <Feather name={'bell'} size={sizeMap.Regular} color={Colors.White1} />
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity onPress={() => navigate('EditProfileRoute')}>
          <Feather name={'settings'} size={sizeMap.Regular} color={Colors.White1} />
        </TouchableOpacity>
      </View>
      <View style={styles.topWrapper} />
      <View style={styles.bottomWrapper}>
        <View style={{ zIndex: 20 }}>
          <ProfileDetails />
        </View>

        <AnimatedStatistics />
        <AnimatedStatistics2 />
      </View>
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
    backgroundColor: Colors.PrimaryDark,
  },
  topWrapper: {
    backgroundColor: Colors.PrimaryDark,
    width: '100%',
    height: 120,
  },
  bottomWrapper: {
    backgroundColor: Colors.White1,
    // width: '100%',
    // height: 120,
    borderTopRightRadius: radiusMap.XXLarge,
    borderTopLeftRadius: radiusMap.XXLarge,
    marginTop: -50,
  },
});

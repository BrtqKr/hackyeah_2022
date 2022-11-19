import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Avatar, LineEntry, ScreenWrapper } from '../../../components/shared';
import { fontSize } from '../../../theme/Typography/textProperties';
import { Colors } from '../../../theme/Colors';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppCoreStackParamList } from '../AppCoreNavigator/AppCoreNavigator';
import { AnimatedStatistics } from '../../../components/profile';

type Navigation = StackNavigationProp<AppCoreStackParamList>;

export const Profile = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <ScreenWrapper safeArea>
      <View style={styles.wrapper}>
        <LineEntry
          title="Team Czumpers"
          left={<Avatar size="small" name="Team Czumpers" />}
          right={
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <Feather name="settings" size={24} color={Colors.Secondary3} />
            </TouchableOpacity>
          }
          description="Pronouns"
        />
        <View style={styles.statsWrapper}>
          <AnimatedStatistics />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    width: '100%',
    height: '100%',
  },
  center: {
    alignItems: 'center',
  },
  text: {
    fontSize: fontSize.XXLarge,
    marginTop: 32,
    marginBottom: 32,
  },
  statsWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 24,
    marginTop: 32,
    overflow: 'hidden',
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

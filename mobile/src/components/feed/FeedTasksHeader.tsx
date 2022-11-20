import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { Typography } from '../../theme/Typography/Typography';
import { LeaderboardEntry } from './FeedTaskHeaderImage';

const LEADERBOARD_USERS = [
  {
    firstName: 'Paul',
    lastName: 'Allen',
    tasksCompleted: 12,
    avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
  },
  {
    firstName: 'John',
    lastName: 'Paul',
    tasksCompleted: 11,
    avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
  },
  {
    firstName: 'Patrick',
    lastName: 'Bateman',
    tasksCompleted: 10,
    avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
  },
];

export const FeedTasksHeader = (task: any) => {
  const { top } = useSafeAreaInsets();

  const HEADER_HEIGHT = top + 200;

  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <View style={styles.leaderboardContainer}>
        <LeaderboardEntry user={LEADERBOARD_USERS[1]} />
        <LeaderboardEntry user={LEADERBOARD_USERS[0]} winner />
        <LeaderboardEntry user={LEADERBOARD_USERS[2]} />
      </View>
      <View style={styles.placementLabelWrapper}>
        <View style={styles.placementLabel}>
          <Image
            style={styles.placementLabelAvatar}
            source={{
              uri: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
            }}
          />
          <View style={{ alignItems: 'center', flexGrow: 1 }}>
            <Text style={[Typography.text3, { color: Colors.White1 }]}>
              You are <Text style={{ fontWeight: 'bold' }}>23rd</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.PrimaryDark,
    borderBottomRightRadius: radiusMap.XXLarge,
    borderBottomLeftRadius: radiusMap.XXLarge,
    marginBottom: 24,
  },
  leaderboardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 12,
  },
  placementLabelWrapper: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  placementLabel: {
    paddingLeft: 6,
    paddingRight: 8,
    paddingVertical: 4,
    borderRadius: radiusMap.Circle,
    backgroundColor: 'rgba(255,255,255, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 150,
  },
  placementLabelAvatar: {
    height: 26,
    width: 26,
    paddingHorizontal: 12,
    marginVertical: 2,
    borderRadius: radiusMap.Circle,
    borderWidth: 1,
    borderColor: Colors.White1,
    marginRight: 2,
  },
});

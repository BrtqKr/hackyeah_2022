import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { fontSize } from '../../theme/Typography/textProperties';
import { Typography } from '../../theme/Typography/Typography';

interface LeaderboardEntryProps {
  user: any;
  winner?: boolean;
}
export const LeaderboardEntry = ({ user, winner }: LeaderboardEntryProps) => {
  const AVATAR_SIZE = winner ? 86 : 68;

  return (
    <View style={[styles.container, winner && { marginTop: 12 }]}>
      <Image
        style={[{ height: AVATAR_SIZE, width: AVATAR_SIZE }, styles.avatar]}
        source={{
          uri: user?.avatarUrl,
        }}
      />
      <View style={{ marginTop: 12, alignItems: 'center' }}>
        <Text
          style={[
            Typography.text2,
            { color: Colors.White1, fontSize: fontSize.Large, fontWeight: '300', marginBottom: 2 },
          ]}
        >
          {user.points}
        </Text>
        <Text style={{ color: Colors.White1, fontWeight: '600' }}>{user.firstName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  avatar: {
    borderRadius: radiusMap.Circle,
    borderWidth: 2,
    borderColor: Colors.White1,
  },

  mainTopBar: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 24,
  },
});

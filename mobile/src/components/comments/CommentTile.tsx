import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { radiusMap } from '../../theme/Constants';
import { fontSize } from '../../theme/Typography/textProperties';
import { Typography } from '../../theme/Typography/Typography';

export const CommentTile = ({ comment }: any) => {
  console.warn('comment ', comment);
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={styles.placementLabelAvatar}
            source={{
              uri: comment.author.avatarUrl,
            }}
          />
          <View>
            <Text
              style={[
                Typography.text2,
                { color: Colors.Dark1, fontWeight: '500', marginBottom: 2 },
              ]}
            >
              {comment.author.name}
            </Text>
            <Text style={[Typography.text3, { color: Colors.Dark3, fontWeight: '500' }]}>
              {comment.date}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            flexGrow: 1,
            paddingLeft: 26,
            marginTop: 4,
            width: '100%',
          }}
        >
          <Text style={[Typography.text2, { color: Colors.Dark1, fontSize: fontSize.Small }]}>
            {comment.content}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  placementLabelAvatar: {
    height: 32,
    width: 32,
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 6,
    borderRadius: radiusMap.Circle,
    borderWidth: 1,
    borderColor: Colors.White1,
    marginRight: 4,
  },
});

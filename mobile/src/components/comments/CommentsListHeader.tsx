import { Feather } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import { Colors } from '../../theme/Colors';
import { sizeMap } from '../../theme/Iconography';
import { fontSize } from '../../theme/Typography/textProperties';
import { Typography } from '../../theme/Typography/Typography';

export const CommentsListHeader = (post: any) => (
  <View>
    <Image
      style={{ aspectRatio: 6 / 5 }}
      source={{
        uri: post?.imageUrl ?? undefined,
      }}
    />
    <View
      style={{
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4 }}>
        <Text
          style={[
            Typography.text1,
            {
              color: Colors.Dark1,
              fontSize: fontSize.Large,
              fontWeight: '400',
              marginRight: 4,
            },
          ]}
        >
          {12}
        </Text>
        <Feather name={'heart'} size={sizeMap.Regular} color={Colors.Dark1} />
      </View>
    </View>
  </View>
);

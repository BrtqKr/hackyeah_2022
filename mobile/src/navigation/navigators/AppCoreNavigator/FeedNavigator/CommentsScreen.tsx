import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Api from '../../../../axios/api';
import { CommentsList } from '../../../../components/comments/CommentsList';
import { ScreenWrapper } from '../../../../components/shared';
import { Colors } from '../../../../theme/Colors';
import { radiusMap } from '../../../../theme/Constants';
import { sizeMap } from '../../../../theme/Iconography';
import { fontSize } from '../../../../theme/Typography/textProperties';
import { Typography } from '../../../../theme/Typography/Typography';

const POST = {
  title: 'Run 100km',
  imageUrl:
    'https://cdn.sanity.io/images/y346iw48/production/a59cbb8951fa663a7ffeef5324e1cf7037a70b57-4000x2250.jpg',
  id: '1',
  author: {
    name: 'Patrick Bateman',
    avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
  },
  likedByYou: false,
  description:
    'Lorem ipsum anifqworjqw werij qwrio jwqio rjqweio rqwji roqwjir wqeji rweqji rqewijreiwqrjworjwq weqj rowiq jqwio jrioqwe jriqweo rjqiwoerj qwoijrqweiorjq woirqjwrioqwej roiqw',
  comments: [
    {
      author: {
        name: 'Patrick Bateman',
        avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
      },
      date: '20-11-2022',
      content:
        'Lorem ipsum anifqworjqw werij qwrio jwqio rjqweio rqwji roqwjir wqeji rweqji rqewijreiwqrjworjwq weqj rowiq ',
    },
    {
      author: {
        name: 'Patrick Bateman',
        avatarUrl: 'https://i1.sndcdn.com/avatars-000529882611-ht5r1v-t500x500.jpg',
      },
      date: '20-11-2022',
      content:
        'Lorem ipsum anifqworjqw werij qwrio jwqio rjqweio rqwji roqwjir wqeji rweqji rqewijreiwqrjworjwq weqj rowiq ',
    },
  ],
};

const CommentsScreen = () => {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  const { status, error, data } = useQuery(
    ['getTaskCompletions', { id: 1 }], // query key
    Api.getTasks
  );
  ({});

  const { mutate } = useMutation({
    mutationFn: () => Api.completeTask(1, 2),
    onSuccess: () => {
      console.log('success');
    },
    onError: (error: AxiosError) => console.log({ error: error.name }),
  });

  console.log({ status, data: data?.data });

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <View style={{ position: 'absolute', top: top, left: 12, zIndex: 30 }}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4 }}
        >
          <Feather name={'chevron-left'} size={32} color={Colors.Dark1} />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          style={{ aspectRatio: 6 / 5 }}
          source={{
            uri: POST?.imageUrl ?? undefined,
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
      <View style={{ flex: 1, flexGrow: 1, width: '100%' }}>
        <CommentsList />
      </View>
    </ScreenWrapper>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: radiusMap.XLarge,
    overflow: 'hidden',
  },
  userInfoContainer: {
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  blurWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',

    justifyContent: 'space-between',
  },
  userName: { fontWeight: 'bold', color: Colors.Dark1 },
  userRole: { fontWeight: 'bold', color: Colors.White1, opacity: 0.8 },
});

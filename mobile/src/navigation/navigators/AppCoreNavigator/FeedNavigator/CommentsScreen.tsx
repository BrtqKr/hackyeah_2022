import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { useAuthContext } from '../../../../auth/AuthProvider';
import * as Api from '../../../../axios/api';
import * as ApiTypes from '../../../../axios/types';

const CommentsScreen = () => {
  const { navigate } = useNavigation();
  const { user } = useAuthContext();

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
    <View>
      <Text>Comments SCREEN HEADER</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}></View>
      <Button onPress={() => mutate()} title="Test" />
    </View>
  );
};

export default CommentsScreen;

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';
import { Card } from '../../../components/decisions';

const DecisionsScreen = () => {
  const { navigate } = useNavigation();
  return (
    <ScreenWrapper
      style={{ paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' }}
      safeArea
    >
      <Text>DECISIONS HEADER</Text>
      <Card
        leftText="left text"
        rightText="right text"
        selectLeftOption={() => {
          console.log('xd');
        }}
        selectRightOption={() => {
          console.log('xd');
        }}
      />
    </ScreenWrapper>
  );
};

export default DecisionsScreen;

import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, LineEntry } from '../../../components/shared';
import { fontSize } from '../../../theme/Typography/textProperties';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Profile = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white }}>
      <View style={styles.wrapper}>
        <View style={styles.center}>
          <Avatar size="big" name="Team Czumpers" />
          <Text style={[styles.text]}>Team Czumpers</Text>
        </View>
        <LineEntry
          title="Zdjęcie profilowe"
          topDivider
          description="Zmień moje zdjęcie profilowe"
          bottomDivider
          onPress={() => console.log('Logout me')}
        />
        <LineEntry
          title="Zaimki"
          description="Ustaw swoje zaimki"
          bottomDivider
          onPress={() => console.log('Logout me')}
        />
        <LineEntry
          title="Wyloguj"
          description="Wyloguj mnie z aplikacji"
          bottomDivider
          right={<Feather name="log-out" size={24} color={Colors.Black1} />}
          onPress={() => console.log('Logout me')}
          variant="danger"
        />
      </View>
    </SafeAreaView>
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
});

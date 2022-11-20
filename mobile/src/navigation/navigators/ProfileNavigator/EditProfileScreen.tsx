import { StyleSheet } from 'react-native';
import { LineEntry, ScreenWrapper } from '../../../components/shared';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../../theme/Colors';
import { useAuthContext } from '../../../auth/AuthProvider';

export const EditProfileScreen = () => {
  const { logout } = useAuthContext();
  return (
    <ScreenWrapper style={styles.wrapper}>
      <LineEntry
        title="Set profile photo"
        onPress={() => console.log('Logout me')}
        right={<Feather name="arrow-right" size={24} color={Colors.Secondary3} />}
      />
      <LineEntry
        title="Set your pronouns"
        onPress={() => console.log('Logout me')}
        right={<Feather name="arrow-right" size={24} color={Colors.Secondary3} />}
      />
      <LineEntry
        title="Sign out"
        right={<Feather name="log-out" size={24} color={Colors.Secondary3} />}
        onPress={() => logout()}
        variant="danger"
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});

import { useNavigation } from '@react-navigation/native';
import { FeedTasksList } from '../../../components/feed';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';

const FeedScreen = () => {
  const { navigate } = useNavigation();

  return (
    <ScreenWrapper style={{ paddingHorizontal: 24, alignItems: 'center' }}>
      <FeedTasksList />
    </ScreenWrapper>
  );
};

export default FeedScreen;

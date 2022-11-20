import CircularProgress from 'react-native-circular-progress-indicator';
import { fontSize } from '../../theme/Typography/textProperties';

export const UserStats = () => {
  return (
    <>
      <CircularProgress
        value={10}
        radius={80}
        duration={1000}
        progressValueColor={'#ecf0f1'}
        maxValue={90}
        title={'Position in ranking'}
        titleColor={'black'}
        titleStyle={{ fontWeight: 'bold', fontSize: fontSize.Small }}
      />
      <CircularProgress
        value={10}
        radius={120}
        duration={1500}
        progressValueColor={'#ecf0f1'}
        maxValue={90}
        title={'Missions finished'}
        titleColor={'black'}
        titleStyle={{ fontWeight: 'bold', fontSize: fontSize.Small }}
      />
    </>
  );
};

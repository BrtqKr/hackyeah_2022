import { BlurView } from 'expo-blur';
import { Platform, View, ViewStyle } from 'react-native';

interface Props {
  children?: JSX.Element | JSX.Element[] | null;
  style?: ViewStyle;
}

const BlurWrapper = ({ children, style }: Props) => {
  return Platform.OS === 'android' ? (
    <View style={[{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }, style]}>{children}</View>
  ) : (
    <BlurView intensity={30} tint="dark" style={style}>
      {children}
    </BlurView>
  );
};

export default BlurWrapper;

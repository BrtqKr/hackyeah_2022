import { View, ViewStyle, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children?: JSX.Element | JSX.Element[] | null;
  style?: ViewStyle;
  safeArea?: boolean;
  safeAreaProps?: React.ComponentProps<typeof SafeAreaView>;
}

function ScreenWrapper({ children, style, safeArea = false, safeAreaProps }: Props) {
  const SafeAreaWrapper = safeArea ? SafeAreaView : View;
  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: 'white' }} {...safeAreaProps}>
      <View style={[styles.containerBase, { ...style }]}>{children}</View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  containerBase: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default ScreenWrapper;

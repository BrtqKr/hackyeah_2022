import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/Colors';
import { fontSize } from '../../theme/Typography/textProperties';

interface Props {
  right?: React.ReactElement;
  title: string;
  description?: string;
  topDivider?: boolean;
  bottomDivider?: boolean;
  onPress?: () => void;
  variant?: 'regular' | 'danger';
}

const LineEntryComponent = ({
  title,
  description,
  topDivider = false,
  bottomDivider = false,
  right,
  onPress,
  variant = 'regular',
}: Props) => {
  const isDanger = variant === 'danger';
  return (
    <Pressable onPress={onPress}>
      {({ pressed }: { pressed: boolean }) => (
        <>
          {topDivider && <View style={styles.divider} />}
          <View
            style={[
              onPress
                ? {
                    opacity: pressed ? 0.5 : 1,
                  }
                : {},
            ]}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.main}>
                <Text style={[styles.title, isDanger && styles.danger]}>{title}</Text>
                {description && (
                  <Text style={[styles.description, isDanger && styles.danger]}>{description}</Text>
                )}
              </View>
              {right && <View style={styles.right}>{right}</View>}
            </View>
          </View>
          {bottomDivider && <View style={styles.divider} />}
        </>
      )}
    </Pressable>
  );
};

export default LineEntryComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.Large,
  },
  description: {
    fontSize: fontSize.Small,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.Black5,
    marginVertical: 0,
  },
  main: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  danger: {
    color: Colors.Error,
  },
});

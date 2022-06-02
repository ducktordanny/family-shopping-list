import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import colors from '../theme/colors';

interface ButtonProps {
  label: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export const LabelButton = ({label, style, onPress}: ButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.buttonContainer, style]}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

import {Icons} from '../types/Icons';
import Icon from './Icon';

interface IconLabelButtonProps extends ButtonProps {
  icon: Icons;
}

export const IconLabelButton = ({
  label,
  icon,
  style,
  onPress,
}: IconLabelButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: theme.colors.card},
          style,
        ]}>
        <Icon icon={icon} />
        <Text style={[styles.buttonLabel, {paddingLeft: 5}]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 17,
    color: colors.buttonLabel,
  },
});

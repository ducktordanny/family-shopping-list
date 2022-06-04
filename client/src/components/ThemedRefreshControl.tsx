import {useTheme} from '@react-navigation/native';
import React from 'react';
import {RefreshControl, RefreshControlProps} from 'react-native';

const ThemedRefreshControl = (props: RefreshControlProps) => {
  const theme = useTheme();
  return <RefreshControl tintColor={theme.colors.text} {...props} />;
};

export default ThemedRefreshControl;

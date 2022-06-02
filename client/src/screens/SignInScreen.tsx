import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Logo from '../assets/logo.svg';
import ThemeSwitcher from '../components/ThemeSwitcher';
import {IconLabelButton} from '../components/Buttons';
import {useStoreState} from '../hooks/storeTypedHooks';
import tw from 'tailwind-react-native-classnames';
import useLogin from '../hooks/useLogin';
import {Title} from '../components/Texts';
import Layout from '../containers/Layout';

const SignInScreen = () => {
  const {dark} = useStoreState(state => state.theme);
  const loginWith = useLogin();
  const theme = useTheme();

  const headerContent = (
    <>
      <View></View>
      <Logo style={{marginVertical: 50}} width={128} height={128} />
      <ThemeSwitcher style={styles.themeSwitcherIcon} />
    </>
  );

  const bodyContent = (
    <>
      <Title style={tw`absolute font-normal top-1`}>Sign in</Title>
      <IconLabelButton
        label="With Google"
        icon="google"
        onPress={() => loginWith('google')}
      />
      <IconLabelButton
        label="With Facebook"
        icon="facebook"
        onPress={() => loginWith('facebook')}
      />
    </>
  );

  return (
    <Layout
      header={headerContent}
      body={bodyContent}
      headerStyle={tw`flex-row justify-between`}
      bodyStyle={tw`justify-center items-center`}
    />
  );
};

const styles = StyleSheet.create({
  themeSwitcherIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default SignInScreen;

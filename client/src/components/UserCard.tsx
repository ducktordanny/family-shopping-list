import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import globStyles from '../styles';
import {UserWithLessData} from '../types/UserProps';
import {SubTitle} from './Texts';

const UserCard = ({user}: {user: UserWithLessData}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        tw`flex-row items-center`,
        globStyles.card,
        {backgroundColor: theme.colors.card},
      ]}>
      <Image
        style={[tw`rounded-full`, {width: 50, height: 50}]}
        source={{uri: user.picture || 'https://i.imgur.com/Yrz6oBC.png'}}
      />
      <SubTitle style={tw`m-0 ml-3`}>{user.name}</SubTitle>
    </View>
  );
};

export default UserCard;

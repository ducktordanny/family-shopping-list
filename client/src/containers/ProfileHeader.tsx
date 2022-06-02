import React from 'react';
import {View, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Logout from '../components/Logout';
import {Title, Label, SubTitle} from '../components/Texts';
import ThemeSwitcher from '../components/ThemeSwitcher';
import {capitalizeFirst} from '../lib/strings';
import HeaderView from './HeaderView';

// picture, name, provider, email, memberSince
export interface ProfileHeaderProps {
  picture: string;
  name: string;
  provider: string;
  email: string;
  memberSince: Date;
}

const ProfileHeader = ({
  picture,
  name,
  provider,
  email,
  memberSince,
}: ProfileHeaderProps) => {
  return (
    <HeaderView style={tw`flex-row justify-between`}>
      <Logout />
      <View style={tw`items-center`}>
        <Image
          style={[tw`rounded-full`, {width: 60, height: 60}]}
          source={{
            uri: picture,
          }}
        />
        <Title>{name}</Title>
        <Label>Logged in via {capitalizeFirst(provider)}</Label>
        <Label>{email}</Label>
        <SubTitle>Member since</SubTitle>
        <Label>{memberSince.toDateString()}</Label>
      </View>
      <ThemeSwitcher style={tw`absolute top-0 right-0`} />
    </HeaderView>
  );
};

export default ProfileHeader;

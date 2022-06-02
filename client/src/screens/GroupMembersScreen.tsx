import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {UserWithLessData} from '../types/UserProps';
import GoBackIcon from '../components/GoBackIcon';
import {Title} from '../components/Texts';
import tw from 'tailwind-react-native-classnames';
import UserCard from '../components/UserCard';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/NavigationProps';
import axios from 'axios';
import API, {getHeaders} from '../API';
import {useStoreState} from '../hooks/storeTypedHooks';
import Loading from '../components/Loading';
import ThemedRefreshControl from '../components/ThemedRefreshControl';
import Layout from '../containers/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupMembers'>;
type GroupMembersScreenRouteProp = Props['route'];

const GroupMembersScreen = () => {
  const {productId, name} = useRoute<GroupMembersScreenRouteProp>().params;
  const token = useStoreState(state => state.user.token);
  const [members, setMembers] = useState<UserWithLessData[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // TODO: refactor: maybe we should make a hook for this
  const getMembers = async () => {
    if (token === undefined) return;
    const response = await axios.get(
      API(`/groups/members/${productId}`),
      getHeaders(token),
    );
    setMembers(response.data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const refreshMembers = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => getMembers().then(() => setRefreshing(false)), 250);
  }, []);

  const headerContent = (
    <>
      <GoBackIcon />
      <Title style={tw`m-0`}>{name}</Title>
      <View style={{width: 20}}></View>
    </>
  );

  const bodyContent = (
    <>
      {members ? (
        <FlatList
          style={{paddingTop: 15, paddingHorizontal: 15, width: '100%'}}
          data={members}
          renderItem={({item}) => <UserCard user={item} />}
          keyExtractor={item => item._id!}
          refreshControl={
            <ThemedRefreshControl
              refreshing={refreshing}
              onRefresh={refreshMembers}
            />
          }
        />
      ) : (
        <Loading />
      )}
    </>
  );

  return <Layout header={headerContent} body={bodyContent} />;
};

export default GroupMembersScreen;

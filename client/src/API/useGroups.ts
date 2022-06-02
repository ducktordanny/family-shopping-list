import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

import API, {getHeaders} from './';
import GroupProps from '../types/GroupProps';

const useGroups = (userId: string | undefined, token: string | undefined) => {
  const [groups, setGroups] = useState<GroupProps[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getGroups = async () => {
    try {
      if (token === undefined || userId === undefined)
        throw new Error('User not found.');

      const response = await axios.get(
        API(`/groups/user/${userId}`),
        getHeaders(token!),
      );

      if (response.data.length === 0) setGroups([]);
      else {
        setGroups(response.data.reverse());
      }
    } catch (err) {
      console.log('HERE');
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('First getting groups');
    getGroups();
  }, [userId, token]);

  const addGroup = (newGroup: GroupProps) => {
    setGroups(current =>
      current !== null ? [newGroup, ...current] : [newGroup],
    );
  };

  /**
   * @param showRefresh Settings whether it should show the refreshing or not...
   */
  const refreshGroups = useCallback((showRefresh: boolean = true) => {
    setRefreshing(showRefresh);
    getGroups().then(() => setRefreshing(false));
  }, []);

  return {groups, addGroup, refreshing, refreshGroups};
};

export default useGroups;

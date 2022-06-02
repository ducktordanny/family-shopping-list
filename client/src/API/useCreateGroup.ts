import axios from 'axios';

import GroupProps from '../types/GroupProps';
import API, {getHeaders} from './';

const useCreateGroup = (token: string | undefined) => {
  const createGroup = async (
    groupName: string,
  ): Promise<GroupProps | undefined> => {
    try {
      if (token === undefined) throw new Error('User not logged in.');

      const response = await axios.post(
        API(`/groups/create`),
        {
          name: groupName,
        },
        getHeaders(token),
      );
      const {_id, userIds, createdBy, name, createdAt} = response.data;
      return {
        _id,
        userIds,
        createdBy,
        name,
        createdAt,
      };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  return createGroup;
};

export default useCreateGroup;

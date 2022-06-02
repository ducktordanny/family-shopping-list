import {UserWithLessData} from './UserProps';

/**
 * interface for product what comes from the database
 */
interface ProductProps {
  _id: string;
  content: string;
  important: boolean;
  addedBy: UserWithLessData;
  boughtBy: UserWithLessData | null;
  boughtAt: Date | null;
  createdAt: Date;
}

export default ProductProps;

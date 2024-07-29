import { Status } from '../enums/status.enum';
import { Author } from './author.interface';

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: Date; 
  image: string;
  caption: string;
  price: number;
  isFavorite: boolean;
  status: Status;
  author: Author;
}

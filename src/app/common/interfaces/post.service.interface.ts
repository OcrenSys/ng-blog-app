import { Observable } from 'rxjs';
import { Post } from './post.interface';

export interface PostServiceInterface {
  getMorePosts(): void;
  getPostById(id: number): void;
}

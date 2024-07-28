import { Observable } from 'rxjs';
import { Post } from './post.interface';

export interface PostServiceInterface {
  data$: Observable<Post[]>;
  getMorePosts(): void;
  getPostById(id: number): void;
}

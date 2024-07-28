import { Observable } from 'rxjs';
import { Post } from '../../../common/interfaces/post.interface';

export interface PostServiceOperations {
  data$: Observable<Post[]>;
  getMorePosts(): void;
}

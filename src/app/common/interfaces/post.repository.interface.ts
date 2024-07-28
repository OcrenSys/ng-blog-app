import { Observable } from 'rxjs';
import { Post } from './post.interface';

export interface PostRepositoryInterface {
  getAllPosts(): Observable<Post[]>;
}

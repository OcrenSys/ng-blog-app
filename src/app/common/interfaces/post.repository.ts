import { Observable } from 'rxjs';
import { Post } from './post.interface';

export interface PostRepository {
  getAllPosts(): Observable<Post[]>;
}

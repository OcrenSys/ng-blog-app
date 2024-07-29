import { Observable } from 'rxjs';
import { Post } from './post.interface';

export interface PostServiceInterface {
  getMorePosts(): void;
  getPostById(id: number): void;
  create(
    Post: Pick<Post, 'title' | 'subtitle' | 'description' | 'price'>
  ): Observable<Post>;
  update(
    id: number,
    post: Pick<Post, 'title' | 'subtitle' | 'description' | 'price'>
  ): Observable<Post>;
  delete(id: number): Observable<Post[]>;
}

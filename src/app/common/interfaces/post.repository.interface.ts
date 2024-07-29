import { Observable } from 'rxjs';
import { Post } from './post.interface';

export interface PostRepositoryInterface {
  getAllPosts(): Observable<Post[]>;
  getPostById(id: number): Observable<Post>;
  setFavoriteStatus(id: number, isFavorite: boolean): Observable<Post>;
}

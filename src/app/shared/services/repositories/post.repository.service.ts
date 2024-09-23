import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Post } from '../../../common/interfaces/post.interface';
import { PostRepositoryInterface } from '../../../common/interfaces/post.repository.interface';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Author } from '../../../common/interfaces/author.interface';

@Injectable({
  providedIn: 'root',
})
export class PostRepository implements PostRepositoryInterface {
  private baseUrl = 'http://localhost:3000';
  private postUrl = `${this.baseUrl}/posts`;
  private authorUrl = `${this.baseUrl}/authors`;

  private httpClient: HttpClient = inject(HttpClient);

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.postUrl).pipe(
      switchMap((posts: Post[]) => {
        const authorRequests = posts.map((post) => {
          const authorId =
            typeof post.author === 'number' ? post.author : post.author.id;

          return this.httpClient
            .get<Author[]>(`${this.authorUrl}?id=${authorId}`)
            .pipe(
              map(([author, ...rest]: Author[]) => author),
              catchError(this.handleError),
            );
        });

        return forkJoin(authorRequests).pipe(
          map((authors) => {
            return posts.map((post, index) => ({
              ...post,
              author: authors[index],
            }));
          }),
          tap((posts) => posts.sort((prev, next) => next.id - prev.id)),
        );
      }),
      catchError(this.handleError),
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post[]>(`${this.postUrl}?id=${id}`).pipe(
      map(([post, ...rest]: Post[]) => post),
      switchMap((post: Post) => {
        const authorId =
          typeof post.author === 'number' ? post.author : post.author.id;

        return forkJoin({
          post: of(post),
          author: this.httpClient
            .get<Author[]>(`${this.authorUrl}?id=${authorId}`)
            .pipe(map(([author, ...rest]: Author[]) => author)),
        }).pipe(
          map(({ post, author }) => ({
            ...post,
            author,
          })),
          catchError(this.handleError),
        );
      }),
      catchError(this.handleError),
    );
  }

  createPost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Post>(this.postUrl, post, { headers });
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.postUrl}/${id}`;

    return this.httpClient.patch<Post>(url, post, { headers });
  }

  deletePost(id: number): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.postUrl}/${id}`;

    return this.httpClient.delete<Post>(url, { headers });
  }

  setFavoriteStatus(id: number, isFavorite: boolean): Observable<Post> {
    const url = `${this.postUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { isFavorite };

    return this.httpClient.patch<Post>(url, body, { headers });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(
      `Something went wrong; please try again later. Error: ${error.message}`,
    );
  }
}

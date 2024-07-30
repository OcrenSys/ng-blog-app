import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Post } from '../../../common/interfaces/post.interface';
import { PostRepositoryInterface } from '../../../common/interfaces/post.repository.interface';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Author } from '../../../common/interfaces/author.interface';

@Injectable({
  providedIn: 'root',
})
export class PostRepository implements PostRepositoryInterface {
  private apiUrl =
    'https://my-json-server.typicode.com/ocrensys/ng-blog-app-db/posts';
  private authorUrl =
    'https://my-json-server.typicode.com/ocrensys/ng-blog-app-db/authors/';

  private httpClient: HttpClient = inject(HttpClient);

  /**
   * *! can be implemented only for posts hosted on the server
   *  */
  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiUrl).pipe(
      switchMap((posts: Post[]) => {
        const authorRequests = posts.map((post) =>
          this.httpClient
            .get<Author>(`${this.authorUrl}${post.author}`)
            .pipe(catchError(this.handleError))
        );

        return forkJoin(authorRequests).pipe(
          map((authors) => {
            return posts.map((post, index) => ({
              ...post,
              author: authors[index],
            }));
          })
        );
      }),
      catchError(this.handleError)
    );
  }

  getPost(
    id: number,
    postsSubject: BehaviorSubject<Post[]>
  ): Observable<Post | undefined> {
    return postsSubject.asObservable().pipe(
      map((posts: Post[]) => posts.find((post) => post.id === id)),
      catchError(this.handleError)
    );
  }

  /**
   * *! can be implemented only for posts hosted on the server
   *  */
  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiUrl}/${id}`).pipe(
      switchMap((post: Post) =>
        combineLatest([
          of(post),
          this.httpClient.get<Author>(`${this.authorUrl}${post.author}`),
        ])
      ),
      map(([post, author]) => ({ ...post, author })),
      catchError(this.handleError)
    );
  }

  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Post>(this.apiUrl, post, { headers });
  }

  updatePost(
    id: number,
    post: Partial<Post>,
    posts: Post[]
  ): Observable<Post[]> {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((p) => p.id === id);

    if (postIndex !== -1) {
      updatedPosts[postIndex] = { ...updatedPosts[postIndex], ...post };
    }
    return of(updatedPosts);
  }

  deletePost(id: number, posts: Post[]): Observable<Post[]> {
    const updatedPosts = posts.filter((post) => post.id !== id);
    return of(updatedPosts);
  }

  setFavoriteStatus(id: number, isFavorite: boolean): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { isFavorite };

    return this.httpClient.patch<Post>(url, body, { headers });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(
      `Something went wrong; please try again later. Error: ${error.message}`
    );
  }
}

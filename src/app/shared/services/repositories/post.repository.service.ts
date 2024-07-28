import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../../common/interfaces/post.interface';
import { PostRepositoryInterface } from '../../../common/interfaces/post.repository.interface';
import {
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(
      `Something went wrong; please try again later. Error: ${error.message}`
    );
  }
}

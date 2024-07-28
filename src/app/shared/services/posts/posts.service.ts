import { Injectable } from '@angular/core';
import { Post } from '../../../common/interfaces/post.interface';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { PostRepository } from '../repositories/post.repository.service';
import { PostServiceInterface } from '../../../common/interfaces/post.service.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService implements PostServiceInterface {
  private dataSubject = new BehaviorSubject<Post[]>([]);
  private currentPageSubject = new BehaviorSubject<number>(1);
  private itemsToShow = 3;

  data$ = this.dataSubject.asObservable();
  posts$: Observable<Post[]> = new Observable<Post[]>();
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(private postRepository: PostRepository) {}

  loadPosts(): void {
    this.loadInitialPosts();
    this.posts$ = combineLatest([this.data$, this.currentPageSubject]).pipe(
      map(([posts, page]) => posts.slice(0, page * this.itemsToShow))
    );
  }

  private loadInitialPosts(): void {
    this.postRepository.getAllPosts().subscribe((posts) => {
      this.dataSubject.next(posts);
      this.loading$.next(false);
    });
  }

  getMorePosts(): void {
    const currentPage = this.currentPageSubject.value + 1;
    this.currentPageSubject.next(currentPage);
  }

  getPostById(id: number): Observable<Post> {
    return this.postRepository
      .getPostById(id)
      .pipe(finalize(() => this.loading$.next(false)));
  }
}

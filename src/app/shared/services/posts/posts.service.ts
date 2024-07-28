import { Injectable } from '@angular/core';
import { Post } from '../../../common/interfaces/post.interface';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { finalize, map, distinctUntilChanged } from 'rxjs/operators';
import { PostRepository } from '../repositories/post.repository.service';
import { PostServiceInterface } from '../../../common/interfaces/post.service.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService implements PostServiceInterface {
  private currentPageSubject = new BehaviorSubject<number>(1);
  private postsSubject = new BehaviorSubject<Post[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');
  private readonly pageSize = 4;

  public loadingSubject = new BehaviorSubject<boolean>(true);
  public resultsSubject = new BehaviorSubject<number>(0);
  public posts$: Observable<Post[]>;

  constructor(private postRepository: PostRepository) {
    this.posts$ = this.initializePostsStream();
    this.loadPosts();
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  getMorePosts(): void {
    const currentPage = this.currentPageSubject.value + 1;
    this.currentPageSubject.next(currentPage);
  }

  getPostById(id: number): Observable<Post> {
    return this.postRepository
      .getPostById(id)
      .pipe(finalize(() => this.loadingSubject.next(false)));
  }

  private loadPosts(): void {
    this.postRepository.getAllPosts().subscribe((posts) => {
      this.postsSubject.next(posts);
      this.loadingSubject.next(false);
    });
  }

  private initializePostsStream(): Observable<Post[]> {
    return combineLatest([
      this.postsSubject.asObservable(),
      this.searchTermSubject.asObservable().pipe(distinctUntilChanged()),
      this.currentPageSubject.asObservable(),
    ]).pipe(
      map(([posts, searchTerm, page]) => {
        const filteredPosts = this.filterPosts(posts, searchTerm);
        this.resultsSubject.next(filteredPosts.length);
        return this.paginatePosts(filteredPosts, page);
      })
    );
  }

  private filterPosts(posts: Post[], term: string): Post[] {
    if (!term) return posts;

    const lowerCaseTerm = term.toLowerCase();
    return posts.filter((post) => {
      const titleMatches = post.title.toLowerCase().includes(lowerCaseTerm);
      const subtitleMatches = post.subtitle
        .toLowerCase()
        .includes(lowerCaseTerm);
      const descriptionMatches = post.description
        .toLowerCase()
        .includes(lowerCaseTerm);

      return titleMatches || subtitleMatches || descriptionMatches;
    });
  }

  private paginatePosts(posts: Post[], page: number): Post[] {
    const startIndex = (page - 1) * this.pageSize;
    return posts.slice(0, startIndex + this.pageSize);
  }
}

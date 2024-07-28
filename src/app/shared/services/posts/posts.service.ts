import { Injectable } from '@angular/core';
import { Post } from '../../../common/interfaces/post.interface';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { finalize, map, distinctUntilChanged } from 'rxjs/operators';
import { PostRepository } from '../repositories/post.repository.service';
import { PostServiceInterface } from '../../../common/interfaces/post.service.interface';
import { AuthService } from '../auth/auth.service';
import { FavoritesService } from '../favorites/favorites.service';

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

  constructor(
    private postRepository: PostRepository,
    private favoriteService: FavoritesService,
    private authService: AuthService
  ) {
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
      this.postsSubject.next(this.checkFavorites(posts));
      this.loadingSubject.next(false);
    });
  }

  private checkFavorites(posts: Post[]): Post[] {
    const currentUser = this.authService.getCurrentUserEmail();
    if (currentUser) {
      const favoritePostIds = this.favoriteService.getFavorites(currentUser);

      const updatedPosts = posts.map((post) => ({
        ...post,
        isFavorite: favoritePostIds.includes(post.id.toString()),
      }));

      return updatedPosts;
    }

    return posts;
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

  createPost(post: any): Observable<Post> {
    return this.postRepository.createPost(post);
  }

  favorite(id: number): void {
    this.updatePostFavoriteStatus(id, true);
  }

  unFavorite(id: number): void {
    this.updatePostFavoriteStatus(id, false);
  }

  private updatePostFavoriteStatus(id: number, isFavorite: boolean): void {
    const posts = this.postsSubject.getValue();
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex !== -1) {
      posts[postIndex] = { ...posts[postIndex], isFavorite };
      this.postRepository
        .setFavoriteStatus(id, isFavorite)
        .subscribe((response) => {
          console.log(response);
          this.updateFavoriteStorage(id);
        });
      this.postsSubject.next(posts);
    }
  }

  updateFavoriteStorage(id: number) {
    const currentUserEmail = this.authService.getCurrentUserEmail();
    if (currentUserEmail) {
      this.favoriteService.saveFavorite(currentUserEmail, id.toString());
    }
  }
}

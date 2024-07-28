import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  finalize,
  map,
  Observable,
} from 'rxjs';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../../common/interfaces/post.interface';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import console from 'console';
import { InMemoryPostRepository } from '../../../shared/services/posts/memory.repository';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, CardComponent, SpinnerComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  posts$: Observable<Post[]> = new Observable<Post[]>();
  loading$: Observable<boolean> = new Observable<boolean>();

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.posts$;
    this.loading$ = this.postService.loading$;
  }

  loadMore(): void {
    this.postService.getMorePosts();
  }
}

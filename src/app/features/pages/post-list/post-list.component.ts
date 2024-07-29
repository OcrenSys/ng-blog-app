import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Observable } from 'rxjs';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../../common/interfaces/post.interface';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

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
    this.loading$ = this.postService.loadingSubject;
  }

  loadMore(): void {
    this.postService.getMorePosts();
  }
}

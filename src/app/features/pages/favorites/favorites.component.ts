import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../../../common/interfaces/post.interface';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CardComponent, SpinnerComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  posts$: Observable<Post[]> = new Observable<Post[]>();
  loading$: Observable<boolean> = new Observable<boolean>();

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.posts$.pipe(
      map((posts: Post[]) => posts.filter((post) => post.isFavorite))
    );
    this.loading$ = this.postService.loadingSubject;
  }
}

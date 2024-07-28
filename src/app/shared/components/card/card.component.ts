import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '../../../common/interfaces/post.interface';
import { StatusDirective } from '../../directives/status/status.directive';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, StatusDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() post: Post | undefined;

  constructor(private postService: PostsService) {}

  toggleFavorite(): void {
    if (!this.post?.isFavorite) this.postService.favorite(this.post?.id ?? 0);
    else this.postService.unFavorite(this.post.id ?? 0);
  }
}

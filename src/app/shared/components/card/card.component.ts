import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '../../../common/interfaces/post.interface';
import { StatusDirective } from '../../directives/status/status.directive';
import { PostsService } from '../../services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';
import { SigninComponent } from '../signin/signin.component';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, StatusDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() post: Post | undefined;

  constructor(
    private postService: PostsService,
    private authSerive: AuthService,
    private dynamicComponentService: DynamicComponentService
  ) {}

  onFavorite($event: Event): void {
    if ($event) $event.stopPropagation();

    if (this.authSerive.isLogged()) {
      if (!this.post?.isFavorite) this.postService.favorite(this.post?.id ?? 0);
      else this.postService.unFavorite(this.post.id ?? 0);
    } else {
      this.onOpen();
    }
  }

  onOpen() {
    this.dynamicComponentService.loadComponent(SigninComponent);
    this.dynamicComponentService.modal.show();
  }
}

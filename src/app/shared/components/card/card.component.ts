import { CommonModule } from '@angular/common';
import { Component, Input, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '../../../common/interfaces/post.interface';
import { StatusDirective } from '../../directives/status/status.directive';
import { PostsService } from '../../services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';
import { SigninComponent } from '../signin/signin.component';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';
import { FormComponent } from '../form/form.component';
import { SignupComponent } from '../signup/signup.component';
import { take } from 'rxjs';

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

  get isLogged(): boolean {
    return this.authSerive.isLogged();
  }

  onFavorite($event: Event): void {
    if ($event) $event.stopPropagation();

    if (this.authSerive.isLogged()) {
      if (!this.post?.isFavorite) this.postService.favorite(this.post?.id ?? 0);
      else this.postService.unFavorite(this.post.id ?? 0);
    } else {
      this.onOpen(SigninComponent);
    }
  }

  onEdit($event: Event): void {
    $event.stopPropagation();
    this.onOpen(FormComponent, this.post);
  }

  onDelete($event: Event): void {
    $event.stopPropagation();
    this.postService.delete(this.post?.id!).pipe(take(1)).subscribe();
  }

  onOpen(
    component: Type<SigninComponent | SignupComponent | FormComponent>,
    data?: unknown
  ) {
    this.dynamicComponentService.loadComponent(component, data);
    this.dynamicComponentService.modal.show();
  }
}

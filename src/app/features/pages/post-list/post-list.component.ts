import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Observable } from 'rxjs';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../../common/interfaces/post.interface';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { SigninComponent } from '../../../shared/components/signin/signin.component';
import { DynamicComponentService } from '../../../shared/services/dynamic-components/dynamic-component.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, CardComponent, SpinnerComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements AfterViewInit {
  @ViewChild('link', { static: true }) link!: ElementRef<HTMLAnchorElement>;

  posts$: Observable<Post[]> = new Observable<Post[]>();
  loading$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private postService: PostsService,
    private dynamicComponentService: DynamicComponentService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.posts$;
    this.loading$ = this.postService.loadingSubject;
  }

  loadMore(): void {
    this.postService.getMorePosts();
  }

  ngAfterViewInit() {
    if (this.link) {
      this.link.nativeElement.addEventListener(
        'click',
        this.onLinkClick.bind(this)
      );
    } else {
      console.log('Link element not found');
    }
  }

  onLinkClick(event: MouseEvent) {
    event.preventDefault();
    this.openModal();
  }

  openModal() {
    this.dynamicComponentService.loadComponent(SigninComponent);
  }
}

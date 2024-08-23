import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Post } from '../../../common/interfaces/post.interface';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { RepeatPipe } from '../../../shared/pipes/repeat/repeat.pipe';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RepeatPipe],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private id: number = 0;
  protected post: Post | undefined;
  protected loading$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private activateRoute: ActivatedRoute,
    private postService: PostsService,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.postService.loadingSubject;

    this.activateRoute.paramMap.subscribe({
      next: (params) => {
        const idParam = params.get('id');
        if (idParam) {
          this.id = parseInt(idParam);
          if (this.id) {
            this.postService
              .getPostById(this.id)
              .pipe(take(1))
              .subscribe((_post: Post) => {
                this.post = _post;
              });
          }
        }
      },
      error: (error) => {
        console.error('Something went wrong', error);
      },
      complete: () => {},
    });
  }

  protected goBack(): void {
    window.history.back();
  }
}

import { Component } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { PostsService } from '../../services/posts/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  private searchSubject$ = new Subject<string>();
  protected result$ = new BehaviorSubject<number>(0);

  constructor(private postsService: PostsService) {
    this.searchSubject$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.postsService.setSearchTerm(term));

    this.result$ = this.postsService.resultsSubject;
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject$.next(target.value);
  }
}

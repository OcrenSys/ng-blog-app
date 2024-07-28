import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '../../../common/interfaces/post.interface';
import { StatusDirective } from '../../directives/status/status.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, StatusDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() post: Post | undefined;
}

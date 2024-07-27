import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  protected posts = [
    {
      id: 1,
      title: 'Exploring the Future of Tech',
      description: 'Discover how technology is shaping tomorrow...',
      price: '$49/MO',
      author: 'Tech Visionary',
      date: 'JUL 20',
      imageUrl: 'path/to/image1.jpg',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'Art of Minimalist Living',
      description: 'Embrace simplicity with minimalist design...',
      price: '$29/MO',
      author: 'Design Guru',
      date: 'JUN 18',
      imageUrl: 'path/to/image2.jpg',
      isFeatured: false,
    },
    {
      id: 3,
      title: 'Culinary Delights Around the World',
      description: 'Experience global flavors and unique dishes...',
      price: '$39/MO',
      author: 'Food Explorer',
      date: 'MAY 10',
      imageUrl: 'path/to/image3.jpg',
      isFeatured: true,
    },
    {
      id: 4,
      title: 'Mindful Meditation Techniques',
      description: 'Learn effective ways to calm the mind...',
      price: '$19/MO',
      author: 'Zen Master',
      date: 'APR 25',
      imageUrl: 'path/to/image4.jpg',
      isFeatured: false,
    },
    {
      id: 5,
      title: 'Advancements in AI Technology',
      description: 'Explore how AI is transforming industries...',
      price: '$59/MO',
      author: 'AI Enthusiast',
      date: 'MAR 15',
      imageUrl: 'path/to/image5.jpg',
      isFeatured: true,
    },
    {
      id: 6,
      title: 'The Art of Digital Photography',
      description: 'Capture stunning visuals with these tips...',
      price: '$45/MO',
      author: 'Photo Artist',
      date: 'FEB 12',
      imageUrl: 'path/to/image6.jpg',
      isFeatured: false,
    },
  ];
}

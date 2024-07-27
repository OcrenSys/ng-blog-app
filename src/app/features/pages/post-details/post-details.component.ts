import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  postId: string | null = '';
  post: any = {
    id: 1,
    title:
      'Should I work remotely or will it put a strain on my long-term career?',
    avatar:
      'https://dy7glz37jgl0b.cloudfront.net/advice/images/3f64195ec17bf2d488a315987f4861e5-woman-smiles-while-crossing-the-street-in-a-city_l.jpg',
    image:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/12/Remote_Job.jpeg.jpg',
    description:
      'As part of our ongoing effort to enhance the traveler journey, we’re proud to partner with Portland International Airport (PDX) on the launch of a pilot program designed to shorten rider wait times at pickup.',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    price: '$49/MO',
    author: 'Tech Visionary',
    date: 'JUL 20',
    imageUrl: 'path/to/image1.jpg',
    isFeatured: true,
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('id');
      console.log('Id: ', this.postId);
    });
  }

  goBack(): void {
    window.history.back();
  }
}

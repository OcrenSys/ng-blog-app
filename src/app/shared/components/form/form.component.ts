import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PostsService } from '../../services/posts/posts.service';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';
import { Post } from '../../../common/interfaces/post.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  @Input() data: Post | undefined;
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostsService,
    private dynamicComponentService: DynamicComponentService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.postForm.patchValue({
        title: this.data.title,
        subtitle: this.data.subtitle,
        description: this.data.description,
        price: this.data.price,
      });
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      const { title, subtitle, description, price } = this.postForm.value;

      if (this.data) {
        this.update({ title, subtitle, description, price });
      } else {
        this.create({ title, subtitle, description, price });
      }
    }
  }

  create(data: any) {
    this.postService
      .create(data)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.postForm.reset();
          this.dynamicComponentService.modal.hide();
        },
      });
  }

  update(data: any) {
    this.postService
      .update(this.data?.id as number, data)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.postForm.reset();
          this.dynamicComponentService.modal.hide();
        },
      });
  }
}

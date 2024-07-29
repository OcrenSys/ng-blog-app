import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dynamicComponentService: DynamicComponentService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignUp() {
    if (this.signupForm.valid) {
      const { email, fullname, password } = this.signupForm.value;
      const success = this.authService.signUp({ email, fullname, password });
      if (success) {
        this.signupForm.reset();
      }
    }
  }

  switchToSignIn() {
    this.dynamicComponentService.loadComponent(SigninComponent);
  }
}

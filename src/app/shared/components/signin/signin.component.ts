import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dynamicComponentService: DynamicComponentService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSignIn() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      const success = this.authService.signIn(email, password);
      if (success) {
        this.signinForm.reset();
        this.dynamicComponentService.modal.hide();
      }
    }
  }

  switchToSignUp() {
    this.dynamicComponentService.loadComponent(SignupComponent);
  }
}

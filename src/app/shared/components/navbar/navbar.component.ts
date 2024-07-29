import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { menu } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  protected signInComponent = SigninComponent;
  protected signUpComponent = SignupComponent;
  protected label$ = new BehaviorSubject<string>('Login');
  protected menu = menu;

  constructor(
    private dynamicComponentService: DynamicComponentService,
    private authSerive: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authSerive.isLogged()) this.authSerive.labelSubject.next('Logout');
    this.label$ = this.authSerive.labelSubject;
  }

  onClick(): void {
    if (!this.authSerive.isLogged()) this.onOpen();
    else this.authSerive.signOut();
  }

  onOpen(): void {
    this.dynamicComponentService.loadComponent(SigninComponent);
    this.dynamicComponentService.modal.show();
  }
}

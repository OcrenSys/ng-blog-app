import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  protected signInComponent = SigninComponent;
  protected signUpComponent = SignupComponent;

  constructor(private dynamicComponentService: DynamicComponentService) {}

  menu = [
    { label: 'Articles', path: '/posts' },
    { label: 'Favorites', path: '/posts/favorites' },
  ];

  openModal(component: Type<SigninComponent | SignupComponent>) {
    this.dynamicComponentService.loadComponent(component);
  }
}

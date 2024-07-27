import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menu = [
    { label: 'Articles', path: '' },
    { label: 'Favorites', path: '' },
  ];
}

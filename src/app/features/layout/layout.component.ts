import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PostListComponent } from '../pages/post-list/post-list.component';
import { SearchbarComponent } from '../../shared/components/searchbar/searchbar.component';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [PostListComponent, SearchbarComponent, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    console.log('\nLayoutComponent...\n\n\n');

    initFlowbite();
  }
}

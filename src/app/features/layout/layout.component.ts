import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PostListComponent } from '../pages/post-list/post-list.component';
import { SearchbarComponent } from '../../shared/components/searchbar/searchbar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { DynamicComponentService } from '../../shared/services/dynamic-components/dynamic-component.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    PostListComponent,
    SearchbarComponent,
    NavbarComponent,
    ModalComponent,
    CardComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild(ModalComponent)
  modal!: ModalComponent;

  constructor(private dynamicService: DynamicComponentService) {}

  ngOnInit(): void {
    initFlowbite();
  }

  ngAfterViewInit(): void {
    if (this.modal) {
      this.dynamicService.modal = this.modal;
    } else console.log('Modal not found');
  }
}

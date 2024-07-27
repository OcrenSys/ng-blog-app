import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { DynamicFormDirective } from '../../directives/dynamic-form/dynamic-form.directive';
import { CommonModule } from '@angular/common';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DynamicFormDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements AfterViewInit {
  @ViewChild(DynamicFormDirective, { static: true })
  private _component!: DynamicFormDirective;

  constructor(private service: DynamicComponentService) {}

  getTitle(): string {
    return this.service.title;
  }

  ngAfterViewInit() {
    this.service.setViewContainerRef(this._component.viewContainerRef);
  }
}

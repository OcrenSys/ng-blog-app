import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicFormDirective } from '../../directives/dynamic-form/dynamic-form.directive';
import { CommonModule } from '@angular/common';
import { DynamicComponentService } from '../../services/dynamic-components/dynamic-component.service';
import { Modal } from 'flowbite';
import {
  options,
  instanceOptions,
} from '../../../common/utilities/modal.utilities';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DynamicFormDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modal', { static: false })
  private readonly _modal!: ElementRef<HTMLDivElement>;

  @ViewChild(DynamicFormDirective, { static: true })
  private _component!: DynamicFormDirective;

  constructor(private service: DynamicComponentService) {}

  getTitle(): string {
    return this.service.title;
  }

  ngAfterViewInit() {
    if (this._modal) {
      this.service.modal = new Modal(
        this._modal.nativeElement,
        options,
        instanceOptions
      );
    }

    this.service.setViewContainerRef(this._component.viewContainerRef);
  }

  onClose() {
    this.service.modal.hide();
  }
}

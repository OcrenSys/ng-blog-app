import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Status } from '../../../common/enums/status.enum';

@Directive({
  selector: '[status]',
  standalone: true,
})
export class StatusDirective {
  @Input() status: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.updateColor();
    }
  }

  private updateColor(): void {
    let colorClass = '';

    switch (this.status) {
      case Status.onSale:
        colorClass = 'bg-green-500';
        break;
      case Status.onOffer:
        colorClass = 'bg-yellow-300';
        break;
      case Status.soldOut:
        colorClass = 'bg-red-500';
        break;
      default:
        colorClass = '';
    }

    this.renderer.removeClass(this.el.nativeElement, 'bg-green-500');
    this.renderer.removeClass(this.el.nativeElement, 'bg-yellow-300');
    this.renderer.removeClass(this.el.nativeElement, 'bg-red-500');

    if (colorClass) this.renderer.addClass(this.el.nativeElement, colorClass);
  }
}

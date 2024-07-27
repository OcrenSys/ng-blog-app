import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicForm]',
  standalone: true,
})
export class DynamicFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { SigninComponent } from '../../components/signin/signin.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalInterface } from 'flowbite';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  public modal!: ModalInterface;
  private _viewContainerRef!: ViewContainerRef;
  private _title: string = '';

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  get title(): string {
    return this._title;
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;
  }

  loadComponent(component: Type<SigninComponent | SignupComponent>) {
    if (this._viewContainerRef) {
      this._viewContainerRef.clear();

      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory<
          SigninComponent | SignupComponent
        >(component);

      const ref = this._viewContainerRef.createComponent(componentFactory);

      if (ref.instance instanceof SigninComponent) {
        this._title = 'Signin';
      } else if (ref.instance instanceof SignupComponent) {
        this._title = 'Signup';
      }
    }
  }
}

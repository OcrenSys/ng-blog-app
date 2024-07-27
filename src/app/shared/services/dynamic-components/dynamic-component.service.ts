import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { SigninComponent } from '../../components/signin/signin.component';
import { SignupComponent } from '../../components/signup/signup.component';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
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
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory<
          SigninComponent | SignupComponent
        >(component);

      this._viewContainerRef.clear();
      const ref = this._viewContainerRef.createComponent(componentFactory);
      if (ref.instance instanceof SigninComponent) {
        this._title = 'Signin';
      } else if (ref.instance instanceof SignupComponent) {
        this._title = 'Signup';
      }
    }
  }
}

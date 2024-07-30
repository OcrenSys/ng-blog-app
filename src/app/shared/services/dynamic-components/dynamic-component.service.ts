import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { SigninComponent } from '../../components/signin/signin.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { ModalInterface } from 'flowbite';
import { FormComponent } from '../../components/form/form.component';
import { Post } from '../../../common/interfaces/post.interface';

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

  loadComponent(
    component: Type<SigninComponent | SignupComponent | FormComponent>,
    data?: unknown
  ) {
    if (this._viewContainerRef) {
      this._viewContainerRef.clear();

      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory<
          SigninComponent | SignupComponent | FormComponent
        >(component);

      const ref = this._viewContainerRef.createComponent(componentFactory);

      switch (component) {
        case SigninComponent:
          this._title = 'Signin';
          break;
        case SignupComponent:
          this._title = 'Signup';
          break;
        case FormComponent:
          this._title = 'Post';
          if (data && ref.instance instanceof FormComponent) {
            (ref.instance as FormComponent).data = data as Post;
          }
          break;
      }
    }
  }
}

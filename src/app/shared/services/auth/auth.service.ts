import { inject, Injectable } from '@angular/core';
import { User } from '../../../common/interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { PostsService } from '../posts/posts.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageService: StorageService = inject(StorageService);
  public labelSubject = new BehaviorSubject<string>('Login');

  private readonly storageKey = 'auth_user';
  private readonly currentKey = 'current_user';
  private readonly loggedInKey = 'isLoggedIn';

  constructor(
    private postsService: PostsService
  ) {}

  signUp(user: User): boolean {
    const users = this.getUsers();
    if (users.find((u) => u.email === user.email)) {
      console.error('User already exists');
      return false;
    }

    users.push(user);
    this.saveUsers(users);
    return true;
  }

  signIn(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      console.error('Invalid email or password');
      return false;
    }

    this.storageService.setItem(this.currentKey, email);
    this.storageService.setItem(this.loggedInKey, 'true');
    this.postsService.loadPosts();
    this.labelSubject.next('Logout');
    return true;
  }

  signOut(): void {
    this.storageService.removeItem(this.loggedInKey);
    this.storageService.removeItem(this.currentKey);
    this.postsService.loadPosts();
    this.labelSubject.next('Login');
  }

  isLogged(): boolean {
    const logged = this.storageService.getItem('isLoggedIn');
    return logged === 'true';
  }

  private getUsers(): User[] {
    const usersJson = this.storageService.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  getCurrentUserEmail(): string | null {
    const currentUserEmail = this.storageService.getItem(this.currentKey);
    if (!currentUserEmail) return null;

    return currentUserEmail;
  }

  private saveUsers(users: User[]): void {
    this.storageService.setItem(this.storageKey, JSON.stringify(users));
  }
}

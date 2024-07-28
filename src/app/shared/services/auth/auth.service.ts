import { Injectable } from '@angular/core';
import { User } from '../../../common/interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public titleSubject = new BehaviorSubject<string>('Login');

  private readonly storageKey = 'auth_user';
  private readonly currentKey = 'current_user';
  private readonly loggedInKey = 'isLoggedIn';

  constructor(private favoriteService: FavoritesService) {}

  signUp(user: User): boolean {
    const users = this.getUsers();
    if (users.find((u) => u.email === user.email)) {
      console.error('User already exists');
      return false;
    }

    users.push(user);
    this.saveUsers(users);
    console.log('User signed up successfully');
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

    localStorage.setItem(this.currentKey, email);
    localStorage.setItem(this.loggedInKey, 'true');
    this.titleSubject.next('Logout');
    console.log('User signed in successfully');
    return true;
  }

  signOut(): void {
    const email = this.getCurrentUserEmail();
    if (email) this.favoriteService.clearFavorites(email);
    localStorage.removeItem(this.loggedInKey);
    localStorage.removeItem(this.currentKey);
    this.titleSubject.next('Login');
    console.log('User signed out successfully');
  }

  isLogged(): boolean {
    const logged = localStorage.getItem('isLoggedIn');
    return logged === 'true';
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  getCurrentUserEmail(): string | null {
    const currentUserEmail = localStorage.getItem(this.currentKey);
    if (!currentUserEmail) return null;

    return currentUserEmail;
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}

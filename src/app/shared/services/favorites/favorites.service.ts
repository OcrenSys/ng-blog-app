import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor() {}

  private getFavoritesKey(email: string): string {
    return `favorites_${email}`;
  }

  saveFavorite(email: string, postId: string): void {
    const key = this.getFavoritesKey(email);
    let favorites = this.getFavorites(email);
    if (!favorites.includes(postId)) {
      favorites.push(postId);
      localStorage.setItem(key, JSON.stringify(favorites));
    }
  }

  getFavorites(email: string): string[] {
    const key = this.getFavoritesKey(email);
    const favorites = localStorage.getItem(key);
    return favorites ? JSON.parse(favorites) : [];
  }

  removeFavorite(email: string, postId: string): void {
    const key = this.getFavoritesKey(email);
    let favorites = this.getFavorites(email);
    favorites = favorites.filter((id) => id !== postId);
    localStorage.setItem(key, JSON.stringify(favorites));
  }

  clearFavorites(email: string): void {
    const key = this.getFavoritesKey(email);
    localStorage.removeItem(key);
  }
}

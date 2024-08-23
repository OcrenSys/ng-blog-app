import { inject, Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageService: StorageService = inject(StorageService);

  private getFavoritesKey(email: string): string {
    return `favorites_${email}`;
  }

  saveFavorite(email: string, postId: string): void {
    const key = this.getFavoritesKey(email);
    let favorites = this.getFavorites(email);
    if (favorites.includes(postId))
      favorites = favorites.filter((id) => id !== postId);
    else favorites.push(postId);

    this.storageService.setItem(key, JSON.stringify(favorites));
  }

  getFavorites(email: string): string[] {
    const key = this.getFavoritesKey(email);
    const favorites = this.storageService.getItem(key);
    return favorites ? JSON.parse(favorites) : [];
  }

  removeFavorite(email: string, postId: string): void {
    const key = this.getFavoritesKey(email);
    let favorites = this.getFavorites(email);
    favorites = favorites.filter((id) => id !== postId);
    this.storageService.setItem(key, JSON.stringify(favorites));
  }

  clearFavorites(email: string): void {
    const key = this.getFavoritesKey(email);
    this.storageService.removeItem(key);
  }
}

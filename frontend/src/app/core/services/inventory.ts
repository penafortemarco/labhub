import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentType } from '../types/component-type';
import { AssetCategory } from '../types/asset-category';
import { Owner } from '../types/owner';
import { Room } from '../types/room';
import { Storage } from '../types/storage';
import {
  AssetPayload,
  ComponentPayload,
  ItemPayload,
  MaterialPayload,
} from '../types/item-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getInventory(category: string): Observable<ItemPayload[]> {
    if (category === 'component') return this.getComponents();
    if (category === 'asset') return this.getAssets();
    if (category === 'material') return this.getMaterials();
    else throw Error('Invalid Category!');
  }

  getComponents() {
    return this.http.get<ComponentPayload[]>(`${this.apiUrl}/items/components`);
  }

  getAssets() {
    return this.http.get<AssetPayload[]>(`${this.apiUrl}/items/assets`);
  }

  getMaterials() {
    return this.http.get<MaterialPayload[]>(`${this.apiUrl}/items/materials`);
  }

  getComponentTypes() {
    return this.http.get<ComponentType[]>(`${this.apiUrl}/component-types`);
  }

  getAssetCategories() {
    return this.http.get<AssetCategory[]>(`${this.apiUrl}/asset-categories`);
  }

  getOwners() {
    return this.http.get<Owner[]>(`${this.apiUrl}/owners`);
  }

  getRooms() {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`);
  }

  getStorages() {
    return this.http.get<Storage[]>(`${this.apiUrl}/storages`);
  }

  postNewItem(item: ItemPayload) {
    return this.http.post<ItemPayload[]>(`${this.apiUrl}/items`, item);
  }
}

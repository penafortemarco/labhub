import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Owner } from '../types/owner';
import { Room } from '../types/room';
import { Storage } from '../types/storage';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /*
    Privileged calls for API
  */
  getOwners() {
    return this.http.get<Owner[]>(`${this.apiUrl}/owners`);
  }

  getRooms() {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`);
  }

  getStorages() {
    return this.http.get<Storage[]>(`${this.apiUrl}/storages`);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}

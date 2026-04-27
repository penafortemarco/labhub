import { Component, signal, computed } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { Toolbar } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ItemDialog } from '../item-dialog/item-dialog';
import { Owner } from '../../types/owner';
import { Room } from '../../types/room';
import { Storage } from '../../types/storage';
import { TitleCasePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { User } from '../../types/user';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-admin-table',
  imports: [
    FormsModule,
    CardModule,
    SelectButton,
    FormsModule,
    TableModule,
    Toolbar,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    Popover,
    Select,
    Button,
    DialogModule,
    ItemDialog,
    TitleCasePipe,
  ],
  templateUrl: './admin-table.html',
  styleUrl: './admin-table.scss',
})
// W.I.P to types and categories!!!
export class AdminTable {
  constructor(private adminService: AdminService) {
    this.fetchItems()
  }

  protected tableContent = [
    { label: 'Owners', value: 'owners' },
    { label: 'Rooms', value: 'rooms' },
    { label: 'Storages', value: 'storages' },
    { label: 'Users', value: 'users' },
  ];

  protected tableContentOption = signal<
    'owners' | 'rooms' | 'storages' | 'users'
  >('owners');

  protected searchQuery = signal('');

  // Signals the AdminDialog to appear
  protected adminDialog = signal(false);

  // Signals the AdminDialog if its Edit Mode
  protected selectedMode = signal<'view' | 'edit'>('edit');

  protected owners = signal<Owner[]>([]); // All owners fetched
  protected rooms = signal<Room[]>([]); //  All rooms fetched
  protected storages = signal<Storage[]>([]); // All storages fetched
  protected users = signal<User[]>([]); // All users fetched

  // Data to be fetched constantly
  protected fetchItems() {
    // Waits for the first fetches until fetchItems
    forkJoin({
      //types: this.inventoryService.getComponentTypes(),
      //categories: this.inventoryService.getAssetCategories(),
      owners: this.adminService.getOwners(),
      rooms: this.adminService.getRooms(),
      storages: this.adminService.getStorages(),
      users: this.adminService.getUsers(),
    }).subscribe(
      ({ /* types, categories, */ owners, rooms, storages, users }) => {
        //this.componentTypes.set(types);
        //this.assetCategories.set(categories);
        this.owners.set(owners);
        this.rooms.set(rooms);
        this.storages.set(storages);
        this.users.set(users);
      },
    );
  }

  filteredContent = computed((): any[] => {

    if (this.tableContentOption() === 'owners') {
      return this.searchQuery() ? this.owners().filter((o) =>
        o.name.toLowerCase().includes(this.searchQuery().toLocaleLowerCase())
      ) : this.owners()
    } else if (this.tableContentOption() === 'rooms') {
      return this.searchQuery() ? this.rooms().filter((r) =>
        r.name.toLowerCase().includes(this.searchQuery().toLocaleLowerCase())
      ) : this.rooms()
    } else if (this.tableContentOption() === 'storages') {
      return this.searchQuery() ? this.storages().filter((s) =>
        s.name.toLowerCase().includes(this.searchQuery().toLocaleLowerCase())
      ) : this.storages()
    } else if (this.tableContentOption() === 'users') {
      return this.searchQuery() ? this.users().filter((u) =>
        u.username.toLowerCase().includes(this.searchQuery().toLocaleLowerCase())
      ) : this.users()
    }
    return []
  });

  /* getDialogTitle(): string {
    const ctx = this.itemToView();
    if (!ctx) return 'New Item';
    if (ctx.item_type === 'component')
      return ctx.item_obj.component_type ?? 'Component';
    if (ctx.item_type === 'asset') return ctx.item_obj.name;
    if (ctx.item_type === 'material') return ctx.item_obj.name;
    return 'Item';
  } */
}

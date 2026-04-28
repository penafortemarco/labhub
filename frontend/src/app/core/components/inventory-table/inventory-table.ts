import { Component, signal, computed } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { Toolbar } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InventoryService } from '../../services/inventory';
import { ComponentType } from '../../types/component-type';
import { Popover } from 'primeng/popover';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { AssetCategory } from '../../types/asset-category';
import { DialogModule } from 'primeng/dialog';
import { ItemDialog } from '../item-dialog/item-dialog';
import { Owner } from '../../types/owner';
import { Room } from '../../types/room';
import { Storage } from '../../types/storage';
import {
  ItemContext,
  AssetContext,
  ComponentContext,
  MaterialContext,
} from '../../types/item-context';
import { ItemPayload } from '../../types/item-payload';
import { ComponentView } from '../../types/component-view';
import { AssetView } from '../../types/asset-view';
import { TitleCasePipe } from '@angular/common';
import { MaterialView } from '../../types/material-view';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inventory-table',
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
  templateUrl: './inventory-table.html',
  styleUrl: './inventory-table.scss',
})
export class InventoryTable {
  constructor(private inventoryService: InventoryService) {
    // Waits for the first fetches until fetchItems
    forkJoin({
      types: this.inventoryService.getComponentTypes(),
      categories: this.inventoryService.getAssetCategories(),
      owners: this.inventoryService.getOwners(),
      rooms: this.inventoryService.getRooms(),
      storages: this.inventoryService.getStorages(),
    }).subscribe(({ types, categories, owners, rooms, storages }) => {
      this.componentTypes.set(types);
      this.assetCategories.set(categories);
      this.owners.set(owners);
      this.rooms.set(rooms);
      this.storages.set(storages);
      this.fetchItems();
    });
  }

  protected searchQuery = signal('');

  protected tableContent = [
    { label: 'Components', value: 'component' },
    { label: 'Assets', value: 'asset' },
    { label: 'Materials', value: 'material' },
  ];
  protected tableContentOption = signal<'component' | 'asset' | 'material'>(
    'component',
  );

  protected componentTypes = signal<ComponentType[]>([]);
  protected selectedComponentTypeFilter = signal<ComponentType | null>(null);

  protected assetCategories = signal<AssetCategory[]>([]);
  protected selectedAssetCategoryFilter = signal<AssetCategory | null>(null);

  // List of items to display on the table
  protected items = signal<ItemContext[]>([]);

  // Signals the ItemDialog to appear
  protected itemDialog = signal(false);

  // ItemContext in for serial inserts
  protected itemToView = signal<ItemContext | null>(null);
  protected itemToEdit = signal<ItemContext | null>(null);

  // Signals the ItemDialog if its Edit Mode
  protected selectedMode = signal<'view' | 'edit' | 'insert'>('edit');

  protected owners = signal<Owner[]>([]); // All owners fetched
  protected rooms = signal<Room[]>([]); //  All rooms fetched
  protected storages = signal<Storage[]>([]); // All storages fetched

  // List of items to display on the table after FILTER (after search implement)
  filteredItems = computed(() => {
    const items = this.items();
    const searchQuery = this.searchQuery().toLowerCase();

    if (this.tableContentOption() === 'component') {
      const componentItems = items as ComponentContext[];
      const type = this.selectedComponentTypeFilter();
      return componentItems.filter((item) => {
        const matchesType = !type || item.item_obj.component_type === type.name;
        const matchesSearch =
          searchQuery === '' ||
          item.item_obj.component_type.toLowerCase().includes(searchQuery) ||
          item.owner?.name.toLowerCase().includes(searchQuery) ||
          item.room?.name.toLowerCase().includes(searchQuery) ||
          item.storage?.name.toLowerCase().includes(searchQuery);
        return matchesType && matchesSearch;
      });
    } else if (this.tableContentOption() === 'asset') {
      const assetItems = items as AssetContext[];
      const category = this.selectedAssetCategoryFilter();
      if (!category) return items;
      return assetItems.filter(
        (item) => item.item_obj.asset_category.name === category.name,
      );
    } else if (this.tableContentOption() === 'material') {
      const materialItems = items as MaterialContext[];
      return materialItems.filter(
        (item) =>
          searchQuery === '' ||
          item.item_obj.name.toLowerCase().includes(searchQuery),
      );
    }

    throw Error('Filter does not exist!');
  });

  // Data to be fetched constantly
  protected fetchItems() {
    console.log(`Data fethced: ${this.tableContentOption()}`);
    this.inventoryService
      .getInventory(this.tableContentOption())
      .subscribe((data: ItemPayload[]) => {
        this.items.set(data.map((item) => this.buildContext(item)));
      });
  }

  protected buildContext(payload: ItemPayload): ItemContext {
    const owner = this.owners().find((o) => o.id === payload.owner_id) ?? null;
    const storage =
      this.storages().find((s) => s.id === payload.storage_id) ?? null;
    const room = this.rooms().find((r) => r.id === storage?.room_id) ?? null;

    if (payload.item_type === 'component') {
      const component_type = this.componentTypes().find(
        (t) => t.id === payload.component_type_id,
      );
      if (!component_type)
        throw new Error(
          'Error at inventory-table.ts buildContext(): No component_type!',
        );

      return {
        owner: owner,
        room: room,
        storage: storage,
        item_id: payload.item_id,
        item_type: 'component',
        item_obj: {
          quantity: payload.quantity,
          component_type: component_type.name,
          attributes: payload.attributes,
        } as ComponentView,
      } as ComponentContext;
    } else if (payload.item_type === 'asset') {
      const asset_category = this.assetCategories().find(
        (ct) => ct.id === payload.asset_category_id,
      );
      if (!asset_category)
        throw new Error(
          'Error at inventory-table.ts buildContext(): No asset_category!',
        );

      return {
        owner: owner,
        room: room,
        storage: storage,
        item_id: payload.item_id,
        item_type: 'asset',
        item_obj: {
          name: payload.name,
          asset_category: asset_category,
          status: payload.status,
          serial_number: payload.serial_number,
          brand: payload.brand,
          model: payload.model,
        } as AssetView,
      } as AssetContext;
    } else if (payload.item_type === 'material') {
      return {
        owner: owner,
        room: room,
        storage: storage,
        item_id: payload.item_id,
        item_type: 'material',
        item_obj: {
          name: payload.name,
        } as MaterialView,
      } as MaterialContext;
    }

    throw new Error(
      'Error at inventory-table.ts buildContext(): No payload.item_type!',
    );
    // handle asset and material...
  }

  getDialogTitle(): string {
    const ctx = this.itemToView();
    if (!ctx) return 'New Item';
    if (ctx.item_type === 'component')
      return ctx.item_obj.component_type ?? 'Component';
    if (ctx.item_type === 'asset') return ctx.item_obj.name;
    if (ctx.item_type === 'material') return ctx.item_obj.name;
    return 'Item';
  }
}

import { InventoryService } from '../../services/inventory';
import {
  Component,
  input,
  computed,
  effect,
  signal,
  OnInit,
  DestroyRef,
  inject,
  output,
  untracked,
} from '@angular/core';
import { SelectModule } from 'primeng/select';
import { Owner } from '../../types/owner';
import { Room } from '../../types/room';
import { Storage } from '../../types/storage';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ItemContext } from '../../types/item-context';
import { ComponentType } from '../../types/component-type';
import { AssetCategory } from '../../types/asset-category';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ItemPayload } from '../../types/item-payload';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-item-dialog',
  imports: [
    SelectModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FloatLabelModule,
  ],
  templateUrl: './item-dialog.html',
  styleUrl: './item-dialog.scss',
})
export class ItemDialog implements OnInit {
  private destroyRef = inject(DestroyRef);
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.form
      .get('room')!
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((room) => {
        this.selectedRoom.set(room);
        this.form.get('storage')!.setValue(null);
      });
    this.form
      .get('item_obj.component_type')!
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((type) => {
        this.setComponentType(type);
      });
  }

  objectEntries = Object.entries;

  mode = input<'view' | 'edit'>('edit');
  itemToView = input<ItemContext | null>(null); // Item to view
  contextChange = output<ItemContext>();

  itemToEdit = input<ItemContext | null>(null); // Context of Item to edit
  itemType = input<'component' | 'asset' | 'material'>('component'); // To edit

  owners = input<Owner[]>([]);
  rooms = input<Room[]>([]);
  storages = input<Storage[]>([]);
  componentTypes = input<ComponentType[]>([]);
  assetCategories = input<AssetCategory[]>([]);

  selectedRoom = signal<Room | null>(null);

  possibleStorages = computed(() => {
    return this.storages().filter((storage) => {
      return storage.room_id === this.selectedRoom()?.id;
    });
  });

  form = new FormGroup({
    item_type: new FormControl<'component' | 'asset' | 'material'>(
      'component',
      { nonNullable: true },
    ),
    owner: new FormControl<Owner | null>(null, Validators.required),
    room: new FormControl<Room | null>(null, Validators.required),
    storage: new FormControl<Storage | null>(null, Validators.required),
    item_id: new FormControl<number | null>(null),

    item_obj: new FormGroup({
      // component-specific
      quantity: new FormControl<number | null>(0),
      component_type: new FormControl<ComponentType | null>(null),
      attributes: new FormGroup<Record<string, FormControl>>({}),
    }),
  });

  private ctxEffect = effect(() => {
    const ctx = this.itemToEdit();
    console.log(this.mode());

    if (!ctx) return;

    untracked(() => {
      this.form.patchValue(
        {
          item_id: ctx.item_id,
          owner: ctx.owner,
          room: ctx.room,
          storage: ctx.storage,
          item_type: ctx.item_type,
        },
        { emitEvent: false },
      );
    });

    // rebuild dynamic fields
    const fieldsGroup = new FormGroup({});

    if (ctx.item_type === 'component') {
      const typeName = ctx.item_obj.component_type;
      const type = this.componentTypes().find((t) => t.name === typeName);

      for (const [k, v] of Object.entries(ctx.item_obj.attributes || {})) {
        const fieldType = type?.fields?.[k];

        const validators =
          fieldType === 'numeric'
            ? [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]
            : [Validators.required];

        fieldsGroup.addControl(k, new FormControl(v, validators));
      }

      this.form.controls.item_obj.setControl('attributes', fieldsGroup);
    }
  });

  protected setComponentType(type: ComponentType | null) {
    if (!type) return;

    const fieldsGroup = new FormGroup({});

    for (const [key, value] of Object.entries(type.fields)) {
      const validators =
        value === 'numeric'
          ? [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]
          : [Validators.required];
      fieldsGroup.addControl(key, new FormControl('', validators));
    }

    this.form.controls.item_obj.setControl('attributes', fieldsGroup);
  }

  protected formatLabel(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  protected onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    if (!raw.owner?.id) return;
    if (!raw.storage?.id) return;

    if (raw.item_type === 'component') {
      if (!raw.item_obj.component_type?.id) return;

      const payload: ItemPayload = {
        item_id: raw.item_id, // NEW ITEM. FOR EDIT, PROVIDE ID (W.I.P)
        item_type: raw.item_type,
        owner_id: raw.owner.id,
        storage_id: raw.storage.id,
        quantity: raw.item_obj.quantity ?? 0,
        component_type_id: raw.item_obj.component_type.id,
        attributes: raw.item_obj.attributes as Record<string, any>,
      };
      console.log(payload);
      this.inventoryService.postNewItem(payload).subscribe((res) => {
        this.form.patchValue({ item_id: null }, { emitEvent: false });
      });
    } else if (raw.item_type === 'asset') {
      // W.I.P
    } else if (raw.item_type === 'material') {
      // W.I.P
    }
  }
}

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

  mode = input<'view' | 'edit' | 'insert'>('edit');
  itemToView = input<ItemContext | null>(null); // Item to view
  contextChange = output<ItemContext>();
  submitSuccess = output<void>();

  itemToEdit = input<ItemContext | null>(null); // Context of Item to edit
  itemType = input<'component' | 'asset' | 'material'>('component'); // To edit

  owners = input<Owner[]>([]);
  rooms = input<Room[]>([]);
  storages = input<Storage[]>([]);
  componentTypes = input<ComponentType[]>([]);
  assetCategories = input<AssetCategory[]>([]);

  protected selectedRoom = signal<Room | null>(null);

  protected submitStatus = signal<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );

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

    if (!ctx) return;

    this.selectedRoom.set(ctx.room);

    untracked(() => {
      this.form.patchValue(
        {
          item_id: this.mode() === 'edit' ? ctx.item_id : null,
          owner: ctx.owner,
          room: ctx.room,
          storage: ctx.storage,
          item_type: ctx.item_type,
          item_obj: {
            quantity:
              ctx.item_type === 'component' ? ctx.item_obj.quantity : null,
            component_type:
              ctx.item_type === 'component'
                ? (this.componentTypes().find(
                    (t) => t.name === ctx.item_obj.component_type,
                  ) ?? null)
                : null,
          },
        },
        { emitEvent: false },
      );
    });

    // rebuild dynamic fields
    const fieldsGroup = new FormGroup({});

    if (ctx.item_type === 'component') {
      const type = this.componentTypes().find(
        (t) => t.name === ctx.item_obj.component_type,
      );
      if (type) {
        this.setComponentType(type);
        // patch attribute values after rebuilding the group
        untracked(() => {
          this.form.controls.item_obj.patchValue(
            { attributes: ctx.item_obj.attributes },
            { emitEvent: false },
          );
        });
      }
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
    this.submitStatus.set('idle');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    let payload: ItemPayload | null = null;

    if (raw.item_type === 'component') {
      if (!raw.item_obj.component_type?.id) return;
      payload = {
        item_id: raw.item_id,
        item_type: raw.item_type,
        owner_id: raw?.owner?.id ?? null,
        storage_id: raw?.storage?.id ?? null,
        quantity: raw.item_obj.quantity ?? 0,
        component_type_id: raw.item_obj.component_type.id ?? null,
        attributes: (raw.item_obj.attributes as Record<string, any>) ?? {},
      };
    } else if (raw.item_type === 'asset') {
      // W.I.P
    } else if (raw.item_type === 'material') {
      // W.I.P
    }

    if (payload === null) return;

    // if it has item_id, is a update!
    if (payload?.item_id) {
      this.submitStatus.set('loading');
      this.inventoryService
        .updateItem(this.delta_payload(payload, this.itemToEdit()!))
        .subscribe({
          next: () => {
            this.submitStatus.set('success');
            this.submitSuccess.emit();
          },
          error: () => this.submitStatus.set('error'),
        });
    } else {
      this.submitStatus.set('loading');
      this.inventoryService.createItem(payload).subscribe({
        next: () => {
          this.submitStatus.set('success');
          this.submitSuccess.emit();
        },
        error: () => this.submitStatus.set('error'),
      });
    }
  }

  protected delta_payload(
    payload: ItemPayload,
    original_context: ItemContext,
  ): ItemPayload {
    if (!original_context)
      throw Error('Error in delta_payload(): missing original_context!');

    const delta = {} as ItemPayload;

    delta.item_id = payload.item_id;
    delta.item_type = payload.item_type;

    delta.owner_id =
      payload.owner_id === original_context?.owner?.id
        ? null
        : payload.owner_id;
    delta.storage_id =
      payload.storage_id === original_context?.storage?.id
        ? null
        : payload.storage_id;

    if (
      delta.item_type === 'component' &&
      payload.item_type === 'component' &&
      original_context.item_type == 'component'
    ) {
      delta.component_type_id =
        payload.component_type_id ===
        this.componentTypes().find(
          (t) => t.name === (original_context.item_obj as any).component_type,
        )?.id
          ? null
          : payload.component_type_id;
      delta.quantity =
        payload.quantity === original_context?.item_obj?.quantity
          ? null
          : payload.quantity;
      delta.attributes =
        JSON.stringify(payload.attributes) ===
        JSON.stringify((original_context.item_obj as any).attributes)
          ? null
          : payload.attributes;
    } else if (
      delta.item_type === 'asset' &&
      payload.item_type === 'asset' &&
      original_context.item_type == 'asset'
    ) {
      // ASSET IMPLEMENTATIION (W.I.P)
      throw Error('MATERIAL IMPLEMENTATION (W.I.P)');
    } else if (
      delta.item_type === 'material' &&
      payload.item_type === 'material' &&
      original_context.item_type == 'material'
    ) {
      // MATERIAL IMPLEMENTATION (W.I.P)
      throw Error('MATERIAL IMPLEMENTATION (W.I.P)');
    } else throw Error('Bad result in delta_payload');

    return delta;
  }
}

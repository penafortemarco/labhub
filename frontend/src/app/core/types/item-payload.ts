import { AssetStatus } from "./asset-view";

export type ComponentPayload = Extract<ItemPayload, { item_type: 'component' }>;
export type AssetPayload = Extract<ItemPayload, { item_type: 'asset' }>;
export type MaterialPayload = Extract<ItemPayload, { item_type: 'material' }>;

export type ItemPayload =
  | {
      item_id: number | null;
      item_type: 'component';
      owner_id: number;
      storage_id: number;
      component_type_id: number;
      quantity: number;
      attributes: Record<string, any>;
    }
  | {
      item_id: number | null;
      item_type: 'asset';
      owner_id: number;
      storage_id: number;
      asset_category_id: number;
      name: string;
      status: AssetStatus;
      brand?: string;
      model?: string;
      serial_number?: string;
    }
  | {
      item_id: number | null;
      item_type: 'material';
      owner_id: number;
      storage_id: number;
      name: string;
    };

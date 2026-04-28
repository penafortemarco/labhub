import { AssetStatus } from "./asset-view";

export type ComponentPayload = Extract<ItemPayload, { item_type: 'component' }>;
export type AssetPayload = Extract<ItemPayload, { item_type: 'asset' }>;
export type MaterialPayload = Extract<ItemPayload, { item_type: 'material' }>;

export type ItemPayload =
    | {
        item_id: number | null;
        item_type: 'component';
        owner_id: number | null;
        storage_id: number | null;
        component_type_id: number | null;
        quantity: number | null;
        attributes: Record<string, any> | null;
      }
    | {
        item_id: number | null;
        item_type: 'asset';
        owner_id: number | null;
        storage_id: number | null;
        asset_category_id: number | null;
        name: string | null;
        status: AssetStatus | null;
        brand?: string | null;
        model?: string | null;
        serial_number?: string | null;
      }
    | {
        item_id: number | null;
        item_type: 'material';
        owner_id: number | null;
        storage_id: number | null;
        name: string | null;
      };

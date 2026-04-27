import { AssetCategory } from './asset-category';

export type AssetStatus =
  | 'active'
  | 'needs_repair'
  | 'under_repair'
  | 'inactive';

export interface AssetView {
  item_id: number;
  name: string;
  asset_category: AssetCategory;
  serial_number: string | null;
  brand: string | null;
  model: string | null;
  status: AssetStatus;
  attributes: Record<string, any>;
}

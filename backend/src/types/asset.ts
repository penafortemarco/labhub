export type AssetStatus = 'active' | 'needs_repair' | 'under_repair' | 'inactive';

export interface Asset {
        item_id: number;
        asset_category_id: number
        name: string;
        serial_number: string | null;
        brand: string | null;
        model: string | null;
        status: AssetStatus;
}
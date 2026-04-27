export interface AssetCategory{
  id: number;
  created_at: Date;
  name: string;
  fields: Record<string, string>;
}

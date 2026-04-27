export interface ComponentView {
  id: number;
  type: 'component';
  created_at: Date;
  quantity: number;
  component_type: string;
  owner_name: string;
  room_name: string;
  storage_name: string;
  attributes: Record<string, any>;
}

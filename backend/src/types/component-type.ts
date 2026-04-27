export interface ComponentType {
  id: number;
  created_at: Date;
  name: string;
  fields: Record<string, string>;
}

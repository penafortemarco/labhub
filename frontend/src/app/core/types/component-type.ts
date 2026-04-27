export interface ComponentType {
  id: number;
  created_at: Date | null;
  name: string;
  fields: Record<string, string>;
}

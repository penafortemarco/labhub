/* 
    Represents a row from the 'components' table in database
 */
export interface Component {
    item_id: number;
    component_type_id: number;
    quantity: number;
    attributes: Record<string, any>;
}

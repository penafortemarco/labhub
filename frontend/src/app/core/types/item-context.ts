import { Owner } from "./owner";
import { Room } from "./room";
import { Storage } from "./storage";
import { ComponentView } from './component-view';
import { AssetView } from './asset-view';
import { MaterialView } from './material-view';

export type ComponentContext = Extract<ItemContext, { item_type: 'component' }>;
export type AssetContext = Extract<ItemContext, { item_type: 'asset' }>;
export type MaterialContext = Extract<ItemContext, { item_type: 'material' }>;

type BaseItemContext = {
  owner: Owner | null;
  room: Room | null;
  storage: Storage | null;
  item_id: number | null;
};

export type ItemContext =
  | (BaseItemContext & {
      item_type: 'component';
      item_obj: ComponentView;
    })
  | (BaseItemContext & {
      item_type: 'asset';
      item_obj: AssetView;
    })
  | (BaseItemContext & {
      item_type: 'material';
      item_obj: MaterialView;
    });

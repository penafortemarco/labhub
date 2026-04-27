import { Owner } from "./owner";
import { Room } from "./room";
import { Storage } from "./storage";
import { Component } from './component';
import { Asset } from './asset';
import { Material } from './material';

type BaseItemContext = {
  owner: Owner | null;
  room: Room | null;
  storage: Storage | null;
  item_id: number | null;
};

export type ItemContext =
  | (BaseItemContext & {
      item_type: 'component';
      item_obj: Component;
    })
  | (BaseItemContext & {
      item_type: 'asset';
      item_obj: Asset;
    })
  | (BaseItemContext & {
      item_type: 'material';
      item_obj: Material;
    });

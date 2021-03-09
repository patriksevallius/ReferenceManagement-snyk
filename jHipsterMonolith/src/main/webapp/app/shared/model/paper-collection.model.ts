import { IPaperItem } from 'app/shared/model/paper-item.model';

export interface IPaperCollection {
  id?: number;
  paperCollectionIdId?: number;
  paperitemLists?: IPaperItem[];
}

export const defaultValue: Readonly<IPaperCollection> = {};

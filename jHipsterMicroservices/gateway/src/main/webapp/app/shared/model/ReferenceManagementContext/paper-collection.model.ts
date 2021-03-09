import { IPaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';

export interface IPaperCollection {
  id?: number;
  paperCollectionIdId?: number;
  paperitemLists?: IPaperItem[];
}

export class PaperCollection implements IPaperCollection {
  constructor(public id?: number, public paperCollectionIdId?: number, public paperitemLists?: IPaperItem[]) {}
}

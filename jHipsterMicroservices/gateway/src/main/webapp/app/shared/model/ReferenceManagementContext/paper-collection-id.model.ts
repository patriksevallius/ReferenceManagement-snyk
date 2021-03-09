export interface IPaperCollectionId {
  id?: number;
}

export class PaperCollectionId implements IPaperCollectionId {
  constructor(public id?: number) {}
}

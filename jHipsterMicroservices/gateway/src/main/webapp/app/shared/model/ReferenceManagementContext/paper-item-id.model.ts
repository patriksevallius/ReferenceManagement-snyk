export interface IPaperItemId {
  id?: number;
}

export class PaperItemId implements IPaperItemId {
  constructor(public id?: number) {}
}

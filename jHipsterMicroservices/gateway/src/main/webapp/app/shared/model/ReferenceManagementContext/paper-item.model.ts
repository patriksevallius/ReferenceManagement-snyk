export interface IPaperItem {
  id?: number;
  title?: string;
  authors?: string;
  venue?: string;
  paperitemIdId?: number;
  paperCollectionId?: number;
}

export class PaperItem implements IPaperItem {
  constructor(
    public id?: number,
    public title?: string,
    public authors?: string,
    public venue?: string,
    public paperitemIdId?: number,
    public paperCollectionId?: number
  ) {}
}

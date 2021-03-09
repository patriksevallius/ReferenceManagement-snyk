export interface IPaperItem {
  id?: number;
  title?: string;
  authors?: string;
  venue?: string;
  paperitemIdId?: number;
  paperCollectionId?: number;
}

export const defaultValue: Readonly<IPaperItem> = {};

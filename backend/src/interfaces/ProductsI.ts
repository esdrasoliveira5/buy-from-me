export interface QueryData {
  filter: string | undefined;
  price: string | undefined;
  sold: string | undefined;
  newP: string | undefined;
  category: string | undefined;
  name: string | undefined;
}

export interface SearchData {
  price?: {
    gte?: number;
    lte?: number;
  } | number,
  sold?: boolean;
  new?: boolean;
  categoriesId?: number;
}
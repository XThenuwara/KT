export type pageOptions = {
  limit: number;
  page: number;
};

export type metaType = {
  itemCount?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  pageCount?: number;
  page: number;
  limit: number;
};

export default interface PaginationResponseType<T> {
  total: number;
  hasMore: boolean;
  items: T[];
}

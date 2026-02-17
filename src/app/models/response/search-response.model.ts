export interface SearchResponseModel<T> {
  messages?: readonly string[] | null;
  totalCount?: number;
  data?: T[];
}

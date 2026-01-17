export default interface PageResponse<T> {
  total:   number;
  results: T[];
}
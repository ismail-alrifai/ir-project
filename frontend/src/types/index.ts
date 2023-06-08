/** @format */
export interface IBaseResponse<T> {
  data: T;
  message: string[];
  statusCode: number;
}
export interface ListDto<T> {
  count: number;
  total: number;
  page: number;
  pageCount: number;
  data: Array<T>;
}
export interface IBaseResponseList<T> extends IBaseResponse<ListDto<T>> {}

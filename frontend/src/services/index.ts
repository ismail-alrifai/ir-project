/** @format */

import { IBaseResponse, ListDto } from "./../types/index";
import { authAxios } from "./../config/axiosConfig";
import { AxiosError } from "axios";
import { IBaseResponseList } from "./../types/index";

export async function postService<TForm, TResponse>(
  body: TForm,
  url: string
): Promise<IBaseResponse<TResponse>> {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: data } = await authAxios.post<IBaseResponse<TResponse>>(
        url,
        body
      );
      resolve(data);
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response) {
        reject(err?.response?.data);
      }
    }
  });
}

export async function getListService<T, TParams>(
  url: string,
  withParams: boolean = false,
  params?: TParams
): Promise<ListDto<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const link =
        withParams && params
          ? `/${url}?${new URLSearchParams(params).toString()}`
          : `/${url}`;

      const { data: data } = await authAxios.get<IBaseResponseList<T>>(link);
      resolve(data.data);
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response) {
        reject(err?.response?.data);
      }
    }
  });
}

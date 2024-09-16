// axiom.ts

import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

interface RequestOptions {
  headers?: { [key: string]: string };
  body?: any;
  method?: any;
}

async function handleResponse<T>(response: AxiosResponse): Promise<T> {
  const allowed = [200, 201, 203, 204];
  if (!allowed.includes(response.status)) {
    toast(response.statusText);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = response.data as T;
  return data;
}

async function request<T>(
  url: string,
  method: string,
  options?: RequestOptions
): Promise<T | null> {
  const init: RequestOptions = {
    method,
    ...(options?.headers && { headers: options.headers }),
  };
  try {
    const response = await axios(url, { ...init, data: options?.body ?? {} });
    return handleResponse<T>(response);
  } catch (error) {
    const err = error as AxiosError;
    toast(err.message);
    return null;
  }
}

export function get<T>(
  url: string,
  options?: RequestOptions
): Promise<T | null> {
  return request<T>(url, "GET", options);
}

export function post<T>(
  url: string,
  body: any,
  options?: RequestOptions
): Promise<T | null> {
  return request<T>(url, "POST", { ...options, body });
}

export function put<T>(
  url: string,
  body: any,
  options?: RequestOptions
): Promise<T | null> {
  return request<T>(url, "PUT", { ...options, body });
}

export function patch<T>(
  url: string,
  body: any,
  options?: RequestOptions
): Promise<T | null> {
  return request<T>(url, "PATCH", { ...options, body });
}

export function del<T>(
  url: string,
  options?: RequestOptions
): Promise<T | null> {
  return request<T>(url, "DELETE", options);
}

import { getGraphqlErrors } from "./errors";

const customFetch = async (url: string, options: RequestInit) => {
  const token = localStorage.getItem("token");
  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${token}`,
      "Content-Type": "application/json",
      "Apollo-Require-Preflight": "true",
    },
  });
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
    const respone = await customFetch(url, options)

    const clone = respone.clone()

    const body = await clone.json()

    const error = getGraphqlErrors(body)

    if(error) throw error;

    return respone
}

/* eslint-disable no-restricted-globals */
import axios from "axios";
import { useQuery } from "react-query";

export const useQueryComplicatedFetchHooks = (
  fetchURL?: string,
  refetchInterval?: number,
  refetchOnWindowFocus?: boolean,
  queryName?: string,
  cacheTime?: number,
  enableFetch?: boolean,
  token?: string,
  onSuccess?: (ar: any) => void,
  onError?: (ar: any) => void
) => {
  const { data, isFetching, refetch, isError } = useQuery(
    queryName as string,
    async () => {
      const response = await axios.get(fetchURL as string, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      if (!data) {
        return;
      } else if (data) {
        return data;
      }
    },
    {
      onSuccess,
      onError: onError
        ? onError
        : (error: any) => {
            console.log(error);
          },
      refetchInterval: refetchInterval,
      refetchOnWindowFocus: refetchOnWindowFocus,
      cacheTime: cacheTime,
      enabled: enableFetch,
    }
  );

  return { data, isFetching, isError, refetch };
};

export const useQueryHeaderFetchHooks = (
  refetchInterval?: number,
  refetchOnWindowFocus?: boolean,
  queryName?: string,
  cacheTime?: number,
  enableFetch?: boolean,
  fetchFnName?: () => any,
  onSuccess?: (ar: any) => void,
  onError?: (ar: any) => void
) => {
  const { data, isFetching, refetch, isError } = useQuery(
    queryName!,
    fetchFnName!,
    {
      onSuccess,
      onError: onError
        ? onError
        : (error: any) => {
            console.log(error);
          },
      refetchInterval: refetchInterval,
      refetchOnWindowFocus: refetchOnWindowFocus,
      cacheTime: cacheTime,
      enabled: enableFetch,
    }
  );

  return { data, isFetching, isError, refetch };
};

const useQueryHooks = {
  useQueryComplicatedFetchHooks,
  useQueryHeaderFetchHooks,
};

export default useQueryHooks;

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useQueryMutationInvalidateHooksDelete = (
  fetchURL?: string,
  queryKey?: string,
  token?: string,
  onSuccessFunction?: any
) => {
  const queryClient = useQueryClient();

  const addParam = async () => {
    return await axios.delete(fetchURL as string, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  return useMutation(addParam, {
    onSuccess: onSuccessFunction
      ? onSuccessFunction
      : () => {
          queryClient.invalidateQueries(queryKey);
        },
  });
};

export const useQueryMutationInvalidateHooksPost = (
  fetchURL?: string,
  queryKey?: string,
  token?: string,
  onSuccessFunction?: any
) => {
  const queryClient = useQueryClient();

  // const addParam = async (addingParam?: any) => {
  //   return await axios.post(fetchURL as string, addingParam, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // };
  const addParam = async (addingParam?: any) => {
    return await axios.post(fetchURL as string, addingParam);
  };

  return useMutation(addParam, {
    onSuccess: onSuccessFunction
      ? onSuccessFunction
      : (data: any) => {
          console.log("Sucess", data);
          // If status if success then assgin the datasource
          if (data?.data?.status === "FAILURE") {
            console.log(data?.data?.message);
            return;
          } else if (data?.data?.status === "SUCCESS") {
            console.log(data?.data?.message);
          }

          queryClient.invalidateQueries(queryKey);
        },
  });
};

export const useQueryMutationInvalidateHooksPut = (
  fetchURL?: string,
  queryKey?: string,
  token?: string,
  onSuccessFunction?: any
) => {
  const queryClient = useQueryClient();

  // const addParam = async (addingParam?: any) => {
  //   return await axios.post(fetchURL as string, addingParam, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // };
  const addParam = async (addingParam?: any) => {
    return await axios.post(fetchURL as string, addingParam);
  };
  return useMutation(addParam, {
    onSuccess: onSuccessFunction
      ? onSuccessFunction
      : (data: any) => {
          console.log("Sucess", data);
          // If status if success then assgin the datasource
          if (data?.data?.status === "FAILURE") {
            console.log(data?.data?.message);
            return;
          } else if (data?.data?.status === "SUCCESS") {
            console.log(data?.data?.message);
          }

          queryClient.invalidateQueries(queryKey);
        },
  });
};

const useQueryMutationInvalidateHooks = {
  useQueryMutationInvalidateHooksDelete,
  useQueryMutationInvalidateHooksPost,
  useQueryMutationInvalidateHooksPut,
};

export default useQueryMutationInvalidateHooks;

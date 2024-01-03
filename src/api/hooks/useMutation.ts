import {
  useMutation as useReactQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Cookie from "cookie-universal";

export const getHeaders = () => {
  const cookies = Cookie();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  };
};

const baseUrl = import.meta.env.VITE_PUBLIC_API_PATH;
type MethodType = "POST" | "PUT" | "PATCH" | "DELETE";
type MutationType = {
  path?: string;
  method: MethodType;
  queryKeyRefetch?: string[];
  token?: boolean;
};
type FetcherType<T> = {
  args: T;
  path?: string;
  method: MethodType;
  token?: boolean;
};
export const fetcher = async <T>(
  config: FetcherType<{ args: T; pathWithParams?: string }>,
) => {
  const { method, path, args, token } = config;
  const { pathWithParams, args: mutationArgs } = args;
  return await fetch(`${baseUrl}${pathWithParams ? pathWithParams : path}/`, {
    method,
    headers: token ? getHeaders() : { "Content-Type": "application/json" },
    body: JSON.stringify(mutationArgs),
  });
};

export const useMutation = <T, D>(config: MutationType) => {
  const { path, method, token, queryKeyRefetch } = config;
  const queryClient = useQueryClient();
  const {
    mutateAsync: mutate,
    isPending: loading,
    data,
    error,
    status,
  } = useReactQuery({
    mutationFn: (args: { args: T; pathWithParams?: string }) =>
      fetcher<T>({ path, method, args, token }),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryKeyRefetch?.forEach((f) =>
        queryClient.invalidateQueries({ queryKey: [f] }),
      );
    },
  });
  return {
    mutate,
    loading,
    data: data as D,
    error,
    status,
  };
};

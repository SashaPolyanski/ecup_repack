import {useQuery as useReactQuery} from "@tanstack/react-query";

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
};
type GetQueryType = {
  path: string
  token?: boolean
}
const baseUrl = import.meta.env.VITE_PUBLIC_API_PATH
export const getQuery = async <T, >({path, token}: GetQueryType) => {

  const endpoint = `${baseUrl}${path}/`;
  const res = await fetch(endpoint, {
    // headers: token ? getHeaders() : undefined,
  });
  return res.json().then((r) => r as T);
};
type UseQueryConfig = {
  path: string
}
export const useQuery = <T, >(config: UseQueryConfig) => {
  const {path} = config
  const {data, isLoading,} = useReactQuery<T>({
    queryKey: [path],
    queryFn: () => getQuery<T>({path}),
    staleTime: Infinity,
  });
  return {data, isLoading};
};


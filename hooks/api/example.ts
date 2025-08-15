import { useQuery } from "@tanstack/react-query";
import { AXIOS } from "@/api/config";
import { QUERY_KEYS } from "@/constants/keys";

interface ExampleRequest {
  message: string;
}

interface ExampleResponse {
  message: string;
}

interface useExampleProps {
  request: ExampleRequest;
}

const getExample = async (request: ExampleRequest) => {
  const response = await AXIOS.get<ExampleResponse>("/example");
  return response.data;
};

export const useExample = ({ request }: useExampleProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.EXAMPLE],
    queryFn: () => getExample(request),
    enabled: !!request,
  });

  return { data, isLoading, error };
};

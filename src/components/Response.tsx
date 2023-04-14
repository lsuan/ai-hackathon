import { useState } from "react";
import { api } from "~/utils/api";

interface ResponseProps {
  data: Record<string, unknown> | undefined;
  isQueryEnabled: boolean;
}

function Response({ data, isQueryEnabled }: ResponseProps) {
  const [responseText, setResponseText] = useState<string>();
  const { isLoading } = api.openai.getResponse.useQuery(data ?? {}, {
    refetchOnWindowFocus: false,
    enabled: isQueryEnabled,
    onSuccess: (data) => {
      setResponseText(data.results?.choices?.[0]?.text);
    },
  });
  if (isLoading && isQueryEnabled) {
    return <p>Generating response...</p>;
  }
  return <p>{responseText}</p>;
}

export default Response;

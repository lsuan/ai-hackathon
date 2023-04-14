import { useState } from "react";
import { api } from "~/utils/api";

interface ResponseProps {
  data: Record<string, unknown> | undefined;
  socialMedia: string;
}

function Response({ data, socialMedia }: ResponseProps) {
  const [responseText, setResponseText] = useState<string>();
  const { isLoading } = api.openai.getResponse.useQuery(
    {
      data,
      socialMedia,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setResponseText(data.results?.choices?.[0]?.text);
      },
    }
  );
  if (isLoading) {
    return <p>Generating response...</p>;
  }
  return <p>{responseText}</p>;
}

export default Response;
